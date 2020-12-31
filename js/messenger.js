const socket = io();

var chatForm = document.getElementById('chat-form');
var message = document.getElementById('message');
var chatBox = document.getElementById('chat-box');


socket.on('message', message => {
    console.log(message);
});

chatBox.scrollTop = chatBox.scrollHeight;

chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const mess = message.value;
    
    var outputMess = `<div class="row justify-content-end">
        <div class="box-mess me col-auto" id="me">
            ${mess}
        </div>
    </div>`

    chatBox.insertAdjacentHTML('beforeend', outputMess);
    chatBox.scrollTop = chatBox.scrollHeight;

    socket.emit('chatMessage', mess);

    message.value = "";
})