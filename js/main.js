
//login

function submit() {

    fetch('usuarios.json')
        .then(res => res.json())
        .then(datos => {
            login(datos)
        })
}


let alert = document.getElementById('alerta');

function login(datos) {
    var user = document.getElementById("user").value;
    var password = document.getElementById("password").value;


    for (let key in datos) {

        if (datos[key].user == user) {
            if (datos[key].password == password) {

                window.location = "table.html"

            }


        }

    }


    alerta()

}

function alerta() {
    alert.innerHTML = `
  <div class="alert alert-danger alert-dismissible fade show" role="alert">
  <strong>Usuario o Contraseña Incorrectos</strong>
</div>
  `;
}



//table

const url = "usuarios.json";

const contenedor = document.querySelector("tbody");

let resultados = ""
const modalArticulo = new bootstrap.Modal(document.getElementById('modalArticulo'))
const formArticulo = document.querySelector('form')
const usuario = document.getElementById('usuario')
const contraseña = document.getElementById('contraseña')
const nombre = document.getElementById('nombre')
const apellido = document.getElementById('apellido')
const cedula = document.getElementById('cedula')
const telefono = document.getElementById('telefono')
const correo = document.getElementById('correo')
const direccion = document.getElementById('direccion')
var opcion = ''

btnCrear.addEventListener('click', () => {
    usuario.value = ''
    contraseña.value = ''
    nombre.value = ''
    apellido.value = ''
    cedula.value = ''
    telefono.value = ''
    correo.value = ''
    direccion.value = ''
    modalArticulo.show()
    opcion = 'crear'
})


// Read

fetch(url).then(response => response.json()).then(data => mostrar(data)).catch(error => console.log(error));

const mostrar = (usuarios) => {
    usuarios.forEach(usuario => {
        resultados += `<tr>
                            <td>${usuario.user}</td>
                            <td>${usuario.password}</td>
                            <td>${usuario.userData.nombre}</td>
                            <td>${usuario.userData.apellido}</td>
                            <td>${usuario.userData.ci}</td>
                            <td>${usuario.userData.telefono}</td>
                            <td>${usuario.userData.correo}</td>
                            <td>${usuario.userData.direccion}</td>
                            <td class="text-center"><a class="btnEditar btn btn-success me-1">Editar<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" class="bi bi-pencil-fill ms-1" viewBox="0 0 16 16">
                            <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
                          </svg></a><a class="btnBorrar btn btn-outline-danger">Borrar <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" fill="currentColor" class="bi bi-eraser" viewBox="0 0 16 16">
                          <path d="M8.086 2.207a2 2 0 0 1 2.828 0l3.879 3.879a2 2 0 0 1 0 2.828l-5.5 5.5A2 2 0 0 1 7.879 15H5.12a2 2 0 0 1-1.414-.586l-2.5-2.5a2 2 0 0 1 0-2.828l6.879-6.879zm2.121.707a1 1 0 0 0-1.414 0L4.16 7.547l5.293 5.293 4.633-4.633a1 1 0 0 0 0-1.414l-3.879-3.879zM8.746 13.547 3.453 8.254 1.914 9.793a1 1 0 0 0 0 1.414l2.5 2.5a1 1 0 0 0 .707.293H7.88a1 1 0 0 0 .707-.293l.16-.16z"/>
                        </svg></a></td>
                       </tr>
                    `
    })
    contenedor.innerHTML = resultados

}


//Get data



const on = (element, event, selector, handler) => {

    element.addEventListener(event, e => {
        if (e.target.closest(selector)) {
            handler(e)
        }
    })
}

//delete

on(document, 'click', '.btnBorrar', e => {
    const fila = e.target.parentNode.parentNode
    const user = fila.firstElementChild.innerHTML
    alertify.confirm("This is a confirm dialog.",
        function () {
            fetch(url + user, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(() => location.reload())
            alertify.success('Ok')
        },
        function () {
            alertify.error('Cancel')
        })
})


//Edit

let idForm = 0
on(document, 'click', '.btnEditar', e => {
    const fila = e.target.parentNode.parentNode
    idForm = fila.children[0].innerHTML
    const usuarioForm = fila.children[1].innerHTML
    const contraseñaForm = fila.children[2].innerHTML
    const nombreForm = fila.children[3].innerHTML
    const apellidoForm = fila.children[4].innerHTML
    const cedulaForm = fila.children[5].innerHTML
    const telefonoForm = fila.children[6].innerHTML
    const correoForm = fila.children[7].innerHTML
    const direccionForm = fila.children[8].innerHTML
    usuario.value = usuarioForm
    contraseña.value = contraseñaForm
    nombre.value = nombreForm
    apellido.value = apellidoForm
    cedula.value = cedulaForm
    telefono.value = telefonoForm
    correo.value = correoForm
    direccion.value = direccionForm
    opcion = 'editar'
    modalArticulo.show()

})



//Create and Edit
formArticulo.addEventListener('submit', (e) => {
    e.preventDefault()
    if (opcion == 'crear') {

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user: usuario.value,
                password: contraseña.value,
                nombre: nombre.value,
                apellido: apellido.value,
                ci: cedula.value,
                telefono: telefono.value,
                correo: correo.value,
                direccion: direccion.value
            })
        })
            .then(response => response.json())
            .then(data => {
                const nuevoUsuario = []
                nuevoUsuario.push(data)
                mostrar(nuevoUsuario)
            })
    }
    if (opcion == 'editar') {
        //console.log('OPCION EDITAR')
        fetch(url + idForm, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user: usuario.value,
                password: contraseña.value,
                nombre: nombre.value,
                apellido: apellido.value,
                ci: cedula.value,
                telefono: telefono.value,
                correo: correo.value,
                direccion: direccion.value
            })
        })
            .then(response => response.json())
            .then(response => location.reload())
    }
    modalArticulo.hide()
})



