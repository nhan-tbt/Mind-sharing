const file = document.getElementById("file");
const previewContainer = document.getElementById("imgPreview");
const inner = document.getElementById("inner");
const indicators = document.getElementById("indicators");
var act = "";

file.addEventListener("change", function() {
    const f = this.files;
    indicators.innerHTML = '';
    inner.innerHTML = '';
    if (f) {
        for (let i = 0; i < f.length; i++) {
            var reader = new FileReader();
            
            
            console.log(act);

            
            reader.addEventListener("load", function(event) {
                var picFile = event.target;
                if (i === 0) {
                    act = "active";
                }
                else {
                    act = "";
                }
                var indi_htm = `<li data-target="#carouselId" data-slide-to="` + i + `" class="` + act + `"></li>`;
                var inner_htm = `<div class="carousel-item ` + act + `">
                                    <center><img src="` + picFile.result + `" alt="" class="image-preview"></center>
                                </div>`;
                indicators.insertAdjacentHTML("beforeend", indi_htm);
                inner.insertAdjacentHTML("beforeend", inner_htm);
            })
            reader.readAsDataURL(f[i]);
        } 
    }
    else {
        //previewImage.display = null;
        //previewImage.setAttribute("src", "");
        console.log(1);
        while(previewContainer.hasChildNodes()) {
            previewContainer.removeChild(previewContainer.childNodes[0]);
        }
        
    }
})