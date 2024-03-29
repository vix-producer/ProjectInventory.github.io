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
    // Asumiendo que ya tienes definida la lista de productos...
    const listaProductos = document.getElementById('lista-productos');
    listaProductos.innerHTML = ''; // Limpia la lista existente

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
    alert(`Editar producto ${id} no está implementado.`);
}


function determinarEstado(cantidad, cantidadMaxima) {
    // Determinar el estado en base a la cantidad actual y la cantidad máxima
    return cantidad < cantidadMaxima / 2 ? "Por rellenar" : "Disponible";
}

function agregarProducto() {
    // Obtener valores del formulario
    const codigo = document.getElementById('inputCodigo').value;
    const nombre = document.getElementById('inputNombre').value;
    const cantidad = parseInt(document.getElementById('inputCantidad').value, 10);
    const cantidadMaxima = parseInt(document.getElementById('inputCantidadMaxima').value, 10);

    // Generar un ID ficticio para el ejemplo; en una aplicación real, probablemente vendría de la base de datos
    const id = Math.floor(Math.random() * 10000) + 4;
    const estado = determinarEstado(cantidad, cantidadMaxima);

    // Agregar producto a la tabla
    const listaProductos = document.getElementById('lista-productos');
    const tr = document.createElement('tr');
    tr.id = `producto-${id}`;
    tr.innerHTML = `
        <td>${id}</td>
        <td>${codigo}</td>
        <td>${nombre}</td>
        <td>${cantidad}</td>
        <td>${cantidadMaxima}</td>
        <td>${estado}</td>
        <td>
            <button class="btn btn-danger" onclick="eliminarProducto(${id})">Eliminar</button>
            <button class="btn btn-warning" onclick="rellenarProducto(${id})">Rellenar</button>
        </td>
    `;
    listaProductos.appendChild(tr);
}

function rellenarProducto(id) {
    // Encuentra el producto por su ID.
    const producto = productos.find(p => p.id === id);
    if (producto) {
        producto.cantidad = producto.cantidad_maxima;
        cargarProductos(); // Vuelve a cargar la lista de productos para reflejar el cambio.
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
