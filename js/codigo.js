let animacion = document.querySelectorAll('.animacion');
let contadores = document.querySelectorAll('.contador');

//obtenemos el alto del menu
const  altoDelMenu = document.querySelector('nav').offsetHeight;

//colocamos a todos los hipervinculos con la clase .scrollMenu una funcion
const links = document.querySelectorAll('.scrollMenu')
for (const link of links) {
    link.addEventListener("click", scrollearAUbicacion);
}



function mostrarScroll () {
    //guardamos en que pixel se encuentra el scroll
    let scrollTop = document.documentElement.scrollTop;

    for( let i = 0; i < animacion.length; i++ ){
        // guardamos en que distancia en pixeles 
        // se encuentra el objeto respecto al borde superior
        let alturaAnimacion = animacion[i].offsetTop;

        //agregamos la animacion si el scroll supera los pixeles
        if( alturaAnimacion - 800 < scrollTop) {
            animacion[i].style.opacity = 1;
            animacion[i].classList.add('mostrarArriba')
        }
    }
}
function scrollearAUbicacion (e) {
    //No haga ningun evento los hipervinculos
    e.preventDefault();

    const href = e.target.getAttribute('href');
    const alturaElemento = document.querySelector(href).offsetTop;

    scroll({
        //sumamos el alto del menu fixed asi no tapa nada
        top: alturaElemento - altoDelMenu,
        behavior: "smooth"
    })

}
function ocultarBotonFlecha () {
    let scrollTop = document.documentElement.scrollTop;
    let botonUp = document.getElementById("botonUp");

    //cuando la pagina este arriba de todo, ocultamos el boton
    //sino lo mostramos con una animacion
    if( scrollTop === 0 ){
        botonUp.style.display = 'none';
    }else{
        botonUp.style.display = 'inline';
        botonUp.classList.add('mostrarArriba');
        
    }
}


function incrementarContadorAnimacion( elementoContador ){

    let valorActual = 0;
    const valorMax = elementoContador.dataset.valor;
    elementoContador.innerHTML = valorActual;

    const velocidad = 1000/valorMax;


    let intervalo = setInterval( () => {
        if( valorActual == valorMax ) {
            clearInterval(intervalo);
            return;
        }
        valorActual ++;
        elementoContador.innerHTML = valorActual;

    }, velocidad)

}

function activarContadorPorElScroll () {
    //guardamos en que pixel se encuentra el scroll
    let scrollTop = document.documentElement.scrollTop;

    //recorremos los contadores para ver si se encuentran en el mismo pixel
    //que el scrollTop
    for( let contador of contadores){
        // si ya es true ya fue activado el contador por lo tanto saltamos esta iteracion
        if( contador.dataset.activado === 'true' ){
            break;
        }

        let alturaContador = contador.offsetTop;
        if(alturaContador  < scrollTop){
            //lo cambiamos a true para que no se vuelva a activar el contador
            contador.dataset.activado = 'true';
            incrementarContadorAnimacion(contador);
        }
    }
}

window.addEventListener('scroll', () => {
    mostrarScroll();
    ocultarBotonFlecha();
    activarContadorPorElScroll();
})
