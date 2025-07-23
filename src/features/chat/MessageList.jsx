import styles from "./MessageList.module.css";

function MessageList({ messages }) {
  return (
    <div className={styles.scrollContainer}>
      {" "}
      <ul className={styles.chatList}>
        {messages.map((msg, i) =>
          msg.isAdmin ? (
            <li key={i} className={styles.adminMessage}>
              <div className={styles.messageBox}>You: {msg.message}</div>
            </li>
          ) : (
            <li key={i} className={styles.clientMessage}>
              <img
                src="https://img.icons8.com/color/36/000000/administrator-male.png"
                alt="user"
                className={styles.avatar}
              />
              <div className={styles.messageContent}>
                <span className={styles.sender}>
                  {msg.senderName || "Client"}
                </span>
                <div className={styles.messageBox}>Client: {msg.message}</div>
              </div>
            </li>
          )
        )}
      </ul>
    </div>
  );
}

export default MessageList;
