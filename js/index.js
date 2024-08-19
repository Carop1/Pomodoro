let contador = 1;

document.getElementById('botonAgregar').addEventListener('click', (e) => {
    e.preventDefault();
    
    const contenedor = document.getElementById('contenedor');
    const actividad = document.querySelector('#formulario-pomodoro #actividad').value;

    if (actividad.trim() === '') {
        alert('Por favor, ingresa una actividad.');
        return;
    }

    // Crear el contenedor para cada actividad
    const contenedor2 = document.createElement('div');
    const nuevoBoton = document.createElement('button');
    const parrafoAct = document.createElement('p');

    parrafoAct.innerText = actividad;
    nuevoBoton.innerText = 'Start';

    nuevoBoton.setAttribute('class', 'botones2');
    nuevoBoton.setAttribute('id', 'nuevoBoton' + contador);

    contenedor2.setAttribute('class', 'contenedor2');
    contenedor2.setAttribute('id', 'contenedor' + contador);

    contador++;

    contenedor.appendChild(contenedor2);
    contenedor2.appendChild(nuevoBoton);
    contenedor2.appendChild(parrafoAct);

    // Agregar event listener al nuevo botón
    nuevoBoton.addEventListener('click', (e) => {
        const botonPresionado = e.target;
        const contenedorPadre = botonPresionado.parentElement;

        // Deshabilitar todos los botones
        const botones = document.querySelectorAll('.botones2');
        botones.forEach((btn) => {
            btn.disabled = true;
        });

        // Cambiar el texto del botón presionado
        botonPresionado.innerText = 'In progress..';

        // Inicializar el temporizador
        let tiempoSg = 59;
        let tiempoMin = 24;
        const regresiva = document.getElementById('regresiva');

        const intervaloSg = setInterval(() => {
            // Formato de minutos y segundos con 2 dígitos
            regresiva.innerHTML = `${tiempoMin}:${tiempoSg < 10 ? '0' + tiempoSg : tiempoSg}`;

            tiempoSg--;

            if (tiempoSg < 0) {
                tiempoSg = 59;
                tiempoMin--;
            }

            // Cuando el temporizador llega a 00:00
            if (tiempoMin < 0) {
                regresiva.innerHTML = '00:00';
                clearInterval(intervaloSg);

                // Eliminar el contenedor de la actividad que ha terminado
                contenedor.removeChild(contenedorPadre);

                // Reactivar todos los botones
                botones.forEach((btn) => {
                    btn.disabled = false;
                });
            }
        }, 1000); // Intervalo de 1 segundo
    });
});