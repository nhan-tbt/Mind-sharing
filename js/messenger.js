const socket = io();
const user = sessionStorage.getItem("currentUser");

var chatForm = document.getElementById('chatform');
var message = document.getElementById('message');
var chatBox = document.getElementById('chat-box');
var closeBtn = document.getElementById('close_preview_btn');
var numberIMG = document.getElementById('numberIMG');
var search = document.getElementById('searchUser');
var close_search = document.getElementById('close_search_btn');

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

    if (mess.imgPath.length != 0) {
        outputMess += `<div>`;
        for (let i = 0; i < mess.imgPath.length; i++){ 
            outputMess += `<img src="${mess.imgPath[0]}" class="preview_img img-thumbnail m-2">`;
        }
        outputMess += `</div>`;
    }
    
    outputMess += `${mess.contentMess}`;
    outputMess += `</div></div>`;

    chatBox.insertAdjacentHTML('beforeend', outputMess);
    setTimeout(() => { chatBox.scrollTop = chatBox.scrollHeight }, 300);
});

chatForm.addEventListener('submit', (e) => {
    e.preventDefault();

    console.log("here")
    if (file.value != "" || message.value != ""){
        console.log(message.value);
        console.log(file.value);
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
            }
        });
    }

    message.value = "";
    file.value = "";
    previewContainer.innerHTML = "";
    closeBtn.style.display = "none";
    numberIMG.value = 0;
})

closeBtn.addEventListener("click", function() {
    file.value = "";
    previewContainer.innerHTML = "";
    closeBtn.style.display = "none";
    numberIMG.value = 0;
})

file.addEventListener("change", function() {
    const f = this.files;
    previewContainer.innerHTML = '';
    closeBtn.style.display = "initial";
    numberIMG.value = 0;

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
        numberIMG.value = f.length;
    }
    else {
        while(previewContainer.hasChildNodes()) {
            previewContainer.removeChild(previewContainer.childNodes[0]);
        }
    }
})

search.addEventListener('click', function(event) {
    console.log("a")
    var isClickInside = search.contains(event.target);
  
    search.style.width = "240px";
    search.style.left = "0px";
    close_search.style.display = "initial";


    if (!isClickInside) {
        search.style.width = "280px";
        search.style.left = "-40px";
        close_search.style.display = "initial";
    }
  });

$(document).ready(function(){
    $("input").keyup(function(){
      
    });
});


setTimeout(() => { chatBox.scrollTop = chatBox.scrollHeight }, 300);