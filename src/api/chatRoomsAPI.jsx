const BASE_URL = import.meta.env.VITE_API_URL || process.env.REACT_APP_API_URL;
const chatRoomsAPI = {
  getMessageByRoomId: async (roomId) => {
    const res = await fetch(`${BASE_URL}/chatrooms/getById?roomId=${roomId}`);
    return await res.json();
  },

  createNewRoom: async () => {
    const res = await fetch(`${BASE_URL}/chatrooms/createNewRoom`, {
      method: "POST",
    });
    return await res.json();
  },

  addMessage: async (body) => {
    const res = await fetch(`${BASE_URL}/chatrooms/addMessage`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    return await res.json();
  },

  getAllRoom: async () => {
    const res = await fetch(`${BASE_URL}/chatrooms/getAllRoom`);
    return await res.json();
  },
};

export default chatRoomsAPI;
