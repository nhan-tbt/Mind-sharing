function Confirm_Notification() { 
    alert("Change password successfully!");
}

var editBtn = document.getElementById("editBtn");

editBtn.addEventListener("click", function(e) {
    e.preventDefault();

    $(".form-control").prop("disabled", false);

    document.getElementById("cfmBtn").style.display = "block";
    editBtn.style.display = "none";
});