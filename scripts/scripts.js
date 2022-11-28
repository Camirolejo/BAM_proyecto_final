//para que al hacer scroll la navbar tenga un color de fondo
let nav = document.querySelector("nav");
        window.addEventListener("scroll", function(){
            nav.style.backgroundColor =  "#b25824";

            //si vuelvo a arriba en la página otra vez vuelve a ser transparente
            const scroll = window.scrollY;
            if(scroll === 0){
                nav.style.backgroundColor = "transparent";
            }

        })