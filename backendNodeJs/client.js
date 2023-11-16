document.addEventListener('DOMContentLoaded', function () {
    const socket = io();
    let currentUser;

    socket.on('login-success', (user) => {
        console.log('Connexion réussie:', user);
        currentUser = user;
        document.getElementById('user-selection').style.display = 'none';
        document.getElementById('chat').style.display = 'block';
        document.getElementById('user-info').innerHTML = `Connecté en tant que ${user.username}`;
    });

    socket.on('login-fail', () => {
        console.log('Échec de la connexion');
    });

    socket.on('update-user-list', (users) => {
        updateRecipientList(users);
    });

    socket.on('message', (data) => {
        const { historyKey, message } = data;
        const messagesContainer = document.getElementById('messages');
        const messageElement = document.createElement('li');

        messageElement.className = 'list-group-item messageitem';
        messageElement.classList.add('message-bubble', message.senderId === currentUser.id ? 'sent-message' : 'received-message');

        const timestamp = new Date().toLocaleTimeString();

        messageElement.innerHTML = `<div class="media">
            <div class="media-body">
                <div class="message-bubble message-content" style="background-color: ${message.senderId === currentUser.id ? '#007bff' : '#343a40'}; color: #fff; display: inline-block;">
                    <h5 class="mt-0">${currentUser.username}</h5>
                    <p>${message}</p>
                </div>
            </div>
        </div>`;

        messagesContainer.appendChild(messageElement);
    });

    function sendMessage() {
        const recipientId = document.getElementById('recipient').value;
        const messageInput = document.getElementById('message');
        const messageText = messageInput.value;

        if (messageText.trim() !== '' && recipientId) {
            const timestamp = new Date().toLocaleTimeString();
            const formattedMessage = `<div class="media">
                <div class="media-body">
                    <div class="message-bubble sent-message" style="background-color: #007bff; color: #fff; display: inline-block;">
                        <h5 class="mt-0">${currentUser.username}</h5>
                        <small class="mt-0" style="color: #fff;">${timestamp} - Me :</small>
                        <p style="display: inline-block;">${messageText}</p>
                    </div>
                </div>
            </div>`;

            const messagesContainer = document.getElementById('messages');
            const messageElement = document.createElement('li');
            messageElement.innerHTML = formattedMessage;
            messageElement.className = 'list-group-item messageitem';
            messagesContainer.appendChild(messageElement);

            if (recipientId === 'all') {
                socket.emit('message-all', { text: messageText });
            } else {
                socket.emit('message', { text: messageText, receiverId: recipientId });
            }

            messageInput.value = '';
        }
    }

    const sendMessageButton = document.getElementById('send-message-button');
    if (sendMessageButton) {
        sendMessageButton.addEventListener('click', sendMessage);
    }

    document.getElementById('user-selection-form').addEventListener('submit', async function (e) {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        socket.emit('login', { username, password });
    });

    function updateRecipientList(users) {
        const recipientSelect = document.getElementById('recipient');
        if (recipientSelect) {
            recipientSelect.innerHTML = '';

            const allOption = document.createElement('option');
            allOption.value = 'all';
            allOption.textContent = 'Tous les utilisateurs';
            recipientSelect.appendChild(allOption);

            users.forEach(user => {
                if (user.id !== currentUser.id) {
                    const option = document.createElement('option');
                    option.value = user.id;
                    option.textContent = user.username;
                    recipientSelect.appendChild(option);
                }
            });
        }
    }
});
        