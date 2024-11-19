import React, { useEffect, useRef, useState } from "react";
// import Client from "../../components/Client.js";
import Client from "../../Components/Client.js";
import Editor from "../../Components/Editor.js";
import Peer from "peerjs";
import { useNavigate, useParams, Navigate } from "react-router-dom";
import { BiSolidMicrophone, BiSolidMicrophoneOff } from "react-icons/bi";
import { ImExit } from "react-icons/im";
import { FaVideo, FaVideoSlash } from "react-icons/fa";
import toast from "react-hot-toast";
import { initSocket } from "../../socket";
import { useSelector } from "react-redux";

const logo = "/dccLogo.jpg";

const EditorPage = () => {
  const codeRef = useRef(null);
  const [clients, setClients] = useState([]);
  const { roomId } = useParams();
  const socketRef = useRef(null);
  const reactnavigate = useNavigate();
  const [peers, setPeers] = useState([]);
  const [isMuted, setIsMuted] = useState(false);
  const [isCameraOff, setIsCameraOff] = useState(false);
  const videoRef = useRef();
  const peerInstanceRef = useRef();
  const peersRef = useRef([]);
  const streamRef = useRef();
  const { loggedIn, userName } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const handleLeave = () => {
    toast.success("You leave");
    reactnavigate("/");
  };

  async function handleCopyBtn() {
    try {
      await navigator.clipboard.writeText(roomId);

      toast.success("Room Id has been Copyied");
    } catch (error) {
      toast.error("Error in Copying Id");
      console.log("Error in Copying", error);
    }
  }

  const toggleCamera = () => {
    const enabled = streamRef.current.getVideoTracks()[0].enabled;
    streamRef.current.getVideoTracks()[0].enabled = !enabled;
    setIsCameraOff(!enabled);
  };

  const toggleMute = () => {
    const enabled = streamRef.current.getAudioTracks()[0].enabled;
    streamRef.current.getAudioTracks()[0].enabled = !enabled;
    setIsMuted(!enabled);
  };

  const addVideoStream = (stream, id) => {
    const video = document.createElement("video");
    video.srcObject = stream;
    video.id = id;
    video.addEventListener("loadedmetadata", () => {
      video.play();
    });
    document.getElementById("video-grid").appendChild(video);
  };

  useEffect(() => {
    const init = async () => {
      socketRef.current = await initSocket();
      console.log(socketRef.current);
      socketRef.current.on("connect_error", (err) => handleError(err));
      socketRef.current.on("connect_failed", (err) => handleError(err));

      const handleError = (e) => {
        console.log("socket error", e);
        toast.error("Server Error please try again");
        reactnavigate("/");
      };

      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((stream) => {
          streamRef.current = stream;
          videoRef.current.srcObject = stream;
          const peer = new Peer(undefined);

          peer.on("open", (peerID) => {
            socketRef.current.emit("join-room", {
              roomId,
              peerID,
              // userName: location.state?.userName || "xyz",
              userName,
            });
          });

          socketRef.current.on(
            "user-connected",
            ({ peerID, clients, socketId, userName }) => {
              console.log("user-connected");
              if (socketRef.current.id === socketId) {
                toast.success("You Joined");
              }
              if (socketRef.current.id !== socketId) {
                const call = peer.call(peerID, stream);
                call.on("stream", (userVideoStream) => {
                  if (!peersRef.current.find((p) => p.id === peerID)) {
                    addVideoStream(userVideoStream, peerID);
                    peersRef.current.push({ id: peerID, call });
                    setPeers([...peersRef.current]);
                  }
                });

                toast.success(`${userName} joined`);
              }
              setClients(clients);

              socketRef.current.emit("codesync", {
                code: codeRef.current,
                socketId,
              });
            }
          );

          peer.on("call", (call) => {
            call.answer(stream);
            call.on("stream", (userVideoStream) => {
              if (!peersRef.current.find((p) => p.id === call.peer)) {
                addVideoStream(userVideoStream, call.peer);
                peersRef.current.push({ id: call.peer, call });
                setPeers([...peersRef.current]);
              }
            });
          });

          socketRef.current.on(
            "user-disconnected",
            ({ peerID, userName, socketId }) => {
              const video = document.getElementById(peerID);
              if (video) video.remove();
              peersRef.current = peersRef.current.filter(
                (p) => p.id !== peerID
              );
              setPeers([...peersRef.current]);
              toast.success(`${userName} leave`);
              setClients((prevClients) =>
                prevClients.filter((client) => client.socketId !== socketId)
              );
            }
          );

          peerInstanceRef.current = peer;
        })
        .catch((error) => {
          console.error("Error accessing media devices.", error);
        });
    };

    init();

    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
      socketRef.current.disconnect();
      socketRef.current.off("user-connected");
      socketRef.current.off("user-disconnected");
    };
  }, [roomId]); // Add an empty dependency array to ensure it runs only once

  // useEffect(() => {
  //   if(!loggedIn)
  //   {
  //     navigate("/register");
  //   }
  // }, [loggedIn, navigate])

  // if (!loggedIn) {
  //   return <Navigate to="/register" />;
  // }


  return (
    <div className="grid grid-cols-[230px_1fr_300px] h-screen text-white">
      <div className="bg-[#1c1e29] h-full p-4 flex flex-col">
        <div className="flex-1">
          <h3 className="font-bold text-center">Connected</h3>
          <div className="flex flex-wrap items-center gap-5 mt-4">
            {clients.map((client) => (
              <Client userName={userName} key={client.socketId} />
            ))}
          </div>
        </div>
      </div>

      <div className="text-left h-full">
        <Editor
          socketRef={socketRef}
          roomId={roomId}
          onCodeChange={(code) => (codeRef.current = code)}
          className="min-h-[calc(96vh)] text-base leading-6 pt-5"
        />
      </div>

      <div className="text-center h-full relative">
        <div id="video-grid" className="flex flex-wrap justify-center relative">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-[298px] h-[195px] m-1 rounded-md"
          />
        </div>
      </div>
        <div className="flex justify-center items-center left-2 fixed bottom-0 z-10 py-2">
          <button
            className="btn bg-[#4aee88] hover:bg-[#2b824c] rounded"
            onClick={handleCopyBtn}
          >
            Copy Meet Link
          </button>
        </div>
      <div className="fixed bottom-0 bg-gray-700 w-full py-2 flex justify-center items-center gap-5 z-0">
          <button
            onClick={toggleMute}
            className="bg-black bg-opacity-60 text-white p-2 rounded-full hover:bg-opacity-80 text-xl"
          >
            <i>{isMuted ? <BiSolidMicrophoneOff /> : <BiSolidMicrophone />}</i>
          </button>
          <button
            onClick={toggleCamera}
            className="bg-black bg-opacity-60 text-white p-2 rounded-full hover:bg-opacity-80 text-xl"
          >
            <i>{isCameraOff ? <FaVideoSlash /> : <FaVideo />}</i>
          </button>
          <button
            onClick={handleLeave}
            className="bg-black bg-opacity-60 text-white p-2 rounded-full hover:bg-opacity-80 text-xl"
          >
            <i>
              <ImExit />
            </i>
          </button>
      </div>
    </div>
  );
};

export default EditorPage;
