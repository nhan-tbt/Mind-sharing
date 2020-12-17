var listNav = document.getElementById('navbar');

function setCurrentUser(name){
    sessionStorage.setItem("current_user", name);
    console.log(sessionStorage.getItem("current_user"));
}

function setAnonymous(){
    for (let i = 0; i < listNav.children.length; i++){
        listNav.children[i].children[0].href = "/login";
        if (i == 2){
            listNav.children[i].children[0].setAttribute("data-toggle","");
        }
    }
}