import { io } from "socket.io-client";
import { INTERVIEW_URL } from "./utils";

export async function initSocket() {
  const options = {
    "force new connection": true,
    reconnectionAttempts: 5,
    timeout: 180000,
    transports: ["websocket"],
  };

  return io(INTERVIEW_URL, options);
}
