
var empresas = [
    {
        nombreEmpresa: 'Pizza Hut',
        descripcion: 'Lorem ipsum dolor, sit amet consectetur adipisicing.',
        color: '#E51120',
        logo: 'img/pizzaHut.jpg',
        productos: [
            {
                nombreProducto: 'Pizza Suprema',
                descripcionProducto: 'Lorem ipsum dolor sit, amet consectetur adipisicing.',
                color: '#E51120',
                precio: 199,
                image: 'img/pizzaSuprema.jpg'
            },
            {
                nombreProducto: 'Pizza Regular',
                descripcionProducto: 'Lorem ipsum dolor sit, amet consectetur adipisicing.',
                color: '#E51120',
                precio: 150,
                image: 'img/pizzaSuprema.jpg'
            }
        ]
    },
    {
        nombreEmpresa: 'Pepsi',
        descripcion: 'Lorem ipsum dolor, sit amet consectetur adipisicing.',
        color: '#4287f5',
        logo: 'img/pepsi.jpg',
        productos: [
            {
                nombreProducto: 'Pepsi 500ml',
                descripcionProducto: 'Lorem ipsum dolor sit, amet consectetur adipisicing.',
                color: '#4287f5',
                precio: 15,
                image: 'img/pepsiBotella.jpg'
            },
            {
                nombreProducto: 'Pepsi 2lts',
                descripcionProducto: 'Lorem ipsum dolor sit, amet consectetur adipisicing.',
                color: '#4287f5',
                precio: 45,
                image: 'img/pepsiBotella.jpg'
            }
        ]
    },
    {
        nombreEmpresa: 'Coco Baleadas',
        descripcion: 'Lorem ipsum dolor, sit amet consectetur adipisicing.',
        color: '#04DADB',
        logo: 'img/cocoBaleadas.jpg',
        productos: [
            {
                nombreProducto: 'Baleada sencilla',
                descripcionProducto: 'Lorem ipsum dolor sit, amet consectetur adipisicing.',
                color: '#04DADB',
                precio: 15,
                image: 'img/baleada.jpg'
            },
            {
                nombreProducto: 'Baleada con todo',
                descripcionProducto: 'Lorem ipsum dolor sit, amet consectetur adipisicing.',
                color: '#04DADB',
                precio: 25,
                image: 'img/baleada.jpg'
            }
        ]
    },
    {
        nombreEmpresa: 'Coca Cola',
        descripcion: 'Lorem ipsum dolor, sit amet consectetur adipisicing.',
        color: '#E41E2B',
        logo: 'img/cocaCola.jpg',
        productos: [
            {
                nombreProducto: 'Coca Cola 500ml',
                descripcionProducto: 'Lorem ipsum dolor sit, amet consectetur adipisicing.',
                color: '#E41E2B',
                precio: 15,
                image: 'img/cocaColaBotella.png'
            },
            {
                nombreProducto: 'Coca Cola 2lts',
                descripcionProducto: 'Lorem ipsum dolor sit, amet consectetur adipisicing.',
                color: '#E41E2B',
                precio: 45,
                image: 'img/cocaColaBotella.png'
            }
        ]
    },
]
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
var ordenes = [
    {
        codigo: 1,
        nombreCliente: 'Juan',
        descripcion: 'Lorem ipsum dolor sit amet consectetur adipisicing.',
        direccion: 'Lorem, ipsum dolor.',
        cantidad: 1,
        total: 199,
        estado: 'En el destino'
    },
    {
        codigo: 2,
        nombreCliente: 'Maria',
        descripcion: 'Lorem ipsum dolor sit amet consectetur adipisicing.',
        direccion: 'Lorem, ipsum dolor.',
        cantidad: 1,
        total: 199,
        estado: 'En camino'
    },
    {
        codigo: 3,
        nombreCliente: 'Alejandra',
        descripcion: 'Lorem ipsum dolor sit amet consectetur adipisicing.',
        direccion: 'Lorem, ipsum dolor.',
        cantidad: 1,
        total: 199,
        estado: 'En el origen'
    }
]

var empresaSeleccionada;
var productoSeleccionado;

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

function entrar() {
    document.getElementById('paginaInicio').style.display = 'none';
    document.getElementById('paginaPrincipal').style.display = 'block';
}

function verEmpresas() {
    document.getElementById('paginaPrincipal').style.display = 'none';
    document.getElementById('paginaEmpresas').style.display = 'block';
    let divEmpresas = document.getElementById('empresas')
    divEmpresas.innerHTML = '';

    empresas.forEach((empresa, indice) => {
        divEmpresas.innerHTML += 
        `
        <div class="col-md-3">
            <div role="button" class="card mb-4 sombra" style="border: 2px solid ${empresa.color}" onclick="administrarEmpresa(${indice})">
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

function administrarEmpresa(indice) {
    document.getElementById('administrarEmpresa').style.display = 'block';
    document.getElementById('paginaEmpresas').style.display = 'none';
    empresaSeleccionada = empresas[indice];

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

function agregarEmpresa() {
    document.getElementById('paginaAgregarEmpresa').style.display = 'block';
    document.getElementById('paginaEmpresas').style.display = 'none';
}

function verEmpresasProductos() {
    document.getElementById('paginaPrincipal').style.display = 'none';
    document.getElementById('empresasProductos').style.display = 'block';
    let divEmpresas = document.getElementById('empresasSeleccion')
    divEmpresas.innerHTML = '';

    empresas.forEach((empresa, indice) => {
        divEmpresas.innerHTML += 
        `
        <div class="col-md-3">
            <div role="button" class="card mb-4 sombra" style="border: 2px solid ${empresa.color}" onclick="verProductos(${indice})">
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

function verProductos(indice) {
    document.getElementById('productosEmpresa').style.display = 'block';
    document.getElementById('empresasProductos').style.display = 'none';
    empresaSeleccionada = empresas[indice];

    let divProductos = document.getElementById('productos')
    divProductos.innerHTML = '';

    empresaSeleccionada.productos.forEach((producto, indice) => {
        divProductos.innerHTML += 
        `
        <div class="col-md-3">
            <div role="button" class="card mb-4 sombra" style="border: 2px solid ${producto.color}" onclick="administrarProducto(${indice})">
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

function regresarAEmpresasProductos() {
    document.getElementById('empresasProductos').style.display = 'block';
    document.getElementById('productosEmpresa').style.display = 'none';
}

function administrarProducto(indice) {
    productoSeleccionado = empresaSeleccionada.productos[indice]
    document.getElementById('administrarProducto').style.display = 'block';
    document.getElementById('productosEmpresa').style.display = 'none';

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

function editarProducto() {
    document.getElementById('administrarProducto').style.display = 'none';
    document.getElementById('editarProducto').style.display = 'block';
}

function regresarAOpcionesProducto()  {
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