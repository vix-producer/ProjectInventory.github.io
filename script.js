document.addEventListener('DOMContentLoaded', function () {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
        window.location.href = 'login.html';
    } else {
        cargarProductos();
    }

    const loginBtn = document.getElementById('loginBtn');
    if (loginBtn) {
        loginBtn.addEventListener('click', login);
    }
});

function cargarProductos() {
    const listaProductos = document.getElementById('lista-productos');
    listaProductos.innerHTML = '';

    productos.forEach(producto => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${producto.id}</td>
            <td>${producto.codigo}</td>
            <td>${producto.nombre}</td>
            <td>${producto.cantidad}</td>
            <td>${producto.cantidad_maxima}</td>
            <td>${producto.estado}</td>
            <td>
                <button class="btn btn-danger" onclick="eliminarProducto(${producto.id})">Eliminar</button>
                <button class="btn btn-secondary" onclick="rellenarProducto(${producto.id})">Rellenar</button>
                <button class="btn btn-info" onclick="editarProducto(${producto.id})">Editar</button>
            </td>
        `;
        listaProductos.appendChild(tr);
    });
}

function editarProducto(id) {
    const producto = productos.find(p => p.id === id);
    if (producto) {
        const nuevoNombre = prompt("Ingrese el nuevo nombre del producto", producto.nombre);
        if (nuevoNombre !== null) {
            producto.nombre = nuevoNombre;
            cargarProductos(); // Recargar la lista de productos después de la edición
        }
    } else {
        alert("Producto no encontrado");
    }
}

function rellenarProducto(id) {
    const producto = productos.find(p => p.id === id);
    if (producto) {
        if (producto.cantidad < producto.cantidad_maxima / 2) {
            producto.cantidad = producto.cantidad_maxima;
            cargarProductos();
        } else {
            alert("La cantidad actual no está por debajo del 50% de la cantidad máxima.");
        }
    } else {
        alert("Producto no encontrado");
    }
}

function eliminarProducto(id) {
    // Usa el ID único asignado para encontrar la fila del producto y eliminarla.
    const productoAEliminar = document.getElementById(`producto-${id}`);
    if (productoAEliminar) {
        productoAEliminar.remove();
    } else {
        alert("Producto no encontrado");
    }
}

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('loginBtn').addEventListener('click', login);
});

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
