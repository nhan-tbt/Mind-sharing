const file = document.getElementById("file");
const previewContainer = document.getElementById("imgPreview");
const previewImage = previewContainer.querySelector(".image-preview");

file.addEventListener("change", function() {
    const f = this.files[0];

    if (f) {
        const reader = new FileReader();
        previewImage.style.display = "block";
        
        reader.addEventListener("load", function() {
            previewImage.setAttribute("src", this.result);
        })

        reader.readAsDataURL(f);
    }
    else {
        previewImage.display = null;
        previewImage.setAttribute("src", "");
    }
})