
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
  <strong>Datos Incorrectos</strong>
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
                            <td class="text-center"><a class="btnEditar btn btn-primary">Editar</a><a class="btnBorrar btn btn-danger">Borrar</a></td>
                       </tr>
                    `
    })
    contenedor.innerHTML = resultados

}


//Get data



    const on = (element, event, selector, handler) => {

        element.addEventListener(event, e => {
            if(e.target.closest(selector)){
                handler(e)
            }
        })
    }

    //delete

    on(document, 'click', '.btnBorrar', e => {
        const fila = e.target.parentNode.parentNode
        const user = fila.firstElementChild.innerHTML
        alertify.confirm("This is a confirm dialog.",
        function(){
            fetch(url+user, {
                method: 'DELETE'
            })
            .then( res => res.json() )
            .then( ()=> location.reload())
            alertify.success('Ok')
        },
        function(){
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
        usuario.value =  usuarioForm
        contraseña.value =  contraseñaForm
        nombre.value =  nombreForm
        apellido.value =  apellidoForm
        cedula.value =  cedulaForm
        telefono.value =  telefonoForm
        correo.value =  correoForm
        direccion.value =  direccionForm
        opcion = 'editar'
        modalArticulo.show()
         
    })
    


    //Create and Edit
formArticulo.addEventListener('submit', (e)=>{
    e.preventDefault()
    if(opcion=='crear'){        
       
        fetch(url, {
            method:'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                user:usuario.value,
                password:contraseña.value,
                nombre:nombre.value,
                apellido:apellido.value,
                ci:cedula.value,
                telefono:telefono.value,
                correo:correo.value,
                direccion:direccion.value
            })
        })
        .then( response => response.json() )
        .then( data => {
            const nuevoUsuario = []
            nuevoUsuario.push(data)
            mostrar(nuevoUsuario)
        })
    }
    if(opcion=='editar'){    
        //console.log('OPCION EDITAR')
        fetch(url+idForm,{
            method: 'PUT',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                user:usuario.value,
                password:contraseña.value,
                nombre:nombre.value,
                apellido:apellido.value,
                ci:cedula.value,
                telefono:telefono.value,
                correo:correo.value,
                direccion:direccion.value
            })
        })
        .then( response => response.json() )
        .then( response => location.reload() )
    }
    modalArticulo.hide()
})