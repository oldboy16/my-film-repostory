let elCanvas = document.querySelector(".off__canvas")
let elShadow = document.querySelector(".shadow")
function openCanvas() {
    elCanvas.classList.add("open__off")
    elShadow.style.display = "block"
}
function closeCanvas(){
    elCanvas.classList.remove("open__off")
    elShadow.style.display = "none"
}