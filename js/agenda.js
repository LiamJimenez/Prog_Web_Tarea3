document.addEventListener("DOMContentLoaded", function () {

  // Obtener referencia al botón "Agregar"
  var agregarUsuarioBtn = document.getElementById("agregarContacto");
  agregarUsuarioBtn.addEventListener("click", function() {
    var nombre = document.getElementById("nombre").value;
    var apellido = document.getElementById("apellido").value;
    var telefono = document.getElementById("telefono").value;

    agregarUsuarioTabla(nombre, apellido, telefono);

    document.getElementById("nombre").value = "";
    document.getElementById("apellido").value = "";
    document.getElementById("telefono").value = "";
  });

  // Obtener referencia al botón "Obtener"
  var obtenerContactosBtn = document.getElementById("obtenerContactos");
  obtenerContactosBtn.addEventListener("click", function() {
    obtenerContactos();
  });

  // Obtener referencia al botón "Eliminar"
  var eliminarContactosBtn = document.getElementById("eliminarContactos");
  eliminarContactosBtn.addEventListener("click", function() {
    var filasSeleccionadas = document.querySelectorAll("tr.selected");

    if (filasSeleccionadas.length > 0) {
      filasSeleccionadas.forEach(function(fila) {
        eliminarFilaTabla(fila);
      });
    } else {
      alert("Selecciona una o más filas para eliminar.");
    }
  });

  // Crear un contenedor para los botones
  var buttonsContainer = document.createElement("div");
  buttonsContainer.classList.add("buttons-container");
  buttonsContainer.appendChild(agregarUsuarioBtn);
  buttonsContainer.appendChild(obtenerContactosBtn);
  buttonsContainer.appendChild(eliminarContactosBtn);

  // Obtener referencia al formulario de usuarios
  var userForm = document.getElementById("userForm");
  userForm.appendChild(buttonsContainer);
});

// Función para agregar un usuario a la tabla
function agregarUsuarioTabla(nombre, apellido, telefono) {
  var tabla = document.getElementById("usersTableBody");
  var primeraFila = tabla.rows[0];

  var nuevaFila = tabla.insertRow(0);

  var celdaNombre = nuevaFila.insertCell(0);
  celdaNombre.innerHTML = nombre;

  var celdaApellido = nuevaFila.insertCell(1);
  celdaApellido.innerHTML = apellido;

  var celdaTelefono = nuevaFila.insertCell(2);
  celdaTelefono.innerHTML = telefono;

  nuevaFila.addEventListener("click", function() {
    marcarFilaSeleccionada(this);
  });

  tabla.insertBefore(nuevaFila, primeraFila);
}

// Función para obtener los contactos 
function obtenerContactos() {
  fetch("https://railway-node-express-production-3b13.up.railway.app/scrape")
    .then(function(response) {
      if (!response.ok) {
        throw new Error("Error en la solicitud. Estado: " + response.status);
      }
      return response.json();
    })
    .then(function(data) {
      var tabla = document.getElementById("usersTableBody");
      tabla.innerHTML = "";

      data.forEach(function(contact) {
        agregarUsuarioTabla(contact.nombre, contact.apellido, contact.telefono);
      });
    })
    .catch(function(error) {
      console.log("Error:", error);
    });
}

// Función para marcar una fila como seleccionada
function marcarFilaSeleccionada(fila) {
  fila.classList.toggle("selected");
}

// Función para eliminar una fila de la tabla
function eliminarFilaTabla(fila) {
  var tabla = document.getElementById("usersTableBody");
  tabla.removeChild(fila);
}



document.addEventListener("DOMContentLoaded", function() {
  var agregarUsuarioBtn = document.getElementById("agregarContacto");
  agregarUsuarioBtn.addEventListener("mouseover", function() {
    this.style.cursor = "pointer";
  });

  var obtenerContactosBtn = document.getElementById("obtenerContactos");
  obtenerContactosBtn.addEventListener("mouseover", function() {
    this.style.cursor = "pointer";
  });

  var eliminarContactosBtn = document.getElementById("eliminarContactos");
  eliminarContactosBtn.addEventListener("mouseover", function() {
    this.style.cursor = "pointer";
  });
});
