import { Todo } from "../classes"; // Localiza por defecto el archivo "index.js" del directorio "classes" que contiene todas las exportaciones
import { todoList } from "../index";


// Referencias en el HTML
const ulTodoList = document.querySelector('.todo-list');
const txtInput = document.querySelector('.new-todo');
const btnBorrarCompletados = document.querySelector('.clear-completed');
const ulFiltros = document.querySelector('.filters');
const anchorFiltros = ulFiltros.querySelectorAll('.filtro');
const strongNumPendientes = document.querySelector('.todo-count strong'); // Selecciona el elemento con etiqueta "strong" dentro del elemento con clase "todo-count"

export const crearTodoHtml = todo => {

    const htmlTodo = `
        <li class="${ todo.completado ? 'completed' : '' }" data-id="${ todo.id }">
            <div class="view">
                <input class="toggle" type="checkbox" ${ todo.completado ? 'checked' : '' }>
                <label>${ todo.tarea } </label>
                <button class="destroy"></button>
            </div>
            <input class="edit" value="Create a TodoMVC template">
        </li>`;

    // Creamos un elemento HTML 'div' para crear dentro la estructura HTML del texto 'htmlTodo'
    const div = document.createElement('div');
    div.innerHTML = htmlTodo;

    // Como 'ulTodoList' es un elemento HTML que se corresponde con una lista desordenada y está compuesta por elementos HTML 'li', del elemento HTML 'div' anterior, agregamos únicamente el elemento 'li' accediendo a la propiedad 'firstElementChild' de ese 'div'
    ulTodoList.append(div.firstElementChild);

    // Si la tarea no está marcada como completada, actualizamos el número de tareas pendientes con una más
    // Con al expresión "strongNumPendientes.innerText * 1 + 1", obtenemos del elemento HTML strong el número de tareas pendientes en formato string y lo pasamos a formato numérico para sumarle una unidad
    if(!todo.completado)
        strongNumPendientes.innerText = strongNumPendientes.innerText * 1 + 1;

    return div.firstElementChild;
};

// Eventos

// Escucha el evento "keyup" cuando se produce en el elemento HTML "txtInput"
// 'keyup' es un tipo de evento que se corresponde cuando el usuario suelta una tecla del teclado
txtInput.addEventListener('keyup', event => {

    // Si el usuario pulsó la tecla "enter"(código 13), significa que terminó de escribir el nombre de la tarea
    // Si se cumple lo anterior y, además, el usuario introdujo texto no vacío, creamos una nueva tarea
    // Nota: También podemos acceder al texto introducido por el usuario a través del evento medinate la expresión "event.target.value" en vez de acceder a ese texto a través de la referencia del input "txtInput"
    if(event.keyCode === 13 && txtInput.value.length > 0) {
        const nuevoTodo = new Todo(txtInput.value);

        todoList.nuevoTodo(nuevoTodo);

        crearTodoHtml(nuevoTodo);

        txtInput.value = ''; // Una vez agregado la nueva tarea, dejamos vacío el elemento HTML input
    }

});

// Escucha el evento "click" cuando se produce en el elemento HTML "ulTodoList"
ulTodoList.addEventListener('click', event => {

    // La propiedad "localName" de la propiedad "target" del objeto "event" nos dice en qué parte de la lista desordenada "ul" y de sus elementos "li" se hizo "click"
    const nombreElemento = event.target.localName; // Puede ser "input", "label", o "button"
    // Obtenemos el elemento HTML "li" seleccionado
    // El primer "parentElement" nos da el elemento HTML "<div class="view">" que es el elemento hijo del elemento "li"
    // Por lo tanto, el segundo "parentElement" nos da el elemento HTML "li"
    const todoElemento = event.target.parentElement.parentElement;
    // Obtenemos el id de la tarea accediendo al atributo "data-id" del elemento HTML "li" seleccionado
    // Este id se obtiene en forma de string y, si lo multiplicamos por 1, obtenemos su forma numérica
    // Lo pasamos a su forma numérica porque así se tratan los ids de las tareas almacenadas en memoria
    const todoId = todoElemento.getAttribute('data-id') * 1;

    // Si el usuario hizo "click" justo en el "input" de marcar o desmarcar la tarea como completada del elemento HTML "li", hacemos lo siguiente:
    if(nombreElemento === 'input'){
        todoList.toggleCompletado(todoId); // Cambia en memoria la propiedad "completado" de la tarea seleccionada de true a false o de false a true según su valor inicial
        todoElemento.classList.toggle('completed'); // El método "toggle" hace que si la clase "completed" existe, la elimina y, si no existe, la crea
        // Si al elemento se le añade la clase "completed", actualizamos el número de tareas pendientes con una menos
        // En caso contrario, es decir, si al elemento se le quita la clase "completed", actualizamos el número de tareas pendientes con una más
        // Nota: La expresión "strongNumPendientes.innerText * 1" es para pasar el número de tareas pendientes en formato string a formato numérico
        strongNumPendientes.innerText = todoElemento.classList.contains('completed')
            ? strongNumPendientes.innerText * 1 - 1
            : strongNumPendientes.innerText * 1 + 1;
    }
    // Si el usuario hizo "click" justo en el botón de eliminar la tarea del elemento HTML "li", hacemos lo siguiente:
    else if(nombreElemento === 'button'){
        todoList.eliminarTodo(todoId); // Elimina la tarea seleccionada de la memoria
        ulTodoList.removeChild(todoElemento); // Elimina el elemento 'li' seleccionado de la lista HTML
        // Si se elimina una tarea pendiente, es decir, aquella que no tiene la clase "completed", actualizamos el número de tareas pendientes con una menos
        // Nota: La expresión "strongNumPendientes.innerText * 1" es para pasar el número de tareas pendientes en formato string a formato numérico
        if(!todoElemento.classList.contains('completed'))
            strongNumPendientes.innerText = strongNumPendientes.innerText * 1 - 1;
    }
});

btnBorrarCompletados.addEventListener('click', () => {

    todoList.eliminarCompletados(); // Elimina las tareas marcadas como completadas de la memoria

    // Elimina los elementos 'li' correspondientes a tareas completadas de la lista HTML 'ul'
    // Una forma de borrarlos
    // Cuidado!: Se debe empezar a eliminar los elementos desde el final hasta el principio porque en cada iteración se actualiza el número de elementos y, por lo tanto, también se actualiza el valor de "ulTodoList.children.length"
    /*for(let i = ulTodoList.children.length - 1; i >= 0; i--){
        const elemento = ulTodoList.children[i];

        if(elemento.classList.contains('completed'))
            ulTodoList.removeChild(elemento);
    }*/

    // Otra forma de borrarlos
    const elementosCompletados = ulTodoList.querySelectorAll('.completed');
    elementosCompletados.forEach(e => ulTodoList.removeChild(e));

});

ulFiltros.addEventListener('click', event => {
    const filtro = event.target.text; // Puede ser 'Todos', 'Pendientes, 'Completados' o undefined(si se hace "click" en un espacio sin nada del elemento HTML referenciado por "ulFiltros")

    // Si el filtro es undefined, nos salimos
    if(!filtro)
        return;
    
    // Recorremos los elementos de tipo anchor ('<a href="#"></a>') de los filtros para eliminar la clase "selected"(marca visualmente el enlace) del filtro seleccionado anteriormente
    // Esto lo hacemos para asignar esa clase al nuevo elemento de tipo anchor correspondiente al filtro que se acaba de seleccionar
    anchorFiltros.forEach(elem => elem.classList.remove('selected'));

    // Marcamos visualmente el enlace del filtro que se acaba de seleccionar
    // "event.target" contiene la referencia al elemento de tipo anchor('<a href="#"></a>') del filtro seleccionado
    event.target.classList.add('selected');

    for(const elemento of ulTodoList.children ){

        // Por defecto eliminamos la clase "hidden" del elemento por si acaso la tuviera de filtros anteriores 
        elemento.classList.remove('hidden');

        const esCompletado = elemento.classList.contains('completed');

        switch(filtro) {
            case 'Pendientes':
                if(esCompletado)
                    elemento.classList.add('hidden');
                break;
            case 'Completados':
                if(!esCompletado)
                    elemento.classList.add('hidden');
                break;
        }
    }

});