function setAnonymous(){
    var listNav = document.getElementById('navbar');

    for (let i = 1; i < listNav.children.length; i++){
        listNav.children[i].children[0].href = "/login";
        if (i == 2){
            listNav.children[i].children[0].setAttribute("data-toggle","");
        }
    }
}

document.getElementById('post_btn').addEventListener('click', function() {
    document.querySelector('.create_post').style.display = 'flex';
});

document.getElementById('close_btn').addEventListener('click', function() {
    document.querySelector('.create_post').style.display = 'none';
});