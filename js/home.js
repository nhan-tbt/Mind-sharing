function setAnonymous(){

    if (sessionStorage.getItem("current_user") == null){
        var listNav = document.getElementById('navbar');

        for (let i = 0; i < listNav.children.length; i++){
            listNav.children[i].children[0].href = "/login";
            if (i == 2){
                listNav.children[i].children[0].setAttribute("data-toggle","");
            }
        }
    }
}