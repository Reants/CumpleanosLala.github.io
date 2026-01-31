// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM
    const btnAbrir = document.getElementById('btnAbrir');
    const pantallaInicial = document.getElementById('pantallaInicial');
    const pantallaCumpleanos = document.getElementById('pantallaCumpleanos');
    const audioFondo = document.getElementById('audioFondo');
    const carruselPista = document.getElementById('carruselPista');
    
    // Función para crear el carrusel cíclico infinito
    function inicializarCarruselInfinito() {
        // Clonar todos los items del carrusel para crear el efecto infinito
        const items = Array.from(carruselPista.children);
        
        // Duplicar los items para crear el efecto de loop infinito
        items.forEach(item => {
            const clone = item.cloneNode(true);
            carruselPista.appendChild(clone);
        });
        
        // Calcular la duración de la animación basada en el número de items
        const totalItems = items.length;
        const duracionPorItem = 15; // segundos por cada imagen
        const duracionTotal = totalItems * duracionPorItem;
        
        // Ajustar la duración de la animación
        carruselPista.style.animationDuration = `${duracionTotal}s`;
    }
    
    // Función para manejar el click del botón
    btnAbrir.addEventListener('click', function() {
        // Animación de salida del botón
        btnAbrir.style.transform = 'scale(0)';
        btnAbrir.style.opacity = '0';
        
        setTimeout(() => {
            // Ocultar pantalla inicial
            pantallaInicial.classList.remove('activa');
            
            // Mostrar pantalla de cumpleaños
            pantallaCumpleanos.classList.add('activa');
            
            // Reproducir música de fondo
            audioFondo.play().catch(error => {
                console.log('No se pudo reproducir el audio automáticamente:', error);
                console.log('Haz clic en la pantalla para activar el audio');
                
                // Intentar reproducir el audio con el próximo click del usuario
                document.addEventListener('click', function reproducirAudio() {
                    audioFondo.play().catch(e => console.log('Error al reproducir:', e));
                    // Remover el listener después del primer click
                    document.removeEventListener('click', reproducirAudio);
                }, { once: true });
            });
            
            // Inicializar el carrusel infinito
            inicializarCarruselInfinito();
            
            // Crear efecto de confeti
            crearConfeti();
        }, 300);
    });
    
    // Función para crear efecto de confeti
    function crearConfeti() {
        const colores = ['#ffd43b', '#ff6b6b', '#74b9ff', '#a29bfe', '#55efc4', '#fd79a8', '#ffeaa7'];
        const cantidadConfeti = 100;
        
        for (let i = 0; i < cantidadConfeti; i++) {
            setTimeout(() => {
                const confeti = document.createElement('div');
                
                // Estilos del confeti
                confeti.style.position = 'fixed';
                confeti.style.width = Math.random() * 10 + 5 + 'px';
                confeti.style.height = Math.random() * 10 + 5 + 'px';
                confeti.style.backgroundColor = colores[Math.floor(Math.random() * colores.length)];
                confeti.style.left = Math.random() * 100 + 'vw';
                confeti.style.top = '-20px';
                confeti.style.opacity = Math.random() * 0.5 + 0.5;
                confeti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
                confeti.style.pointerEvents = 'none';
                confeti.style.zIndex = '1000';
                confeti.style.transform = `rotate(${Math.random() * 360}deg)`;
                
                // Animación de caída
                const duracion = Math.random() * 3 + 2;
                const rotacion = Math.random() * 720 - 360;
                const desplazamientoX = Math.random() * 200 - 100;
                
                confeti.style.transition = `all ${duracion}s linear`;
                
                pantallaCumpleanos.appendChild(confeti);
                
                // Animar el confeti
                setTimeout(() => {
                    confeti.style.top = '110vh';
                    confeti.style.transform = `rotate(${rotacion}deg) translateX(${desplazamientoX}px)`;
                    confeti.style.opacity = '0';
                }, 10);
                
                // Eliminar el confeti después de que termine la animación
                setTimeout(() => {
                    confeti.remove();
                }, (duracion + 0.5) * 1000);
            }, i * 30);
        }
        
        // Crear confeti continuamente cada 10 segundos
        setInterval(() => {
            if (pantallaCumpleanos.classList.contains('activa')) {
                for (let i = 0; i < 20; i++) {
                    setTimeout(() => {
                        const confeti = document.createElement('div');
                        confeti.style.position = 'fixed';
                        confeti.style.width = Math.random() * 8 + 4 + 'px';
                        confeti.style.height = Math.random() * 8 + 4 + 'px';
                        confeti.style.backgroundColor = colores[Math.floor(Math.random() * colores.length)];
                        confeti.style.left = Math.random() * 100 + 'vw';
                        confeti.style.top = '-20px';
                        confeti.style.opacity = Math.random() * 0.5 + 0.5;
                        confeti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
                        confeti.style.pointerEvents = 'none';
                        confeti.style.zIndex = '1000';
                        
                        const duracion = Math.random() * 3 + 2;
                        const rotacion = Math.random() * 720 - 360;
                        
                        confeti.style.transition = `all ${duracion}s linear`;
                        pantallaCumpleanos.appendChild(confeti);
                        
                        setTimeout(() => {
                            confeti.style.top = '110vh';
                            confeti.style.transform = `rotate(${rotacion}deg)`;
                            confeti.style.opacity = '0';
                        }, 10);
                        
                        setTimeout(() => confeti.remove(), (duracion + 0.5) * 1000);
                    }, i * 50);
                }
            }
        }, 10000);
    }
    
    // Ajustar el carrusel cuando cambia el tamaño de la ventana
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            if (pantallaCumpleanos.classList.contains('activa')) {
                // Reinicializar el carrusel si es necesario
                const items = carruselPista.querySelectorAll('.carrusel-item');
                const duracionPorItem = 4;
                const duracionTotal = (items.length / 2) * duracionPorItem;
                carruselPista.style.animationDuration = `${duracionTotal}s`;
            }
        }, 250);
    });
    
    // Control del audio cuando la pestaña cambia de visibilidad
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            audioFondo.pause();
        } else {
            if (pantallaCumpleanos.classList.contains('activa')) {
                audioFondo.play().catch(e => console.log('Error al reanudar:', e));
            }
        }
    });
});