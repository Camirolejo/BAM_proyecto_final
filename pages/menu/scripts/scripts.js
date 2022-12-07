let nav = document.querySelector("nav");
let iconoMenu = document.querySelector(".toggle-menu");

iconoMenu.addEventListener("click", function(){
    nav.classList.toggle("hidden");
})

//------------- CARRITO---------------------------


let btnCarrito = document.querySelector(".carrito-btn");
let divCarrito = document.querySelector(".carrito");

btnCarrito.addEventListener("click", function(){
    divCarrito.classList.toggle("mostrar-ocultar");//al hacer click se muestra u oculta el carrito
})

let botonAgregar = document.querySelectorAll("button");

let cantEnCarritoTotal = document.getElementById("cant-items");//para la nav


let todosLosProductos = [];//todos los productos que están en el carrito


for(let i = 0; i < botonAgregar.length; i++){ //le doy un evento a todos los botones

    botonAgregar[i].addEventListener("click", function(){



        //para actualizar el contador de items de la nav
        let total = 0;
        total = parseInt(cantEnCarritoTotal.textContent) + 1;
        cantEnCarritoTotal.innerHTML = total;


        let precioItem = parseInt(document.getElementById(i).textContent);
        let idNombreItem = i.toString();
        let nombreItem = document.getElementsByClassName(idNombreItem)[0].outerText;
        let imgNewItem = document.getElementsByClassName("imagen")[i].attributes.src.textContent;


        let producto = {
            nombre : nombreItem,
            precio : precioItem,
            cantidad : 1,
            total : precioItem,
            imagen : imgNewItem
        }
        
        if(todosLosProductos.length == 0){
            todosLosProductos.push(producto);
        }
        else{
            let prodBuscado = buscaProducto(todosLosProductos, nombreItem);
            if( prodBuscado === false ){
                todosLosProductos.push(producto);
            }
            else{
                modificoProducto(todosLosProductos, prodBuscado);
            }
        }

        //por cada elemento en el array se debe crear un nuevo item en el html
        //y borrar los anteriores
        let items = document.querySelectorAll(".item-carrito");
        items.forEach(item => {
            item.remove();
        });

        let hrItems = document.querySelectorAll(".hr-item");//tambien borro los hr agregados
        hrItems.forEach(hr =>{
            hr.remove();
        });



     
        todosLosProductos.forEach( function(producto) {

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

           
            
            
        })

        //actualizo el total
        let totalProductos = calculaTotal(todosLosProductos);
        let spanTotal = document.getElementById("spanTotal");
        spanTotal.textContent = totalProductos;


        //ELIMINA ITEMS AL HACER CLICK EN LA CRUZ
        let btnEliminar = document.querySelectorAll(".btn-eliminar");
        
        let cantidadDeEliminados = 0;
        for(let i = 0; i < btnEliminar.length; i++){
            btnEliminar[i].addEventListener("click",  function(){
                let nombreItemElimminar = (btnEliminar[i].parentElement.getElementsByClassName("item-nombre-carrito")[0].textContent);

               let posEliminar =  buscaProducto(todosLosProductos, nombreItemElimminar);


               let cantItemsEliminados = todosLosProductos.splice(posEliminar, 1);
               let itemEliminar = document.querySelectorAll(".item-carrito");
               
               let eliminado = itemEliminar[posEliminar].parentElement.getElementsByClassName("precio-carrito")[posEliminar].textContent;
               let eliminadoCant = itemEliminar[posEliminar].parentElement.getElementsByClassName("cantidad-carrito")[posEliminar].textContent;

               itemEliminar[posEliminar].remove();

               if(todosLosProductos.length == 0){
                   spanTotal.textContent = 0;
                }
                else{
                    spanTotal.textContent = totalProductos - (eliminado * eliminadoCant);
                }

                let cantEnCarritoTotalAct = document.getElementById("cant-items");
                let totalElim = cantEnCarritoTotalAct.textContent - cantItemsEliminados[0].cantidad;
                cantEnCarritoTotal.innerHTML = totalElim;
            })
        }
    })
}

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
