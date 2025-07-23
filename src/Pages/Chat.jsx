import { useEffect, useState, useCallback } from "react";
import styles from "./Chat.module.css";

import RoomList from "../features/chat/RoomList";
import MessageList from "../features/chat/MessageList";
import MessageInput from "../features/chat/MessageInput";
import chatRoomsAPI from "../api/chatRoomsAPI";
import { useChatSocket } from "../utils/useChatSocket";

function Chat() {
  const [allRoom, setAllRoom] = useState([]);
  const [roomId, setRoomId] = useState("");
  const [messages, setMessages] = useState([]);
  const [textMessage, setTextMessage] = useState("");

  const fetchRooms = useCallback(async () => {
    try {
      const rooms = await chatRoomsAPI.getAllRoom();
      setAllRoom(rooms);
    } catch (error) {
      console.error("Failed to fetch rooms", error);
    }
  }, []);

  const fetchMessages = useCallback(async (id) => {
    if (!id) {
      setMessages([]);
      return;
    }
    try {
      const result = await chatRoomsAPI.getMessageByRoomId(id);
      setMessages(result.messages || []);
    } catch (error) {
      console.error("Failed to fetch messages", error);
    }
  }, []);

  // Khởi tạo fetch danh sách phòng 1 lần khi mount
  useEffect(() => {
    fetchRooms();
  }, [fetchRooms]);

  // Tự động set roomId đầu tiên nếu chưa chọn phòng
  useEffect(() => {
    if (allRoom.length > 0 && !roomId) {
      setRoomId(allRoom[0]._id);
    }
  }, [allRoom, roomId]);

  // Lấy hook quản lý socket và realtime
  const { sendMessage, setLoadingMessages } = useChatSocket(
    roomId,
    fetchRooms,
    fetchMessages
  );

  // Fetch message khi đổi phòng
  useEffect(() => {
    fetchMessages(roomId);
  }, [roomId, fetchMessages]);

  const onChangeText = (e) => setTextMessage(e.target.value);

  const handleSend = useCallback(async () => {
    if (!roomId || !textMessage.trim()) return;

    const data = {
      text: textMessage.trim(),
      roomId,
      is_admin: true,
    };

    try {
      await chatRoomsAPI.addMessage(data);
      setTextMessage("");
      sendMessage(data);
      setLoadingMessages(true);
    } catch (error) {
      console.error("Failed to send message", error);
    }
  }, [roomId, textMessage, sendMessage, setLoadingMessages]);

  const handleRoomChange = useCallback((id) => setRoomId(id), []);

  return (
    <div className={styles.chatPage}>
      <h1>Chat</h1>
      <h3>App / Chat</h3>

      <div className={styles.chatContainer}>
        <div className={styles.chatSideBar}>
          <form>
            <input
              className="form-control"
              type="text"
              placeholder="Search Contact"
            />
          </form>

          <div>
            <RoomList
              rooms={allRoom}
              activeRoomId={roomId}
              onRoomSelect={handleRoomChange}
            />
          </div>
        </div>
        <div className={styles.chatArea}>
          <div className={styles.chatAreaList}>
            <MessageList messages={messages} />
          </div>
          <div className={styles.chatAreaInput}>
            <MessageInput
              value={textMessage}
              onChange={onChangeText}
              onSend={handleSend}
              disabled={!textMessage.trim() || !roomId}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;
