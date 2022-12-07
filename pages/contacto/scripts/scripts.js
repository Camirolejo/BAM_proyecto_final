let cerrar = document.querySelector(".cerrarPopUp");
let popUp = document.querySelector(".popUp");

setTimeout( () => {
    popUp.style = "display : flex";
}, 2000);

cerrar.addEventListener("click", function(){
    popUp.style = "display : none";
})