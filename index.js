//ELEMENTOS DE AGREGAR TAREA
const tbody = document.querySelector(".tbody-lista");
const input = document.querySelector(".input-tarea");
const btnAgregar = document.querySelector(".btnAgregar");

//ELIMINAR TODO
const btnEliminarTodo = document.querySelector(".btnEliminarTodo");

//ELEMENTOS DE EDITAR TAREA
const contenedorEditar = document.querySelector(".contenedor-editar-oculto");
const contenedorEditarTarea = document.querySelector(".contenedor-editar-tarea")
const inputEditar = document.querySelector(".input-editar");
const btnGuardar = document.querySelector(".btnGuardar");

contenedorEditar.addEventListener("click", ()=>{
  contenedorEditar.classList.remove("contenedor-editar-mostrar");
  contenedorEditar.classList.add("contenedor-editar-oculto");
})
contenedorEditarTarea.addEventListener("click",(e)=>{
  e.stopPropagation();
})

let listaTareas = [];
let id = 0;
let tareaEditada = "";

let datosLocal = JSON.parse(localStorage.getItem("lista")) || [];

if (Array.isArray(datosLocal) && datosLocal.length > 0) {
  listaTareas = [...datosLocal]; // Copia los datos a listaTareas
  id = datosLocal[0].id;
}


mostrarTareas();
//AGREGAR TAREA
btnAgregar.addEventListener("click", () => {
  if (input.value != "") {
    agregarTarea();
    mostrarTareas();
  }
});

//AGREGAR TAREA A LISTA
function agregarTarea() {
  id++;
  const tarea = {
    id: id,
    descripcion: input.value,
    estado: "pendiente",
  };

  listaTareas.unshift(tarea);
  localStorage.setItem("lista", JSON.stringify(listaTareas));
}

//MOSTRAR LISTA DE TAREAS
function mostrarTareas() {
  tbody.innerHTML = "";
  //RECORRER LISTA DE TAREAS
  listaTareas.forEach((tarea) => {
    //ELEMENTOS CREADOS
    const tr = document.createElement("tr");
    tr.style.background = "rgb(139, 139, 218)";
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    const tdMarcar = document.createElement("td");
    const tdTarea = document.createElement("td");
    const tdAcciones = document.createElement("td");
    tdMarcar.classList.add("tdMarcar");
    tdTarea.classList.add("tdTarea");
    tdAcciones.classList.add("tdAcciones");

    //MARCAR/DESMARCAR TAREAS
    checkbox.addEventListener("click", () => {
      tr.style.background = "#504192";
      tdTarea.style.textDecoration = "line-through";
      tdTarea.style.textDecorationThickness = "2px";
      tdTarea.style.color = "white";
      tarea.estado = "completada";

      localStorage.setItem("lista", JSON.stringify(listaTareas));

      if (!checkbox.checked) {
        tr.style.background = "rgb(139, 139, 218)";
        tdTarea.style.textDecoration = "none";
      tdAcciones.style.filter = "none";
      tdTarea.style.color = "black";
        tarea.estado = "pendiente";
        localStorage.setItem("lista", JSON.stringify(listaTareas));
      }
    });

    //VERIFICAR TAREAS COMPLETADAS
    if (tarea.estado == "completada") {
      tr.style.background = "#504192";
      tdTarea.style.textDecoration = "line-through";
      tdTarea.style.textDecorationThickness = "2px";
      tdTarea.style.color = "white";
      checkbox.checked = true;
    }

    //ASIGNACION DE ELEMENTOS Y DATOS A LAS CELDAS(td)
    tdMarcar.appendChild(checkbox);
    tdTarea.textContent = tarea.descripcion;
    tdAcciones.appendChild(eliminarTarea(tarea.id));
    tdAcciones.appendChild(editarTarea(tarea.id));

    //ASIGNACION DE LA CELDA(td) A LA FILA(tr)
    tr.appendChild(tdMarcar);
    tr.appendChild(tdTarea);
    tr.appendChild(tdAcciones);
    tbody.appendChild(tr);
  });

  //LIMPIAR ENTRADA
  input.value = "";
}

//ELIMINAR TAREAS
function eliminarTarea(id) {
  const btnEliminar = document.createElement("button");
  const img = document.createElement("img");
  img.src = "./img/borrar.png";
  btnEliminar.appendChild(img);
  btnEliminar.classList.add("btn");
  btnEliminar.classList.add("btn-eliminar");

  btnEliminar.addEventListener("click", () => {
    let indexTarea = listaTareas.findIndex((e) => e.id == id);
    listaTareas.splice(indexTarea, 1);
    localStorage.setItem("lista", JSON.stringify(listaTareas));
    mostrarTareas();
  });

  return btnEliminar;
}

//EDITAR TAREAS
function editarTarea(id) {
  const btnEditar = document.createElement("button");
  const img = document.createElement("img");
  img.src = "./img/editar.png";
  btnEditar.appendChild(img);
  btnEditar.classList.add("btn");
  btnEditar.classList.add("btn-editar");

  btnEditar.addEventListener("click", () => {
    listaTareas.forEach((e, index) => {
      if (listaTareas[index].id === id) {
        tareaEditada = listaTareas[index].descripcion;

        inputEditar.value = tareaEditada;
      }
    });

    contenedorEditar.classList.add("contenedor-editar-mostrar");
    contenedorEditar.classList.remove("contenedor-editar-oculto");
  });

  return btnEditar;
}

//GUARDAR TAREA EDITADA
btnGuardar.addEventListener("click", () => {
  let tareaIndex = listaTareas.findIndex((e) => e.descripcion === tareaEditada);

  let tarea = listaTareas[tareaIndex];
  tarea.descripcion = inputEditar.value;

  inputEditar.value = "";

  localStorage.setItem("lista", JSON.stringify(listaTareas));

  contenedorEditar.classList.remove("contenedor-editar-mostrar");
  contenedorEditar.classList.add("contenedor-editar-oculto");

  mostrarTareas();
});

btnEliminarTodo.addEventListener("click",()=>{

  if(listaTareas.length > 0){
    listaTareas = [];
    localStorage.setItem("lista", JSON.stringify(listaTareas));
    mostrarTareas();
    console.log("se ejecuto");
  }
  
})

