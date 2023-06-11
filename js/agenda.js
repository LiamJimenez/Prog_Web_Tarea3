document.addEventListener("DOMContentLoaded", function() {
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

  var obtenerContactosBtn = document.getElementById("obtenerContactos");
  obtenerContactosBtn.addEventListener("click", function() {
    obtenerContactos();
  });

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

  var buttonsContainer = document.createElement("div");
  buttonsContainer.classList.add("buttons-container");
  buttonsContainer.appendChild(agregarUsuarioBtn);
  buttonsContainer.appendChild(obtenerContactosBtn);
  buttonsContainer.appendChild(eliminarContactosBtn);

  var userForm = document.getElementById("userForm");
  userForm.appendChild(buttonsContainer);
});

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

function obtenerContactos() {
  fetch("http://www.raydelto.org/agenda.php")
    .then(function(response) {
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

function marcarFilaSeleccionada(fila) {
  fila.classList.toggle("selected");
}

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
