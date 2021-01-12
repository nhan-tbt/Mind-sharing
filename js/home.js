function setAnonymous(){
    var listNav = document.getElementById('navbar');

    for (let i = 1; i < listNav.children.length; i++){
        listNav.children[i].children[0].href = "/login";
        if (i == 2 || i == listNav.children.length - 1){
            listNav.children[i].children[0].removeAttribute(("data-toggle"));
        }
    }

    var post = document.querySelector('.post_here');
    var inter = document.querySelectorAll('.interaction');
    var cmt = document.querySelectorAll('.input_cmt');

    post.style.display = "none";
    inter.forEach(hide);
    cmt.forEach(hide);

    function hide(item){
        item.style.display = "none";
    }
}