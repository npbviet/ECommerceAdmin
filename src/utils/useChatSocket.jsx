import { useEffect, useState, useCallback } from "react";
import io from "socket.io-client";

const BASE_URL = import.meta.env.VITE_API_URL || process.env.REACT_APP_API_URL;
const socket = io(`${BASE_URL}/admin`, {
  transports: ["websocket"],
  withCredentials: true,
});

export function useChatSocket(roomId, fetchRooms, fetchMessages) {
  const [loadingMessages, setLoadingMessages] = useState(false);

  useEffect(() => {
    const handleReceiveMessage = () => {
      setLoadingMessages(true);
    };

    const handleRoomEnded = ({ roomId: closedRoomId, message }) => {
      alert(message || "Phòng đã kết thúc.");
      if (closedRoomId === roomId) {
        // Khi phòng hiện tại kết thúc thì reset
        fetchMessages("");
      }
      fetchRooms();
    };

    socket.on("receive_message", handleReceiveMessage);
    socket.on("roomEnded", handleRoomEnded);

    return () => {
      socket.off("receive_message", handleReceiveMessage);
      socket.off("roomEnded", handleRoomEnded);
    };
  }, [roomId, fetchRooms, fetchMessages]);

  useEffect(() => {
    if (loadingMessages && roomId) {
      fetchMessages(roomId);
      setLoadingMessages(false);
    }
  }, [loadingMessages, roomId, fetchMessages]);

  const sendMessage = useCallback((data) => {
    socket.emit("send_message", data);
  }, []);

  return { sendMessage, setLoadingMessages };
}
