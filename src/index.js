import './styles.css';

import {Todo, TodoList} from './classes';
import { crearTodoHTML } from './js/componentes';

export const todoList = new TodoList();
todoList.todos.forEach(todo => crearTodoHTML(todo));
// todoList.todos.forEach( crearTodoHTML ); //es igual al anterior

// const newTodo =  new Todo('AprenderJavascript');
// todoList.nuevoTodo (newTodo);

console.log('todos', todoList.todos);



// const  tarea =  new Todo('Aprender JavaScript');
// todoList.nuevoTodo(tarea);
// console.log(todoList);
// crearTodoHTML(tarea);


// localStorage.setItem('mi-key', '1234dd566778');
// sessionStorage.setItem('mi-key', '1234dd566778');
// // localStorage.removeItem

// setTimeout (()=>{
//     localStorage.removeItem('mi-key');
// }, 1500);

