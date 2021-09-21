import { TodoList } from './classes'; // Localiza por defecto el archivo "index.js" del directorio "classes" que contiene todas las exportaciones
import { crearTodoHtml } from './js/componentes';

import './styles.css';


export const todoList = new TodoList();

todoList.todos.forEach(crearTodoHtml); // Versión simplificada de la expresión "todo => crearTodoHtml(todo)"