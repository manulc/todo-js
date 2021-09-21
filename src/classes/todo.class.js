

export class Todo {

    // Nota: Los objetos contenidos en el array recuperado de Local Storage no son de tipo "Todo", es decir, son objetos literales 
    // Por esta razón, creamos este método estático para realizar la conversión de un objeto literal a un objeto de tipo "Todo"
    static fromJson({ id, tarea, completado, creado }) {
        const tempTodo = new Todo(tarea);
        
        tempTodo.id = id;
        tempTodo.completado = completado;
        tempTodo.creado = creado;

        return tempTodo;
    }

    constructor(tarea) {
        this.tarea = tarea;
        this.id = new Date().getTime(); // Usamos la fecha actual en milisegundos como un id único
        this.completado = false;
        this.creado = new Date();
    }
}