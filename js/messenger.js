const socket = io();
const user = sessionStorage.getItem("currentUser");

var chatForm = document.getElementById('chatform');
var message = document.getElementById('message');
var chatBox = document.getElementById('chat-box');
const file = document.getElementById("file");
const previewContainer = document.querySelector(".PreviewImg");

chatBox.scrollTop = chatBox.scrollHeight

socket.on('message', mess => {
    var outputMess = ``;
    if (mess.who == user){
        outputMess +=   `<div class="row justify-content-end">
                            <div class="box-mess me col-auto" id="guy">`;
    } else {
        outputMess +=   `<div class="row">
                            <div class="box-mess guy col-auto" id="me">`;
    }

    for (let i = 0; i < mess.imgPath.length; i++){ 
        outputMess += `<div><img src="${mess.imgPath[0]}" class="preview_img img-thumbnail m-2">`;
    }
    
    outputMess += `</div>${mess.contentMess}`;
    outputMess += `</div></div>`;

    chatBox.insertAdjacentHTML('beforeend', outputMess);
    setTimeout(() => { chatBox.scrollTop = chatBox.scrollHeight }, 300);
});

chatForm.addEventListener('submit', (e) => {
    e.preventDefault();

    if (file.value != "" || message.value != ""){
        let formData = new FormData(chatForm);
        $.ajax( {
            url: '/message/get_data_message',
            type: 'POST',
            enctype: 'multipart/form-data',
            data: formData,
            processData: false,
            contentType: false,
            success: function (mess) {
                socket.emit('chatMessage', mess);
                localtion.reload();
            }
        });
    }

    message.value = "";
    file.value = "";
    previewContainer.innerHTML = "";
})

function getMeta(url){   
    var img = new Image();
    img.onload = function(){
        alert(this.height);
    };
    img.src = url;
}

file.addEventListener("change", function() {
    const f = this.files;
    previewContainer.innerHTML = '';
    if (f) {
        for (let i = 0; i < f.length; i++) {
            var reader = new FileReader();
            
            reader.addEventListener("load", function(event) {
                var picFile = event.target;

                var indi_htm = `<img src="` + picFile.result + `" class="preview_img img-thumbnail m-2">`;
                previewContainer.insertAdjacentHTML("beforeend", indi_htm);
            })
            reader.readAsDataURL(f[i]);
        } 
        document.getElementById("numberIMG").value = f.length;
    }
    else {
        while(previewContainer.hasChildNodes()) {
            previewContainer.removeChild(previewContainer.childNodes[0]);
        }
    }
})

setTimeout(() => { chatBox.scrollTop = chatBox.scrollHeight }, 300);