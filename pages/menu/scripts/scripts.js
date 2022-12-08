//PARA LA NAV EN CELULAR 
let nav = document.querySelector("nav");
let iconoMenu = document.querySelector(".toggle-menu");

iconoMenu.addEventListener("click", function(){
    nav.classList.toggle("hidden");//al hacer click se muestra u oculta la nav
})

//------------- CARRITO---------------------------


let btnCarrito = document.querySelector(".carrito-btn");
let divCarrito = document.querySelector(".carrito");

btnCarrito.addEventListener("click", function(){
    divCarrito.classList.toggle("mostrar-ocultar");//al hacer click se muestra u oculta el carrito
})

let botonAgregar = document.querySelectorAll("button");

let cantEnCarritoTotal = document.getElementById("cant-items");//selecciono el número de la nav

let todosLosProductos = [];//aca van los productos seleccionados del carrito


for(let i = 0; i < botonAgregar.length; i++){ //le doy un evento a todos los botones

    botonAgregar[i].addEventListener("click", function(){



        //para actualizar el contador de items de la nav
        let total = 0;
        total = parseInt(cantEnCarritoTotal.textContent) + 1;//al hacer click en un botón se suma 1 item en la nav
        cantEnCarritoTotal.innerHTML = total;

        //tomo la i del for para buscar el precio de el item clickeado, ya que cada item tiene un id que es un número
        let precioItem = parseInt(document.getElementById(i).textContent);
        let claseNombreItem = i.toString(); //paso la i a string ya que el nombre del item tiene una clase que es un número
        let nombreItem = document.getElementsByClassName(claseNombreItem)[0].outerText; //obtengo el nombre del item clickeado
        let imgNewItem = document.getElementsByClassName("imagen")[i].attributes.src.textContent;//obtengo la imágen


        let producto = { //creo un producto
            nombre : nombreItem,
            precio : precioItem,
            cantidad : 1,
            total : precioItem,
            imagen : imgNewItem
        }
        
        if(todosLosProductos.length == 0){//si el array de productos está vacío
            todosLosProductos.push(producto);//meto el item clickeado al array
        }
        else{//si tiene algún elemento
            let prodBuscado = buscaProducto(todosLosProductos, nombreItem);//busco si ese producto ya está en el array
            if( prodBuscado === false ){//si el producto no está
                todosLosProductos.push(producto);//lo meto al array
            }
            else{//si el producto está en el array
                modificoProducto(todosLosProductos, prodBuscado);//modifico la cantidad del objeto producto en el array
            }
        }

        //borra todos los items del html y los hr
        borraItemsYhr();


        //por cada producto en el array de productos 
        todosLosProductos.forEach( function(producto) {

            //creo nuevos items y los agrego al html
            creaItemNuevo(producto);

        });

        //actualizo el total
        let totalProductos = calculaTotal(todosLosProductos);
        let spanTotal = document.getElementById("spanTotal");
        spanTotal.textContent = totalProductos;


        //ELIMINA ITEMS AL HACER CLICK EN LA CRUZ
        let btnEliminar = document.querySelectorAll(".btn-eliminar");//selecciono todos los botones eliminar
        
        // let cantidadDeEliminados = 0;
        for(let i = 0; i < btnEliminar.length; i++){//le doy un evento click a cada botón
            btnEliminar[i].addEventListener("click",  function(){
               
                //busco el nombre del item que quiero eliminar
               let nombreItemEliminar = (btnEliminar[i].parentElement.getElementsByClassName("item-nombre-carrito")[0].textContent);

               //busco la posicion en el array del item que quiero eliminar a través del nombre
               let posEliminar =  buscaProducto(todosLosProductos, nombreItemEliminar);

               //elimino el item del array y obtengo la cantidad de eliminados
               let cantItemsEliminados = todosLosProductos.splice(posEliminar, 1);
               let itemEliminar = document.querySelectorAll(".item-carrito");//selecciono todoslos items del html
               
               //obtengo el item a eliminar
               let eliminado = itemEliminar[posEliminar].parentElement.getElementsByClassName("precio-carrito")[posEliminar].textContent;
               //obtengo la cantidad de items a eliminar
               let eliminadoCant = itemEliminar[posEliminar].parentElement.getElementsByClassName("cantidad-carrito")[posEliminar].textContent;

               itemEliminar[posEliminar].remove();//elimino el item del html

               let hrEliminar = document.querySelectorAll(".hr-item");//selecciono todos los hr co la clase hr-item
               hrEliminar[hrEliminar.length - 1].remove();//elimino el último hr 

               if(todosLosProductos.length == 0){//si el array queda vacío 
                   spanTotal.textContent = 0;//el total queda en cero
                }
                else{//si no está vacío 
                    totalProductos = totalProductos - (eliminado * eliminadoCant);//descuento la cantidad que se eliminó
                    spanTotal.textContent = totalProductos;//escribo el total actualizado en el html
                }

                let cantEnCarritoTotalAct = document.getElementById("cant-items");//selecciono la cantidad en la nav
                let totalElim = cantEnCarritoTotalAct.textContent - cantItemsEliminados[0].cantidad;//actualizo la cantidad
                cantEnCarritoTotal.innerHTML = totalElim;
            })
        }
    })
}

//  FUNCIONES -+-+-+-+++-+-+-+-+-+-++-+++

function calculaTotal (arrayProductos){
    let total = 0;
    arrayProductos.forEach(item => {
        total = total + (item.cantidad * item.precio);
    });
    return total;
}

function buscaProducto (arrayProductos, nombreProducto){
    for(let i = 0; i < arrayProductos.length; i++){
        if(arrayProductos[i].nombre === nombreProducto){
            return i;
        }
    }
    return false;
}

function modificoProducto(arrayDeProductos, pos){
    arrayDeProductos[pos].cantidad = arrayDeProductos[pos].cantidad + 1;
    arrayDeProductos[pos].total = arrayDeProductos[pos].cantidad * arrayDeProductos[pos].precio;
    return;
}

function borraItemsYhr(){
    //por cada elemento en el array se debe crear un nuevo item en el html
    let items = document.querySelectorAll(".item-carrito");
    items.forEach(item => {
        item.remove();//y borra todos los anteriores
    });
    
    let hrItems = document.querySelectorAll(".hr-item");//tambien borro los hr agregados
    hrItems.forEach(hr =>{
        hr.remove();
    });
}

function creaItemNuevo(producto){
    //creo un item y lo agrego al html

    let h3Titulo = document.createElement("h3");
    let spanCantCarrito = document.createElement("span");
    let spanPrecioCarrito = document.createElement("span");
    let imgEliminar = document.createElement("img");

    h3Titulo.textContent = producto.nombre;
    spanCantCarrito.textContent = producto.cantidad;
    spanPrecioCarrito.textContent = producto.precio;

    h3Titulo.classList.add("item-nombre-carrito");
    spanCantCarrito.classList.add("cantidad-carrito");
    spanPrecioCarrito.classList.add("precio-carrito");
    imgEliminar.classList.add("imgEliminar");

    let pItemCantidadCarrito = document.createElement("p");
    let pItemPrecioCarrito = document.createElement("p");
    let btnEliminar = document.createElement("div");
    
    pItemCantidadCarrito.classList.add("item-cantidad-carrito");
    pItemCantidadCarrito.textContent = "Cantidad : ";
    
    pItemPrecioCarrito.classList.add("item-precio-carrito");
    pItemPrecioCarrito.textContent = "Precio : $";
    
    btnEliminar.classList.add("btn-eliminar");
    imgEliminar.setAttribute("src", "./img/eliminar.png");

    pItemCantidadCarrito.appendChild(spanCantCarrito);
    pItemPrecioCarrito.appendChild(spanPrecioCarrito);
    btnEliminar.appendChild(imgEliminar);

    let divItemInfoCarrito = document.createElement("div");
    divItemInfoCarrito.classList.add("item-info-carrito");

    divItemInfoCarrito.appendChild(h3Titulo);
    divItemInfoCarrito.appendChild(pItemCantidadCarrito);
    divItemInfoCarrito.appendChild(pItemPrecioCarrito);
    divItemInfoCarrito.appendChild(btnEliminar);

 
    //------
    let imagenCarrito = document.createElement("img");
    imagenCarrito.classList.add("imagen-carrito");

    imagenCarrito.setAttribute("src", producto.imagen);

    let divImg = document.createElement("div");
    divImg.classList.add("item-imagen-carrito");

    divImg.appendChild(imagenCarrito);
    //-----------

    let divItemCarrito = document.createElement("div");
    divItemCarrito.classList.add("item-carrito");

    divItemCarrito.appendChild(divItemInfoCarrito);
    divItemCarrito.appendChild(divImg);

    //-----

    let itemsDelCarrito = document.getElementById("itemsDelCarrito");
    itemsDelCarrito.appendChild(divItemCarrito);

    let hr = document.createElement("hr");
    hr.classList.add("hr-item");
    itemsDelCarrito.appendChild(hr);
}