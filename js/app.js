const form = document.querySelector(".form");
const campoEntrada = document.querySelector(".input");
const listaUl = document.querySelector(".list");
const tareaAdd = document.querySelector(".tarea-add");
const tareaDelete = document.querySelector(".tarea-delete");
const noTareas = document.querySelector(".no-tareas"); // Elemento de "No hay tareas"

// Ocultar los mensajes al cargar la página
window.addEventListener("DOMContentLoaded", () => {
  tareaAdd.style.display = "none";
  tareaDelete.style.display = "none";
  actualizarNoTareas(); // Comprobar si hay tareas al cargar la página
});

// Cargar tareas desde LocalStorage
let list = JSON.parse(localStorage.getItem("tareas")) || [];

// Mostrar tareas almacenadas al cargar la página
list.forEach((tarea) => {
  agregarTarea(tarea.nombre, tarea.checked);
});

// Evento para agregar tareas
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const tarea = campoEntrada.value.trim();
  if (tarea === "" || tarea.length < 3) {
    alert("Debes agregar una tarea válida (mínimo 3 caracteres).");
    return;
  }
  agregarTarea(tarea, false);
  mostrarMensaje(tareaAdd);
  campoEntrada.value = "";
  actualizarLocalStorage();
  actualizarNoTareas(); // Actualizar el mensaje de "No hay tareas"
});

// Función para agregar tareas
function agregarTarea(tarea, completada) {
  const selectLi = document.createElement("li");
  selectLi.textContent = tarea;
  if (completada) selectLi.classList.add("completed");

  // Botón de check
  const checkBoton = document.createElement("button");
  checkBoton.type = "button";
  checkBoton.innerHTML = `<i class="bi bi-check-square-fill"></i>`;
  selectLi.appendChild(checkBoton);

  // Botón de borrar
  const botonBorrar = document.createElement("button");
  botonBorrar.type = "button";
  botonBorrar.innerHTML = `<i class="bi bi-trash-fill"></i>`;
  selectLi.appendChild(botonBorrar);

  listaUl.appendChild(selectLi);

  // Evento para marcar como completada
  checkBoton.addEventListener("click", () => {
    selectLi.classList.toggle("completed");
    actualizarLocalStorage();
    actualizarNoTareas(); // Actualizar el mensaje de "No hay tareas"
  });

  // Evento para borrar tarea
  botonBorrar.addEventListener("click", () => {
    selectLi.remove();
    mostrarMensaje(tareaDelete);
    actualizarLocalStorage();
    actualizarNoTareas(); // Actualizar el mensaje de "No hay tareas"
  });
}

// Actualizar LocalStorage
function actualizarLocalStorage() {
  const tareas = [];
  document.querySelectorAll("li").forEach((tarea) => {
    tareas.push({
      nombre: tarea.firstChild.textContent,
      checked: tarea.classList.contains("completed"),
    });
  });
  localStorage.setItem("tareas", JSON.stringify(tareas));
}

// Mostrar mensaje de éxito durante 2 segundos
function mostrarMensaje(elemento) {
  elemento.style.display = "block";
  elemento.classList.add("tarea-show");

  // Desaparece gradualmente
  setTimeout(() => {
    elemento.classList.remove("tarea-show");
  }, 1500);

  // Se oculta completamente después de 2 segundos
  setTimeout(() => {
    elemento.style.display = "none";
  }, 2000);
}

// Función para actualizar el mensaje de "No hay tareas"
function actualizarNoTareas() {
  if (listaUl.children.length === 0) {
    noTareas.style.display = "block"; // Mostrar mensaje "No hay tareas"
  } else {
    noTareas.style.display = "none"; // Ocultar mensaje si hay tareas
  }
}
