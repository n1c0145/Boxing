
//login

function submit(){

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

var contenido = document.querySelector('#contenido')


fetch('usuarios.json')
    .then(res => res.json())
    .then(datos => {

        tabla(datos)
    })


function tabla(datos) {
    contenido.innerHTML = ''
    for (let valor of datos) {
        contenido.innerHTML += `
                
                <tr>
                    <td scope="row">${valor.user}</td>
                    <td>${valor.password}</td>
                    <td>${valor.userData.nombre}</td>
                    <td>${valor.userData.apellido}</td>
                    <td>${valor.userData.ci}</td>
                    <td>${valor.userData.correo}</td>
                    <td>${valor.userData.direccion}</td>
                </tr>
                
                `
    }
}
