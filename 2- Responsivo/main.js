let btn = document.querySelector('#button-id');
var container = document.querySelector('#reference-container')

btn.addEventListener('click', function() {
    if (container.style.visibility === "hidden") {
        container.style.visibility = "visible";
      } else {
        container.style.visibility = "hidden";
      }
})


function updateImg() {
    let logo = document.getElementById('samambaia');
    if(window.innerWidth < 900) {
        logo.src = 'assets/image2.svg'
    } else {
        logo.src = 'assets/image.svg'
    }
}

updateImg()

window.addEventListener("resize", updateImg);