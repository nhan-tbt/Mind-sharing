const socket = io();
const user = sessionStorage.getItem("currentUser");

var chatForm = document.getElementById('chat-form');
var message = document.getElementById('message');
var chatBox = document.getElementById('chat-box');


socket.on('message', mess => {
    console.log(1)
    console.log(mess.mess);
    if (mess.who != user){
        var outputMess = `<div class="row">
            <div class="box-mess guy col-auto" id="guy">
                ${mess.mess}
            </div>
        </div>`

        chatBox.insertAdjacentHTML('beforeend', outputMess);
        chatBox.scrollTop = chatBox.scrollHeight;
    } else {
        var outputMess = `<div class="row justify-content-end">
            <div class="box-mess me col-auto" id="me">
                ${mess.mess}
            </div>
        </div>`
    
        chatBox.insertAdjacentHTML('beforeend', outputMess);
        chatBox.scrollTop = chatBox.scrollHeight;
    }
});

chatBox.scrollTop = chatBox.scrollHeight;

chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const mess = message.value;
    var today = new Date();
    var dateTime = today.getFullYear() + '/' + (today.getMonth() + 1) + '/' +today.getDate() + '/' + today.getHours() + "/" + today.getMinutes() + "/" + today.getSeconds() + "/" + today.getMilliseconds();
    var type = "TEXT";

    socket.emit('chatMessage', {mess, user, type, dateTime});

    message.value = "";
})