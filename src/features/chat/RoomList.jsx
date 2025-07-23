import styles from "./RoomList.module.css";

function RoomList({ rooms, activeRoomId, onRoomSelect }) {
  return (
    <ul className={styles.mailbox}>
      <li>
        <div className={styles.mailboxContainer}>
          {rooms.map((room) => (
            <button
              key={room._id}
              onClick={() => onRoomSelect(room._id)}
              className={`${room._id === activeRoomId ? styles.active : ""}`}
              type="button"
            >
              <img
                src="https://img.icons8.com/color/36/000000/administrator-male.png"
                alt="user"
                className="img-fluid rounded-circle"
                width="40"
              />

              <h6>{room._id}</h6>
            </button>
          ))}
        </div>
      </li>
    </ul>
  );
}

export default RoomList;
