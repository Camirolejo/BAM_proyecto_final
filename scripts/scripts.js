//para el loader
window.addEventListener("load", function(){
    const contenedorLoader = document.querySelector(".contenedor-loader");
    contenedorLoader.style.display = "none";
})


//para que al hacer scroll la navbar tenga un color de fondo
let nav = document.querySelector("nav");
window.addEventListener("scroll", function(){
    const scroll = window.scrollY;
    // console.log(scroll, this.screen.width)

    if(scroll != 0 && screen.width > 950) {
        nav.style.backgroundColor =  "pink";
    }
    else if(scroll === 0 && screen.width > 950){
        nav.style.backgroundColor = "transparent";
    }
    if(screen.width <= 950){
        nav.style.backgroundColor =  "pink";
    }
});

//para que al hacer click en el icono se abra el menú o nav
const iconoMenu = document.querySelector("#toggle-menu");

iconoMenu.addEventListener("click", function(){
    nav.classList.toggle("show");
})

//-------------------------------CARRUSEL---------------------------------------------------

let prim = document.querySelector(".primera");
let seg = document.querySelector(".segunda");
let terc = document.querySelector(".tercera");

let btnSig = document.querySelector(".btn-sig");
let btnAnt = document.querySelector(".btn-ant");

let primAtributo = 0;
let segAtributo = 0;
let tercAtributo = 0;

let numImagen2 = 0;
let numImagen3 = 0;
let numImagen1 = 0;

btnSig.addEventListener("click", function(){
    segAtributo = seg.getAttribute("src");//obtengo lo que hay en el atributo src
    numImagen2 = parseInt(segAtributo.slice(15,16));//corto la cadena para obtener el número de imágen. los 
    //numero indican que caracteres quiero obtener.
 
    tercAtributo = terc.getAttribute("src");//obtengo lo que hay en el atributo src
    numImagen3 = parseInt(tercAtributo.slice(15,16));//corto la cadena para obtener el número de imágen
    
    prim.setAttribute("src", `./img/cats/img-${numImagen2}.jpg`);// a la primera imágen le modifico el atributo src con el 
    //mismo contenido solo que cambio el número de imágen al de la imagen de la derecha 

    seg.setAttribute("src", `./img/cats/img-${numImagen3}.jpg`);//a la segunda imágen lo mismo 

    if(numImagen3 === 9){//mis imágenes solo llegan hasta el nueve
        numImagen3 = -1;// -1 ya que abajo le sumo 1 lo que me da 0 (que es el número de la primera imágen)
    }
    terc.setAttribute("src", `./img/cats/img-${numImagen3 + 1}.jpg`);//a la tercera imágen le modifico el atributo src con el
    //mismo contenido solo que al número de imágen le sumo 1 para que avance hacia la derecha

});

btnAnt.addEventListener("click", function(){
    primAtributo = prim.getAttribute("src");//obtengo lo que hay en el atributo src
    numImagen1 = parseInt(primAtributo.slice(15,16));//corto la cadena para obtener el número de imágen

    segAtributo = seg.getAttribute("src");//obtengo lo que hay en el atributo src
    numImagen2 = parseInt(segAtributo.slice(15,16));//corto la cadena para obtener el número de imágen
 
    terc.setAttribute("src", `./img/cats/img-${numImagen2}.jpg`);//a la tercera imágen le modifico el atributo src
    //con el mismo contenido pero el número de imágen es el de la imagen a la izquierda de este

    seg.setAttribute("src", `./img/cats/img-${numImagen1}.jpg`);// a la segunda imágen le modifico el atributo src
    //con el mismo contenido solo que el número de imagen es el de la imágen a la izquierda de este

    if(numImagen1 === 0){//si el numero de imágen es 0 (el primero)
        numImagen1 = 10;//lo paso a 10 ya que abajo se resta 1 y queda en 9 que es la última imágen
    }
    prim.setAttribute("src", `./img/cats/img-${numImagen1 - 1}.jpg`);//a la primera imágen le modifico el atributo
    //src con el mismo contenido solo que le cambio el número de imágen a uno menos.
});

