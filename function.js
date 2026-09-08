let loadMoreBtn = document.querySelector('#load-more');

if (loadMoreBtn) {
    let boxes = document.querySelectorAll('.box-container .box');
    let currentItem = 4;

    loadMoreBtn.addEventListener('click', () => {
        for (let i = currentItem; i < currentItem + 4 && i < boxes.length; i++) {
            boxes[i].style.display = 'inline-block';
        }
        currentItem += 4;
        if (currentItem >= boxes.length) {
            loadMoreBtn.style.display = 'none';
        }
    });
}

let menuBtn = document.getElementById('menu-btn');
let navMenu = document.getElementById('nav-menu');

if (menuBtn && navMenu) {
    menuBtn.addEventListener('click', () => {
        navMenu.classList.toggle('activo');
    });
}

let imgCarrito = document.getElementById('img-carrito');
let cajaCarrito = document.getElementById('carrito');

if (imgCarrito && cajaCarrito) {
    imgCarrito.addEventListener('click', () => {
        if (cajaCarrito.style.display === 'block') {
            cajaCarrito.style.display = 'none';
        } else {
            cajaCarrito.style.display = 'block';
        }
    });
}

let carritoItems = JSON.parse(localStorage.getItem('carritoItems')) || [];

function guardarCarrito() {
    localStorage.setItem('carritoItems', JSON.stringify(carritoItems));
}

function pintarFilas(tbody) {
    tbody.innerHTML = '';
    carritoItems.forEach((item, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><img src="${item.imagen}" width="60"></td>
            <td>${item.titulo}</td>
            <td>${item.precio}</td>
            <td><a href="#" class="borrar" data-index="${index}">X</a></td>
        `;
        tbody.appendChild(row);
    });
}

function renderizarCarrito() {
    const listaHeader = document.querySelector('#lista-carrito tbody');
    if (listaHeader) pintarFilas(listaHeader);

    const listaPagina = document.querySelector('#lista-carrito-pagina tbody');
    if (listaPagina) pintarFilas(listaPagina);

    const totalEl = document.getElementById('total-carrito');
    if (totalEl) {
        let total = 0;
        carritoItems.forEach((item) => {
            total += Number(item.precio.replace(/[^0-9]/g, ''));
        });
        totalEl.textContent = 'Total: $' + total;
    }
}

function leerDatosElemento(elemento) {
    const infoElemento = {
        imagen: elemento.querySelector('img').src,
        titulo: elemento.querySelector('h3').textContent,
        precio: elemento.querySelector('.precio').textContent
    };
    carritoItems.push(infoElemento);
    guardarCarrito();
    renderizarCarrito();
}

document.body.addEventListener('click', (e) => {
    if (e.target.classList.contains('agregar-carrito')) {
        e.preventDefault();
        const elemento = e.target.parentElement.parentElement;
        leerDatosElemento(elemento);
    }

    if (e.target.classList.contains('borrar')) {
        e.preventDefault();
        const index = Number(e.target.getAttribute('data-index'));
        carritoItems.splice(index, 1);
        guardarCarrito();
        renderizarCarrito();
    }

    if (e.target.classList.contains('btn-vaciar-carrito')) {
        e.preventDefault();
        carritoItems = [];
        guardarCarrito();
        renderizarCarrito();
    }
});

renderizarCarrito();

const formContacto = document.getElementById('form-contacto');

if (formContacto) {
    formContacto.addEventListener('submit', (e) => {
        e.preventDefault();
        const nombre = document.getElementById('contacto-nombre').value.trim();
        const correo = document.getElementById('contacto-correo').value.trim();
        const mensaje = document.getElementById('contacto-mensaje').value.trim();
        const error = document.getElementById('error-contacto');

        if (nombre === '' || correo === '' || mensaje === '') {
            error.textContent = 'Todos los campos son obligatorios.';
            return;
        }
        if (!correo.includes('@')) {
            error.textContent = 'Ingresa un correo valido.';
            return;
        }

        error.textContent = '';
        alert('Gracias! Tu mensaje fue enviado.');
        formContacto.reset();
    });
}

const formRegistro = document.getElementById('form-registro');

if (formRegistro) {
    formRegistro.addEventListener('submit', (e) => {
        e.preventDefault();
        const nombre = document.getElementById('registro-nombre').value.trim();
        const correo = document.getElementById('registro-correo').value.trim();
        const nacimiento = document.getElementById('registro-nacimiento').value;
        const codigo = document.getElementById('registro-codigo').value.trim().toUpperCase();
        const clave = document.getElementById('registro-clave').value;
        const error = document.getElementById('error-registro');
        const beneficio = document.getElementById('beneficio-registro');

        if (nombre === '' || correo === '' || nacimiento === '' || clave === '') {
            error.textContent = 'Completa todos los campos obligatorios.';
            beneficio.textContent = '';
            return;
        }
        if (!correo.includes('@')) {
            error.textContent = 'Ingresa un correo valido.';
            beneficio.textContent = '';
            return;
        }
        if (clave.length < 6) {
            error.textContent = 'La contraseña debe tener al menos 6 caracteres.';
            beneficio.textContent = '';
            return;
        }

        error.textContent = '';

        const hoy = new Date();
        const fechaNacimiento = new Date(nacimiento);
        let edad = hoy.getFullYear() - fechaNacimiento.getFullYear();

        let mensajeBeneficio = '';
        if (edad >= 50) {
            mensajeBeneficio = 'Tienes 50% de descuento de por vida.';
        } else if (codigo === 'FELICES50') {
            mensajeBeneficio = 'Codigo valido: 10% de descuento de por vida.';
        } else if (correo.endsWith('@duocuc.cl')) {
            mensajeBeneficio = 'Como estudiante Duoc, tendras una torta gratis en tu cumpleaños.';
        }
        beneficio.textContent = mensajeBeneficio;

        alert('Cuenta creada!');
        formRegistro.reset();
    });
}
