
var empresas = [
    {
        nombreEmpresa: 'Pizza Hut',
        descripcion: 'Lorem ipsum dolor, sit amet consectetur adipisicing.',
        color: '#E51120',
        logo: 'img/pizzaHut.jpg'
    },
    {
        nombreEmpresa: 'Pepsi',
        descripcion: 'Lorem ipsum dolor, sit amet consectetur adipisicing.',
        color: '#4287f5',
        logo: 'img/pepsi.jpg'
    },
    {
        nombreEmpresa: 'Coco Baleadas',
        descripcion: 'Lorem ipsum dolor, sit amet consectetur adipisicing.',
        color: '#04DADB',
        logo: 'img/cocoBaleadas.jpg'
    },
    {
        nombreEmpresa: 'Coca Cola',
        descripcion: 'Lorem ipsum dolor, sit amet consectetur adipisicing.',
        color: '#E41E2B',
        logo: 'img/cocaCola.jpg'
    },
]
var empresaSeleccionada;

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