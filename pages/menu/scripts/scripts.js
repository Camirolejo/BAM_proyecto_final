let nav = document.querySelector("nav");
let iconoMenu = document.querySelector(".toggle-menu");

iconoMenu.addEventListener("click", function(){
    nav.classList.toggle("hidden");
})