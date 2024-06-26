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
        const nuevaCantidad = prompt("Ingrese la cantidad del producto", producto.cantidad);
        if (nuevaCantidad !== null) {
            producto.cantidad = nuevaCantidad;
            cargarProductos(); // Recargar la lista de productos después de la edición
        }
    } else {
        alert("Producto no encontrado");
    }
}


function determinarEstado(cantidad, cantidadMaxima) {
    // Determinar el estado en base a la cantidad actual y la cantidad máxima
    return cantidad < cantidadMaxima / 2 ? "Por rellenar" : "Disponible";
}
let productos = [];

// Resto del código...

function agregarProducto() {
    // Obtener valores del formulario
    const codigo = document.getElementById('inputCodigo').value;
    const nombre = document.getElementById('inputNombre').value;
    const cantidad = parseInt(document.getElementById('inputCantidad').value, 10);
    const cantidadMaxima = parseInt(document.getElementById('inputCantidadMaxima').value, 10);

    // Generar un ID ficticio para el ejemplo; en una aplicación real, probablemente vendría de la base de datos
    const id = Math.floor(Math.random() * 10000) + 4;
    const estado = determinarEstado(cantidad, cantidadMaxima);

    // Agregar el nuevo producto al arreglo de productos
    const nuevoProducto = {
        id: id,
        codigo: codigo,
        nombre: nombre,
        cantidad: cantidad,
        cantidad_maxima: cantidadMaxima,
        estado: estado
    };
    productos.push(nuevoProducto);

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
    const productoIndex = productos.findIndex(p => p.id === id);
    if (productoIndex !== -1) {
        const producto = productos[productoIndex];
        if (producto.cantidad < producto.cantidad_maxima / 2) {
            producto.cantidad = producto.cantidad_maxima;
            
            // Actualizar el valor de cantidad en la tabla
            const cantidadElement = document.getElementById(`producto-${id}`).querySelectorAll('td')[3];
            cantidadElement.textContent = producto.cantidad;
        } else {
            alert("La cantidad actual no está por debajo del 50% de la cantidad máxima.");
        }
    } else {
        alert("Producto no encontrado");
    }
}

function eliminarProducto(id) {
    // Busca el índice del producto en el arreglo productos
    const productoIndex = productos.findIndex(p => p.id === id);
    if (productoIndex !== -1) {
        // Elimina el producto del arreglo productos
        productos.splice(productoIndex, 1);
        
        // Elimina el elemento de la tabla HTML
        const productoAEliminar = document.getElementById(`producto-${id}`);
        if (productoAEliminar) {
            productoAEliminar.remove();
        }
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
