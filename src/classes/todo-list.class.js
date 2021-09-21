import { Todo } from ".";


export class TodoList {

    constructor() {
        this.cargarLocalStorage();
    }

    nuevoTodo(todo) {
        this.todos.push(todo);
        this.guardarLocalStorage(); // Actualiza el Local Storage con la nueva actualización de la lista de tareas "todos"
    }

    eliminarTodo(id) {
        this.todos = this.todos.filter(todo => todo.id !== id);
        this.guardarLocalStorage(); // Actualiza el Local Storage con la nueva actualización de la lista de tareas "todos"
    }

    toggleCompletado(id) {        
        const todo = this.todos.find(todo => todo.id === id);
   
        if(todo){
            todo.completado = !todo.completado;
            this.guardarLocalStorage(); // Actualiza el Local Storage con la nueva actualización de la lista de tareas "todos"
        }
    }

    eliminarCompletados() {
        this.todos = this.todos.filter(todo => !todo.completado);
        this.guardarLocalStorage(); // Actualiza el Local Storage con la nueva actualización de la lista de tareas "todos"
    }

    guardarLocalStorage() {
        // En Local Storage, los datos sólo pueden ser almacenados en formato string
        // Por esta razón, usamos el método "stringify" de JSON para serializar a un objeto Json(formato string) el array "todos" 
        localStorage.setItem('todos', JSON.stringify(this.todos));
    }

    cargarLocalStorage() {
        // Como los datos se almacenaron en Local Storage como un objeto Json(formato string), usamos el método "parse" de JSON para parsear ese objeto Json y convertirlo a su tipo original, que, en este caso, es un array
        this.todos = localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : [];

        // Nota: Los objetos contenidos en ese array recuperado de Local Storage no son de tipo "Todo", es decir, son objetos literales 
        // Por esta razón, convertimos cada objeto literal contenido en ese array a un objeto de tipo "Todo" 
        // El método "map" devuelve otro array con el resultado de la conversión
        this.todos = this.todos.map(Todo.fromJson); // Versión simplificada de la expresión "obj => Todo.fromJson(obj)"
    }

}