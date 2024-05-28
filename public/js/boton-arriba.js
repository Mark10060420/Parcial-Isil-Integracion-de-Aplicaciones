function irArriba(pxPantalla){
    window.addEventListener('scroll', () => {
        var scroll = document.documentElement.scrollTop;
        var botonArriba = document.getElementById('scroll-arriba');
        // var areacabecera = document.getElementById('cabecera');

        // Si el scroll> 250px muestra el botón
        if(scroll > pxPantalla) {
            botonArriba.style.opacity=0.8;
            botonArriba.style.transform='scale(1)';
            // areacabecera.style.backgroundColor='yellow'
        }
        // Caso contrario el botón se oculta
        else {
            botonArriba.style.opacity=0;
            botonArriba.style.transform='scale(0)';
            // areacabecera.style.backgroundColor='white';
        }
    })
}
irArriba(250);
