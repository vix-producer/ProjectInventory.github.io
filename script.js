document.addEventListener('DOMContentLoaded', function () {
    // Resto del código inicial...

    // Corregir y habilitar la funcionalidad de agregar productos
    document.getElementById('agregarProductoBtn').addEventListener('click', agregarProducto);
});

function cargarProductos() {
    const productos = [
        { id: 1, codigo: "1001", nombre: "Producto 1", cantidad: 10, cantidad_maxima: 20, estado: determinarEstado(10, 20) },
        { id: 2, codigo: "1002", nombre: "Producto 2", cantidad: 5, cantidad_maxima: 15, estado: determinarEstado(5, 15) },
        { id: 3, codigo: "1003", nombre: "Producto 3", cantidad: 20, cantidad_maxima: 20, estado: determinarEstado(20, 20) }
    ];

    const listaProductos = document.getElementById('lista-productos');
    listaProductos.innerHTML = ''; // Limpiar lista antes de cargar productos

    productos.forEach(producto => {
        const tr = document.createElement('tr');
        tr.id = `producto-${producto.id}`;
        tr.innerHTML = `
            <td>${producto.id}</td>
            <td>${producto.codigo}</td>
            <td>${producto.nombre}</td>
            <td>${producto.cantidad}</td>
            <td>${producto.cantidad_maxima}</td>
            <td>${producto.estado}</td>
            <td>
                <button class="btn btn-danger" onclick="eliminarProducto(${producto.id})">Eliminar</button>
                <button class="btn btn-warning" onclick="rellenarProducto(${producto.id})">Rellenar</button>
            </td>
        `;
        listaProductos.appendChild(tr);
    });
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
    // Esta función debería actualizar la cantidad del producto al máximo y ajustar su estado
    // La lógica específica dependerá de cómo se manejen los productos (ej., actualización en el servidor o en un array en memoria)
    alert('Función de rellenar no implementada');
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
