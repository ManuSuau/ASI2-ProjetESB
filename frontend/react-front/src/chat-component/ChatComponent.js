import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useSelector } from "react-redux";
import { selectUser } from "../store/actions";
import HeaderBox from "../utilities/header";

function ChatComponent() {
  const socket = io("http://localhost:4000");
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [recipientList, setRecipientList] = useState([]);
  const [selectedRecipient, setSelectedRecipient] = useState(null);
  const [isUserConnected, setIsUserConnected] = useState(false);
  const loggedUser = useSelector(selectUser);

  useEffect(() => {
    socket.connect();

    socket.on("connect", () => {
      console.log("Connected to the chat server");
      socket.emit("login", { username: loggedUser.username, password: loggedUser.password });
    });

    socket.on("login-success", (user) => {
      console.log("Login successful", user);
      setIsUserConnected(true);
    });

    return () => {
      socket.disconnect();
    };
  }, [loggedUser]);

  useEffect(() => {
    socket.on("update-user-list", (users) => {
      updateRecipientList(users);
    });

    socket.on("message", (data) => {
      const { userid,username,historyKey, message } = data;
      const timestamp = new Date().toLocaleTimeString();

      setMessages((prevMessages) => [
        ...prevMessages,
        {
          senderId: userid,
          text: `${timestamp} - ${username}: ${message}`,
        },
      ]);
    });
  }, [selectedRecipient]);

  const handleSendMessage = () => {
    const messageObject = {
      id: loggedUser.id,
      receiverId: selectedRecipient.id,
      text: newMessage,
    };
    

    socket.emit("message", messageObject);

    setMessages((prevMessages) => [
      ...prevMessages,
      {
        senderId: loggedUser.id,
        text: newMessage,
      },
    ]);

    setNewMessage("");
  };

  const handleSendMessageAll = () => {
    
    const messageObject = {
      id: loggedUser.id,
      receiverId: -1,
      text: newMessage,
    };
    

    socket.emit("message", messageObject);

    setMessages((prevMessages) => [
      ...prevMessages,
      {
        senderId: loggedUser.id,
        text: newMessage,
      },
    ]);

    setNewMessage("");
  };

  const updateRecipientList = (users) => {
    setRecipientList(users.filter((user) => user.id !== loggedUser.id));
  };

  return (
    <div>
      <HeaderBox title="Chat" />
      <div>
        <h3>Utilisateurs</h3>
        {recipientList.length !== 0 && (
          <ul>
            <li>Tout le monde</li>
            {recipientList.map((user) => (
              <li key={user.id} onClick={() => setSelectedRecipient(user)}>
                {user.username}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div style={{ height: "300px", border: "1px solid #ccc", overflowY: "scroll" }}>
        {messages.map((message, index) => (
          <div key={index} style={{ padding: "8px", textAlign: "left" }}>
            <strong>{message.senderId === loggedUser.id ? "Vous" : message.senderId}</strong>: {message.text}
          </div>
        ))}
      </div>
      <div style={{ marginTop: "10px" }}>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Tapez votre message..."
        />
        <button onClick={handleSendMessage}>Envoyer</button>
        <button onClick={handleSendMessageAll}>Envoyer à tout le monde</button>
      </div>
    </div>
  );
}

export default ChatComponent;
