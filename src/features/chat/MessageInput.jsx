import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./MessageInput.module.css";

function MessageInput({ value, onChange, onSend, disabled }) {
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (!disabled) onSend();
    }
  };

  const handleClickSend = () => {
    if (!disabled) onSend();
  };

  return (
    <div className={styles.messageInput}>
      <input
        id="textarea1"
        placeholder="Type and enter"
        className="form-control border-0"
        type="text"
        onChange={onChange}
        value={value}
        onKeyDown={handleKeyDown}
      />
      <FontAwesomeIcon
        icon="fa-solid fa-paper-plane"
        className={`${styles.iconSend} ${disabled ? styles.disabled : ""}`}
        onClick={handleClickSend}
      />
    </div>
  );
}

export default MessageInput;
