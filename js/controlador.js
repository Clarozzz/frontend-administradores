
var repartidores = [
    {
        nombreRepartidor: 'Juan',
        apellidoRepartidor: 'Garcia',
        usuarioRepartidor: 'JuanG0',
        contrasenaRepartidor: '1234'
    },
    {
        nombreRepartidor: 'Maria',
        apellidoRepartidor: 'Antunez',
        usuarioRepartidor: 'MaryAn',
        contrasenaRepartidor: 'contrasena'
    },
    {
        nombreRepartidor: 'Peter',
        apellidoRepartidor: 'Parker',
        usuarioRepartidor: 'spiderMan69',
        contrasenaRepartidor: 'esobrad'
    }
]

var categorias;
var productos;
var productosEmpresa = [];
var empresaSeleccionada;
var productoSeleccionado;
var categoriaSeleccionada;

async function obtenerEmpresas() {
    const result = await fetch('http://localhost:5005/empresas',
        {
            method: 'get',
            headers: {
                'Content-Type': 'application/json'
            }
        }
    );
    empresas = await result.json();
}
obtenerEmpresas();

async function obtenerCategorias() {
    const result = await fetch('http://localhost:5005/categorias', {
        method: 'get',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    categorias = await result.json();
}
obtenerCategorias();

async function obtenerProductos() {
    const result = await fetch('http://localhost:5005/productos', {
        method: 'get',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    productos = await result.json();
}
obtenerProductos();

function validarCampoVacio() {

    const usuario = document.getElementById("usuarioAdmin");
    const contrasena = document.getElementById("contrasenaAdmin");
    const boton = document.querySelector("#btnSubmit");

    if (usuario.value == '' || contrasena.value == '') {
        usuario.classList.remove('input-success');
        usuario.classList.add('input-error');
        contrasena.classList.remove('input-success');
        contrasena.classList.add('input-error');
        boton.disabled = true;
    }
    else {
        usuario.classList.remove('input-error');
        usuario.classList.add('input-success');
        contrasena.classList.remove('input-error');
        contrasena.classList.add('input-success');
        boton.disabled = false;
    }
}

async function abrirAdministradores() {
    let usuario = document.getElementById('usuarioAdmin').value;
    let contrasena = document.getElementById('contrasenaAdmin').value;

    const result = await fetch(`http://localhost:5005/administradores/${usuario}`, {
        method: 'get',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    let adminBack = await result.json();

    if (usuario == adminBack.usuarioAdministrador && contrasena == adminBack.contrasena) {
        entrar();
    } else {
        document.getElementById('aviso').innerHTML = 'Usuario o contrasena incorrectos'
    }

}

function entrar() {
    document.getElementById('paginaInicio').style.display = 'none';
    document.getElementById('paginaPrincipal').style.display = 'block';
}

function verEmpresas() {
    document.getElementById('paginaPrincipal').style.display = 'none';
    document.getElementById('paginaEmpresas').style.display = 'block';
    document.getElementById('paginaAgregarEmpresa').style.display = 'none';
    document.getElementById('editarEmpresa').style.display = 'none';
    document.getElementById('administrarEmpresa').style.display = 'none';
    let divEmpresas = document.getElementById('empresas')
    divEmpresas.innerHTML = '';

    empresas.forEach((empresa) => {
        divEmpresas.innerHTML +=
            `
        <div class="col-md-3">
            <div role="button" class="card mb-4 sombra" style="border: 2px solid ${empresa.color}" onclick="administrarEmpresa('${empresa._id}')">
                <img src="${empresa.logo}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${empresa.nombreEmpresa}</h5>
                    <p class="card-text">${empresa.descripcion}</p>
                </div>
            </div>
        </div> 
        `
    })
}

function regresarAAdministrar() {
    document.getElementById('paginaPrincipal').style.display = 'block';
    document.getElementById('paginaEmpresas').style.display = 'none';
    document.getElementById('empresasProductos').style.display = 'none';
    document.getElementById('paginaRepartidores').style.display = 'none';
    document.getElementById('ordenesDisponibles').style.display = 'none';
}

async function administrarEmpresa(idEmpresa) {
    document.getElementById('administrarEmpresa').style.display = 'block';
    document.getElementById('paginaEmpresas').style.display = 'none';

    const result = await fetch(`http://localhost:5005/empresas/${idEmpresa}`, {
        method: 'get',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    empresaSeleccionada = await result.json();

    document.getElementById('cartaEmpresa').innerHTML =
        `
    <div class="card" style="border: 2px solid ${empresaSeleccionada.color}">
        <img src="${empresaSeleccionada.logo}" class="card-img-top" alt="${empresaSeleccionada.nombreEmpresa}">
        <div class="card-body">
            <h5 class="card-title">${empresaSeleccionada.nombreEmpresa}</h5>
            <p class="card-text">${empresaSeleccionada.descripcion}.</p>
        </div>
    </div>
    `;

}

function regresarAEmpresas() {
    document.getElementById('administrarEmpresa').style.display = 'none';
    document.getElementById('paginaAgregarEmpresa').style.display = 'none';
    document.getElementById('paginaEmpresas').style.display = 'block';
}

function regresarAOpcionesEmpresa() {
    document.getElementById('administrarEmpresa').style.display = 'block';
    document.getElementById('editarEmpresa').style.display = 'none';
}

function editarEmpresa() {
    document.getElementById('administrarEmpresa').style.display = 'none';
    document.getElementById('editarEmpresa').style.display = 'block';
}

async function actualizarEmpresa() {
    let nvoNombre = document.getElementById('nombreEmpresa').value;
    let nvaDescripcion = document.getElementById('descripcionEmpresa').value;
    let nvoColor = document.getElementById('colorEmpresa').value;
    let nvoLogo = document.getElementById('logoEmpresa').value;

    const result = await fetch(`http://localhost:5005/empresas/${empresaSeleccionada._id}`, {
        method: 'put',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            idEmpresa: empresaSeleccionada.idEmpresa,
            nombreEmpresa: nvoNombre,
            descripcion: nvaDescripcion,
            color: nvoColor,
            logo: nvoLogo,
            productos: empresaSeleccionada.productos
        })
    })

    obtenerEmpresas().then(() => {
        verEmpresas();
    })
}

function agregarEmpresa() {
    document.getElementById('paginaAgregarEmpresa').style.display = 'block';
    document.getElementById('paginaEmpresas').style.display = 'none';
    document.getElementById('categoriaEmpresaAgregar').value = null;
}

async function nuevaEmpresa() {
    let nombreEmpresa = document.getElementById('nombreEmpresaAgregar').value;
    let descripcionEmpresa = document.getElementById('descripcionEmpresaAgregar').value;
    let colorEmpresa = document.getElementById('colorEmpresaAgregar').value;
    let logoEmpresa = document.getElementById('logoEmpresaAgregar').value;
    let idNvaempresa = empresas.length + 1;
    let categoria = document.getElementById('categoriaEmpresaAgregar').value;

    const result = await fetch('http://localhost:5005/empresas', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            idEmpresa: idNvaempresa,
            nombreEmpresa: nombreEmpresa,
            descripcion: descripcionEmpresa,
            color: colorEmpresa,
            logo: logoEmpresa,
            productos: []
        })
    })

    const resultado = await fetch(`http://localhost:5005/categorias/${categoria}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    categoriaSeleccionada = await resultado.json();
    categoriaSeleccionada.empresas.push(idNvaempresa);

    actualizarCategoria();
    obtenerEmpresas().then(() => {
        verEmpresas();
    });
}

async function actualizarCategoria() {
    const result = await fetch(`http://localhost:5005/categorias/${categoriaSeleccionada._id}`, {
        method: 'put',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            idCategoria: categoriaSeleccionada.idCategoria,
            nombreCategoria: categoriaSeleccionada.nombreCategoria,
            icono: categoriaSeleccionada.icono,
            empresas: categoriaSeleccionada.empresas
        })
    })
}

async function eliminarEmpresa() {
    for (let i = 0; i < categorias.length; i++) {
        let empresas = categorias[i].empresas;
        const index = empresas.indexOf(empresaSeleccionada.idEmpresa);
        if (index > -1) {
            empresas.splice(index, 1);
            categoriaSeleccionada = categorias[i];
        }
    }

    const result = await fetch(`http://localhost:5005/empresas/${empresaSeleccionada._id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    actualizarCategoria();
    obtenerEmpresas().then(() => {
        verEmpresas();
    });
}

function verEmpresasProductos() {
    document.getElementById('paginaPrincipal').style.display = 'none';
    document.getElementById('empresasProductos').style.display = 'block';
    let divEmpresas = document.getElementById('empresasSeleccion')
    divEmpresas.innerHTML = '';

    empresas.forEach((empresa) => {
        divEmpresas.innerHTML +=
            `
        <div class="col-md-3">
            <div role="button" class="card mb-4 sombra" style="border: 2px solid ${empresa.color}" onclick="verProductos('${empresa._id}')">
                <img src="${empresa.logo}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${empresa.nombreEmpresa}</h5>
                    <p class="card-text">${empresa.descripcion}</p>
                </div>
            </div>
        </div> 
        `
    })
}

async function verProductos(idEmpresa) {
    document.getElementById('productosEmpresa').style.display = 'block';
    document.getElementById('empresasProductos').style.display = 'none';
    document.getElementById('paginaAgregarProducto').style.display = 'none';
    document.getElementById('editarProducto').style.display = 'none';
    document.getElementById('administrarProducto').style.display = 'none';

    const result = await fetch(`http://localhost:5005/empresas/${idEmpresa}`, {
        method: 'get',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    empresaSeleccionada = await result.json();
    obtenerProductosEmpresa().then(() => {
        cargarProductos()
    });
}

function cargarProductos() {
    let divProductos = document.getElementById('productos')
    divProductos.innerHTML = '';

    productosEmpresa.forEach((producto) => {
        divProductos.innerHTML +=
            `
        <div class="col-md-3">
            <div role="button" class="card mb-4 sombra" style="border: 2px solid ${producto.color}" onclick="administrarProducto('${producto._id}')">
                <img src="${producto.image}" class="card-img-top" alt="${producto.nombreProducto}">
                <div class="card-body">
                    <h5 class="card-title">${producto.nombreProducto}</h5>
                    <p class="card-text">${producto.descripcionProducto}</p>
                </div>
            </div>
        </div> 
        `
    })
}

async function obtenerProductosEmpresa() {
    productosEmpresa = []
    for (let i = 0; i < empresaSeleccionada.productos.length; i++) {
        const result = await fetch(`http://localhost:5005/productos/codigo-producto/${empresaSeleccionada.productos[i]}`, {
            method: 'get',
            headers: { 'Content-Type': 'application/json' }
        });
        const resultado = await result.json();
        productosEmpresa.push(resultado);
    }
}

function regresarAEmpresasProductos() {
    document.getElementById('empresasProductos').style.display = 'block';
    document.getElementById('productosEmpresa').style.display = 'none';
}

async function administrarProducto(idProducto) {

    document.getElementById('administrarProducto').style.display = 'block';
    document.getElementById('productosEmpresa').style.display = 'none';

    const result = await fetch(`http://localhost:5005/productos/${idProducto}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    productoSeleccionado = await result.json();

    document.getElementById('cartaProducto').innerHTML =
        `
    <div class="card" style="border: 2px solid ${productoSeleccionado.color}">
        <img src="${productoSeleccionado.image}" class="card-img-top" alt="${productoSeleccionado.nombreProducto}" style="width: 500px">
        <div class="card-body">
            <h5 class="card-title">${productoSeleccionado.nombreProducto}</h5>
            <p class="card-text">${productoSeleccionado.descripcionProducto}.</p>
        </div>
    </div>
    `;

}

function regresarAProductos() {
    document.getElementById('productosEmpresa').style.display = 'block';
    document.getElementById('administrarProducto').style.display = 'none';
    document.getElementById('paginaAgregarProducto').style.display = 'none';
}

function agregarProducto() {
    document.getElementById('productosEmpresa').style.display = 'none';
    document.getElementById('paginaAgregarProducto').style.display = 'block';
}

async function nuevoProducto() {
    let nombreProducto = document.getElementById('nombreProductoAgregar').value;
    let descripcionProducto = document.getElementById('descripcionProductoAgregar').value;
    let colorProducto = document.getElementById('colorProductoAgregar').value;
    let precioProducto = document.getElementById('precioProductoAgregar').value;
    let imagen = document.getElementById('logoProductoAgregar').value;
    let idNvoProducto = productos.length + 1;

    const result = await fetch('http://localhost:5005/productos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            idProducto: idNvoProducto,
            nombreProducto: nombreProducto,
            descripcionProducto: descripcionProducto,
            color: colorProducto,
            precio: precioProducto,
            image: imagen
        })
    });

    empresaSeleccionada.productos.push(idNvoProducto)

    actualizarEmpresa();
    obtenerEmpresas();
    obtenerProductos().then(() => {
        verProductos(empresaSeleccionada._id);
    });

}

async function actualizarEmpresa() {
    const result = await fetch(`http://localhost:5005/empresas/${empresaSeleccionada._id}`, {
        method: 'put',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            idEmpresa: empresaSeleccionada.idEmpresa,
            nombreEmpresa: empresaSeleccionada.nombreEmpresa,
            descripcion: empresaSeleccionada.descripcion,
            color: empresaSeleccionada.color,
            logo: empresaSeleccionada.logo,
            productos: empresaSeleccionada.productos
        })
    });
}

function editarProducto() {
    document.getElementById('administrarProducto').style.display = 'none';
    document.getElementById('editarProducto').style.display = 'block';
}

async function actualizarProducto() {
    let nvoNombre = document.getElementById('nombreProductoEditar').value;
    let nvaDescripcion = document.getElementById('descripcionProductoEditar').value;
    let nvoColor = document.getElementById('colorProductoEditar').value;
    let nvoPrecio = document.getElementById('precioProductoEditar').value;
    let nvoLogo = document.getElementById('logoProductoEditar').value;

    const result = await fetch(`http://localhost:5005/productos/${productoSeleccionado._id}`, {
        method: 'put',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            idProducto: productoSeleccionado.idProducto,
            nombreProducto: nvoNombre,
            descripcionProducto: nvaDescripcion,
            color: nvoColor,
            precio: nvoPrecio,
            image: nvoLogo
        })
    });

    obtenerProductos().then(() => {
        verProductos(empresaSeleccionada._id);
    })
}

async function eliminarProducto() {
    for (let i = 0; i < empresas.length; i++) {
        let productos = empresas[i].productos;
        const index = productos.indexOf(productoSeleccionado.idProducto);
        if (index > -1) {
            productos.splice(index, 1);
            empresaSeleccionada = empresas[i];
        }
    }

    const result = await fetch(`http://localhost:5005/productos/${productoSeleccionado._id}`, {
        method: 'delete',
        headers: { 'Content-Type': 'application/json' }
    });

    actualizarEmpresa();
    obtenerProductos().then(() => {
        verProductos(empresaSeleccionada._id);
    })
}

function regresarAOpcionesProducto() {
    document.getElementById('administrarProducto').style.display = 'block';
    document.getElementById('editarProducto').style.display = 'none';
}

function verRepartidores() {
    document.getElementById('paginaPrincipal').style.display = 'none';
    document.getElementById('paginaRepartidores').style.display = 'block';

    document.getElementById('repartidores').innerHTML = '';

    repartidores.forEach(repartidor => {
        document.getElementById('repartidores').innerHTML +=
            `
        <div class="card mb-4 borde-color-primario border border-4 rounded-4">
                <div class="card-body">
                    <div>
                        <span class="text-muted texto-pequeno">Nombre: </span>
                        <span class="texto-pequeno float-end">${repartidor.nombreRepartidor} ${repartidor.apellidoRepartidor}</span>
                    </div>

                    <div>
                        <span class="text-muted texto-pequeno">Usuario: </span>
                        <span class="texto-pequeno float-end">${repartidor.usuarioRepartidor}</span>
                    </div>

                    <div>
                        <span class="text-muted texto-pequeno">Contrasena: </span>
                        <span class="texto-pequeno float-end">${repartidor.contrasenaRepartidor}</span>
                    </div>
                    
                    <div class="text-center mt-4">
                        <button class="btn-mediano me-4 fondo-verde color-texto-blanco">Aceptar</button>
                        <button class="btn-mediano color-secundario-fondo color-texto-blanco">Rechazar</button>
                    </div>
                </div>
            </div>
        `
    })

}

function verOrdenes() {
    document.getElementById('paginaPrincipal').style.display = 'none';
    document.getElementById('ordenesDisponibles').style.display = 'block';

    let divOrdenes = document.getElementById('ordenes')
    divOrdenes.innerHTML = '';

    ordenes.forEach((orden, indice) => {
        divOrdenes.innerHTML +=
            `
        <div role="button" class="card mb-4 sombra borde-color-primario border border-4 rounded-4" onclick="asignarOrden(${indice})">
                <div class="card-body">
                    <h5 class="card-title mb-3">Orden ${orden.codigo}</h5>
                    <p class="card-text mb-2"><strong>Cliente: </strong>${orden.nombreCliente}</p>
                    <p class="card-text mb-2"><strong>Descripcion: </strong>${orden.descripcion}</p>
                    <p class="card-text mb-2"><strong>Direccion: </strong>${orden.direccion}</p>
                    <p class="card-text mb-2"><strong>Cantidad: </strong>${orden.cantidad}</p>
                    <p class="card-text mb-2"><strong>Total: </strong>lps. ${orden.total}</p>
                </div>
            </div> 
        `
    })
}

function asignarOrden(indice) {
    document.getElementById('asignarOrden').style.display = 'block';
    document.getElementById('ordenesDisponibles').style.display = 'none';

    document.getElementById('repartidoresDisponibles').innerHTML = '';

    repartidores.forEach(repartidor => {
        document.getElementById('repartidoresDisponibles').innerHTML +=
            `
        <div class="card mb-4 borde-color-primario border border-4 rounded-4" style="width: 342px">
                <div class="card-body">
                    <div>
                        <span class="text-muted texto-pequeno">Nombre: </span>
                        <span class="texto-pequeno float-end">${repartidor.nombreRepartidor} ${repartidor.apellidoRepartidor}</span>
                    </div>

                    <div>
                        <span class="text-muted texto-pequeno">Usuario: </span>
                        <span class="texto-pequeno float-end">${repartidor.usuarioRepartidor}</span>
                    </div>

                    <div class="text-center mt-4">
                        <button class="btn-mediano fondo-verde color-texto-blanco">Asignar orden</button>
                    </div>
                </div>
            </div>
        `
    })
}

function regresarAOrdenesDisponibles() {
    document.getElementById('asignarOrden').style.display = 'none';
    document.getElementById('ordenesDisponibles').style.display = 'block';
}