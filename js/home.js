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
    document.querySelector('.create_post').style.display = 'inline';
    document.querySelector('.post_here').style.display = 'none';
});

document.getElementById('close_btn').addEventListener('click', function() {
    document.querySelector('.create_post').style.display = 'none';
    document.querySelector('.post_here').style.display = 'flex';
});


document.querySelector('.like').addEventListener('click', function() {
    var postID = document.querySelector('.postsID').id;
    document.getElementById('unlike' + id).style.display = 'inline';
    document.getElementById('like' + id).style.display = 'none';
    $.ajax({
        url: '/like',
        type: 'POST',
        data: { postID },
        success: result => {
            console.log(result);
            $('.countLike' + id).hmtl(`${result}`);
        },
    })
})

document.querySelector('.unlike').addEventListener('click', function() {
    var postID = document.querySelector('.postsID').id;
    document.getElementById('like' + id).style.display = 'inline';
    document.getElementById('unlike' + id).style.display = 'none';
    $.ajax({
        url: '/unlike',
        type: 'POST',
        data: { postID },
        success: result => {
            console.log(result);
            $('.countLike' + id).hmtl(result);
        },
    })
})

function checkLikedPost() {
    $.ajax({
        url: '/',
        type: 'GET',
        success: result => {
            
        }
    })
}