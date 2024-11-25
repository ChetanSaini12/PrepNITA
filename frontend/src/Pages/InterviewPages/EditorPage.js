import React, { useEffect, useRef, useState } from "react";
import Client from "../../Components/Client.js";
import Editor from "../../Components/Editor.js";
import Peer from "peerjs";
import { useNavigate, useParams } from "react-router-dom";
import { BiSolidMicrophone, BiSolidMicrophoneOff } from "react-icons/bi";
import { ImExit } from "react-icons/im";
import { FaVideo, FaVideoSlash } from "react-icons/fa";
import toast from "react-hot-toast";
import { initSocket } from "../../socket";
import { useSelector } from "react-redux";

const EditorPage = () => {
  const codeRef = useRef(null);
  const [clients, setClients] = useState([]);
  const { roomId } = useParams();
  const socketRef = useRef(null);
  const reactnavigate = useNavigate();
  const [peers, setPeers] = useState([]);
  const [isMuted, setIsMuted] = useState(false);
  const [isCameraOff, setIsCameraOff] = useState(false);
  const videoRef = useRef(null); // Ensure initialization
  const peerInstanceRef = useRef(null);
  const peersRef = useRef([]);
  const streamRef = useRef(null);
  const { loggedIn, username } = useSelector((state) => state.user);

  // Redirect if not logged in
  // useEffect(() => {
  //   if (!loading && !loggedIn) {
  //     toast.error("Please log in to join the room");
  //     reactnavigate("/register");
  //   }
  // }, [loggedIn, loading, reactnavigate]);

  // Handle leaving the room
  const handleLeave = () => {
    try {
      toast.success("You left the room");
      reactnavigate("/");
    } catch (error) {
      console.error("Error during navigation:", error);
      toast.error("Failed to leave the room");
    }
  };

  const handleCopyRoomId = async () => {
    try {
      await navigator.clipboard.writeText(roomId);
      toast.success("Room ID copied");
    } catch (error) {
      console.error("Error copying Room ID:", error);
      toast.error("Error copying Room ID");
    }
  };

  const handleCopyRoomUrl = async () => {
    try {
      const roomUrl = `${window.location.origin}/room/${roomId}`;
      await navigator.clipboard.writeText(roomUrl);
      toast.success("Room URL copied");
    } catch (error) {
      console.error("Error copying Room URL:", error);
      toast.error("Error copying Room URL");
    }
  };

  const toggleCamera = () => {
    try {
      const enabled = streamRef.current?.getVideoTracks()[0]?.enabled;
      if (enabled !== undefined) {
        streamRef.current.getVideoTracks()[0].enabled = !enabled;
        setIsCameraOff(!enabled);
      }
    } catch (error) {
      console.error("Error toggling camera:", error);
      toast.error("Failed to toggle camera");
    }
  };

  const toggleMute = () => {
    try {
      const enabled = streamRef.current?.getAudioTracks()[0]?.enabled;
      if (enabled !== undefined) {
        streamRef.current.getAudioTracks()[0].enabled = !enabled;
        setIsMuted(!enabled);
      }
    } catch (error) {
      console.error("Error toggling mute:", error);
      toast.error("Failed to toggle mute");
    }
  };

  const addVideoStream = (stream, id) => {
    if (!videoRef.current) return; // Guard for null `videoRef`
    try {
      const video = document.createElement("video");
      video.srcObject = stream;
      video.id = id;
      video.addEventListener("loadedmetadata", () => {
        video.play();
      });
      document.getElementById("video-grid")?.appendChild(video);
    } catch (error) {
      console.error("Error adding video stream:", error);
      toast.error("Failed to display video");
    }
  };

  useEffect(() => {
    const init = async () => {
      const handleError = (e) => {
        console.error("Socket error:", e);
        toast.error("Server error, please try again");
        reactnavigate("/");
      };

      try {
        console.log("Initializing socket...");
        socketRef.current = await initSocket();
        socketRef.current.on("connect_error", handleError);
        socketRef.current.on("connect_failed", handleError);

        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });

        streamRef.current = stream;

        if (videoRef.current) {
          videoRef.current.srcObject = stream; // Ensure videoRef is mounted
        }

        const peer = new Peer(undefined);
        peerInstanceRef.current = peer;

        console.log("Joining room with:", { roomId, username });
        peer.on("open", (peerID) => {
          console.log("Peer open with ID:", peerID);
          socketRef.current.emit("join-room", {
            roomId,
            peerID,
            username,
          });
        });

        socketRef.current.on(
          "user-connected",
          ({ peerID, clients, socketId, username }) => {
            console.log("User connected:", {
              peerID,
              clients,
              socketId,
              username,
            });

            if (socketRef.current.id === socketId) {
              toast.success("You joined the room");
            } else {
              const call = peer.call(peerID, stream);
              call.on("stream", (userVideoStream) => {
                if (!peersRef.current.find((p) => p.id === peerID)) {
                  addVideoStream(userVideoStream, peerID);
                  peersRef.current.push({ id: peerID, call });
                  setPeers([...peersRef.current]);
                }
              });
              toast.success(`${username} joined`);
            }
            console.log("Updated clients:", clients);
            setClients(clients);

            socketRef.current.emit("codesync", {
              code: codeRef.current,
              socketId,
            });
          }
        );

        peer.on("call", (call) => {
          console.log("Receiving call from:", call.peer);
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
          ({ peerID, username, socketId }) => {
            console.log("User disconnected:", { peerID, username, socketId });
            try {
              const video = document.getElementById(peerID);
              video?.remove();
              peersRef.current = peersRef.current.filter(
                (p) => p.id !== peerID
              );
              setPeers([...peersRef.current]);
              toast.success(`${username} left`);
              setClients((prevClients) =>
                prevClients.filter((client) => client.socketId !== socketId)
              );
            } catch (error) {
              console.error("Error during user disconnection cleanup:", error);
            }
          }
        );
      } catch (error) {
        console.error("Initialization error:", error);
        toast.error("Error initializing the room");
        reactnavigate("/");
      }
    };

    if (loggedIn) {
      init();
    }

    return () => {
      try {
        if (streamRef.current) {
          streamRef.current.getTracks().forEach((track) => track.stop());
        }
        socketRef.current?.disconnect();
        socketRef.current?.off("user-connected");
        socketRef.current?.off("user-disconnected");
        peersRef.current.forEach(({ call }) => call.close());
      } catch (error) {
        console.error("Error during cleanup:", error);
      }
    };
  }, [roomId, reactnavigate, loggedIn, username]);

  return loggedIn ? (
    <div className="grid grid-cols-[230px_1fr_300px] h-screen text-white">
      <div className="bg-gray-900 p-4 flex flex-col">
        <div className="flex-1">
          <h3 className="font-bold text-center">Connected</h3>
          <div className="flex flex-wrap items-center gap-5 mt-4">
            {clients.map((client, index) => (
              <Client
                username={client.username || `Unknown User ${index}`}
                key={client.socketId || `unknown-client-${index}`}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="text-left h-full overflow-hidden">
        <div className="h-full overflow-auto">
          <Editor
            socketRef={socketRef}
            roomId={roomId}
            onCodeChange={(code) => (codeRef.current = code)}
          />
        </div>
      </div>
      <div className="text-center relative">
        <div id="video-grid" className="flex flex-wrap justify-center relative">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-72 h-48 m-1 rounded-md"
          />
        </div>
      </div>
      <div className="fixed bottom-0 w-full bg-gray-700 py-2 flex justify-center items-center gap-5 z-10">
        <button
          onClick={handleCopyRoomId}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
        >
          Copy Room ID
        </button>
        <button
          onClick={handleCopyRoomUrl}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Copy Room URL
        </button>
        <button
          onClick={toggleMute}
          className="bg-black bg-opacity-60 text-white p-2 rounded-full hover:bg-opacity-80 text-xl"
        >
          {isMuted ? <BiSolidMicrophoneOff /> : <BiSolidMicrophone />}
        </button>
        <button
          onClick={toggleCamera}
          className="bg-black bg-opacity-60 text-white p-2 rounded-full hover:bg-opacity-80 text-xl"
        >
          {isCameraOff ? <FaVideoSlash /> : <FaVideo />}
        </button>
        <button
          onClick={handleLeave}
          className="bg-black bg-opacity-60 text-white p-2 rounded-full hover:bg-opacity-80 text-xl"
        >
          <ImExit />
        </button>
      </div>
    </div>
  ) : null;
};

export default EditorPage;
