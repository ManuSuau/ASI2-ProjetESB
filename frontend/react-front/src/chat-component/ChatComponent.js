import HeaderBox from "../utilities/header";
import React, {useCallback, useEffect, useState} from "react";
import {io} from "socket.io-client";
import {useSelector} from "react-redux";
import {selectUser} from "../store/actions";


function ChatComponent() {
    const socket = io('http://localhost:4000');
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [recipientList, setRecipientList] = useState([]);
    const [selectedRecipient, setSelectedRecipient] = useState(null);
    const [isUserConnected, setIsUserConnected] = useState(false);
    const loggedUser = useSelector(selectUser);

    const handleSendMessage = () => {
        const messageObject = {
            sender: loggedUser.id,
            receiver : selectedRecipient.id,
            text: newMessage,
        };
        socket.emit('send-message', messageObject);
        // TODO : add message to the list of messages
        setMessages((messages) => [...messages, messageObject]);
        setNewMessage('');
    };


    useEffect(() => {
        socket.connect();
        // Handle events within useEffect
        socket.on('connect', () => {
            console.log('Connected to the Chat Server');
            socket.emit('login', { username: loggedUser.username, password: loggedUser.password });
            socket.on('login-success', (user) => {
                console.log('login-success', user);
                setIsUserConnected(true);
            });
        });

    }, [isUserConnected]);

    useEffect(() => {
        socket.on('update-user-list', (user) => {
            console.log('update-user-list', user);
            if (user.id !== loggedUser.id) {
                setRecipientList((prevList) => [...prevList, user]);
            }
        });
    }, [recipientList]);
    return (
        <div>
            <HeaderBox title="Chat" />
            <div>
                <h3>Users</h3>
                {recipientList.length !== 0 &&<ul>
                    {recipientList.map((user) => (
                        <li key={user.username} onClick={setSelectedRecipient(user)}>{user.username}</li>
                    ))}
                </ul>}
            </div>
            <div style={{ height: '300px', border: '1px solid #ccc', overflowY: 'scroll' }}>
                {messages.map((message, index) => (
                    <div key={index} style={{ padding: '8px', textAlign: message.sender === 'bot' ? 'left' : 'right' }}>
                        <strong>{message.sender === 'bot' ? 'Bot:' : 'You:'}</strong> {message.text}
                    </div>
                ))}
            </div>
            <div style={{ marginTop: '10px' }}>
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message..."
                />
                <button onClick={handleSendMessage}>Send</button>
            </div>
        </div>
    );
};

export default ChatComponent;