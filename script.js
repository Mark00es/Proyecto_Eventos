// Función para cambiar entre el modo claro y oscuro y cambiar el color de los elementos con la clase "cambiarcolor"
function toggleDarkMode() {
    const navbars = document.querySelectorAll('.navbar');
    const darkModeToggle = document.getElementById('darkModeToggle');
    const cambiarColorElements = document.querySelectorAll('.cambiarcolor');
    const listGroupItems = document.querySelectorAll('.list-group-item'); // Elementos li

    // Cambia la clase 'dark-mode' en todos los elementos con la clase 'navbar'
    navbars.forEach(cambiarcolor => {
        cambiarcolor.classList.toggle('dark-mode');
    });

    // Cambia el fondo y el icono de acuerdo al modo oscuro o claro
    if (navbars[0].classList.contains('dark-mode')) {
        // Modo oscuro
        darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        cambiarColorElements.forEach(element => {
            element.classList.add('dark-mode');
        });
        listGroupItems.forEach(item => {
            item.classList.add('dark-list-bg'); // Agrega una clase para el color de fondo en modo oscuro
        });
    } else {
        // Modo claro
        darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        cambiarColorElements.forEach(element => {
            element.classList.remove('dark-mode');
        });
        listGroupItems.forEach(item => {
            item.classList.remove('dark-list-bg'); // Remueve la clase para el color de fondo en modo claro
        });
    }

    // Cambia la clase 'dark-card-bg' en los elementos card
    const cardElements = document.querySelectorAll('.cambiarcolor');
    cardElements.forEach(card => {
        if (navbars[0].classList.contains('dark-mode')) {
            card.classList.add('dark-card-bg');
        } else {
            card.classList.remove('dark-card-bg');
        }
    });

    // Cambia la clase "complete" del botón de modo oscuro
    darkModeToggle.classList.toggle('complete');
}

// Evento de clic en el botón de modo oscuro
const darkModeToggle = document.getElementById('darkModeToggle');
if (darkModeToggle) {
    darkModeToggle.addEventListener('click', toggleDarkMode);
}


document.addEventListener("DOMContentLoaded", function() {
    // Obtener referencias a elementos HTML
    const dateFilter = document.getElementById("dateFilter");
    const typeFilter = document.getElementById("typeFilter");
    const eventSearch = document.getElementById("eventSearch");
    const resetDateFilterButton = document.getElementById("resetDateFilter");
    const resetTypeFilterButton = document.getElementById("resetTypeFilter");

    // Manejador de eventos para el botón "Mostrar Todo" en el filtro de fecha
    resetDateFilterButton.addEventListener("click", function() {
        dateFilter.value = "";
        filtrarEventos();
    });

    // Manejador de eventos para el botón "Mostrar Todo" en el filtro de tipo
    resetTypeFilterButton.addEventListener("click", function() {
        typeFilter.value = "";
        filtrarEventos();
    });

    // Función para filtrar eventos
    function filtrarEventos() {
        // Obtener valores de los filtros y la búsqueda
        const fechaFiltrada = dateFilter.value;
        const tipoFiltrado = typeFilter.value.toLowerCase();
        const busqueda = eventSearch.value.toLowerCase();

        // Filtrar eventos según los criterios
        const eventosFiltrados = eventos.filter(evento => {
            const fechaEvento = evento.fecha.toLowerCase();
            const tipoEvento = evento.tipo.toLowerCase();
            const nombreEvento = evento.nombre.toLowerCase();

            const cumpleFiltroFecha = !fechaFiltrada || fechaEvento === fechaFiltrada;
            const cumpleFiltroTipo = !tipoFiltrado || tipoEvento === tipoFiltrado;
            const cumpleBusqueda = !busqueda || nombreEvento.includes(busqueda);

            return cumpleFiltroFecha && cumpleFiltroTipo && cumpleBusqueda;
        });

        // Mostrar eventos filtrados
        mostrarEventos(eventosFiltrados);
    }

    // Función para mostrar eventos en la lista
    function mostrarEventos(eventosMostrados) {
        const eventList = document.querySelector('.event-list');
        eventList.innerHTML = '';
    
        if (eventosMostrados.length === 0) {
            eventList.innerHTML = '<p>No se encontraron eventos.</p>';
        } else {
            eventosMostrados.forEach(evento => {
                const eventoHTML = `
                    <div class="col-md-4 mb-4">
                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title">${evento.nombre}</h5>
                                <p class="card-text">${evento.descripcion}</p>
                                <p class="card-text"><strong>Fecha:</strong> ${evento.fecha}</p>
                                <p class="card-text"><strong>Tipo:</strong> ${evento.tipo}</p>
                            </div>
                        </div>
                    </div>
                `;
                eventList.innerHTML += eventoHTML;
            });
        }
    }

    // Datos de ejemplo (puedes reemplazarlos con tus propios datos)
    const eventos = [
        {
            nombre: "Concierto en Vivo",
            fecha: "2023-09-15",
            tipo: "Concierto",
            lugar: "Teatro Principal"
        },
        {
            nombre: "Conferencia de Tecnología",
            fecha: "2023-09-20",
            tipo: "Conferencia",
            lugar: "Centro de Convenciones"
        },
        {
            nombre: "Partido de Fútbol",
            fecha: "2023-09-25",
            tipo: "Deporte",
            lugar: "Estadio Municipal"
        },
        {
            nombre: "Charla de Arte",
            fecha: "2023-09-30",
            tipo: "Conferencia",
            lugar: "Museo de Arte"
        }
    ];

    // Mostrar todos los eventos al cargar la página
    mostrarEventos(eventos);

    // Escuchar cambios en los filtros y la búsqueda
    dateFilter.addEventListener("change", filtrarEventos);
    typeFilter.addEventListener("change", filtrarEventos);
    eventSearch.addEventListener("input", filtrarEventos);
});
