document.addEventListener('DOMContentLoaded', function () {
    // Revisa si el usuario está autenticado al cargar la página.
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
        window.location.href = 'login.html';
    } else {
        cargarProductos(); // Solo carga los productos si el usuario está autenticado.
    }

    // Evento para el botón de inicio de sesión.
    const loginBtn = document.getElementById('loginBtn');
    if (loginBtn) {
        loginBtn.addEventListener('click', login);
    }
});

function cargarProductos() {
    const productos = [
        { id: 1, codigo: "1001", nombre: "Producto 1", cantidad: 10, cantidad_maxima: 20, estado: "Disponible" },
        { id: 2, codigo: "1002", nombre: "Producto 2", cantidad: 5, cantidad_maxima: 15, estado: "Por rellenar" },
        { id: 3, codigo: "1003", nombre: "Producto 3", cantidad: 20, cantidad_maxima: 20, estado: "Disponible" }
    ];

    const listaProductos = document.getElementById('lista-productos');
    listaProductos.innerHTML = ''; // Limpiar la lista antes de cargar productos para evitar duplicados.

    productos.forEach(producto => {
        const tr = document.createElement('tr');
        tr.id = `producto-${producto.id}`; // Asigna un ID único a la fila del producto.
        tr.innerHTML = `
            <td>${producto.id}</td>
            <td>${producto.codigo}</td>
            <td>${producto.nombre}</td>
            <td>${producto.cantidad}</td>
            <td>${producto.cantidad_maxima}</td>
            <td>${producto.estado}</td>
            <td><button class="btn btn-danger" onclick="eliminarProducto('producto-${producto.id}')">Eliminar</button></td>
        `;
        listaProductos.appendChild(tr);
    });
}

function eliminarProducto(id) {
    // Usa el ID único asignado para encontrar la fila del producto y eliminarla.
    const productoAEliminar = document.getElementById(id);
    if (productoAEliminar) {
        productoAEliminar.remove();
    } else {
        alert("Producto no encontrado");
    }
}


function login() {
    const usuario = document.getElementById('usuario').value;
    const contraseña = document.getElementById('contraseña').value;

    if (usuario === 'ale' && contraseña === '142536') {
        localStorage.setItem('isLoggedIn', 'true');
        window.location.href = 'index.html';
    } else {
        alert('Usuario o contraseña incorrectos');
    }
}
