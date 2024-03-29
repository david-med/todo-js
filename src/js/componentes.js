
//Referencias en HTML

import { Todo } from "../classes";
import { todoList } from "../index";

const divTodoList   = document.querySelector('.todo-list');
const txtInput      = document.querySelector ('.new-todo');
const btnBorrar     = document.querySelector ('.clear-completed');
const ulFiltros     = document.querySelector('.filters');
const anchorFiltros = document.querySelectorAll ('.filtro');
export const contPendiente = document.querySelector('strong');
let contador = 0;

export const crearTodoHTML = ( todo ) => {

    const htmlTodo = `
    <li class="${(todo.completado) ? 'completed' : ''}" data-id="${ todo.id }">
        <div class="view">
            <input class="toggle" type="checkbox" ${(todo.completado) ? 'checked': ''}>
            <label>${ todo.tarea }</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="Create a TodoMVC template">
    </li>`;

    const div = document.createElement('div');
    div.innerHTML = htmlTodo;
    divTodoList.append ( div.firstElementChild );
    if (!todo.completado) {
        contador == contador ++;
        contPendiente.innerText = contador.toString();     
    }
    return div.firstElementChild;

}


txtInput.addEventListener('keyup', (event) => {
    if (event.keyCode === 13 && txtInput.value.length > 0) {
        
        const nuevoTodo = new Todo(txtInput.value);

        todoList.nuevoTodo( nuevoTodo );
        crearTodoHTML(nuevoTodo);
        txtInput.value = '';
    }
});

divTodoList.addEventListener('click', (event) => {
    
    const nombreElemento    = event.target.localName;
    const todoElemento      = event.target.parentElement.parentElement;
    const todoId            = todoElemento.getAttribute('data-id');
    
    if (nombreElemento.includes ('input')){
        todoList.marcarCompletado (todoId);
        todoElemento.classList.toggle('completed');
        if (todoElemento.classList.contains('completed')) {
            contador == contador --;
            contPendiente.innerText = contador.toString();   
        }else {
            contador == contador ++;
            contPendiente.innerText = contador.toString();
        }        
    }else if (nombreElemento.includes ('button')){
        
        if (!todoElemento.classList.contains('completed')) {
             contador == contador --;
             contPendiente.innerText = contador.toString();
         }        
        todoList.eliminarTodo (todoId);
        divTodoList.removeChild (todoElemento);
        
        
    }
});

btnBorrar.addEventListener('click', (event) =>{
    todoList.eliminarTodo ();
    for (let i = divTodoList.children.length-1; i >= 0; i--) {

        const elemento = divTodoList.children[i];
        
        if (elemento.classList.contains('completed')){
            divTodoList.removeChild(elemento);
        }
        console.log(elemento);
        
    }

});

ulFiltros.addEventListener('click', (event) => {
    const filtro = event.target.text;

    if (!filtro) { return; }

    anchorFiltros.forEach (elem => elem.classList.remove('selected'));
    event.target.classList.add('selected');
    
    for (const elemento of divTodoList.children) {
        
        elemento.classList.remove('hidden');
        const completado = elemento.classList.contains('completed');
        
        switch (filtro) {
            case 'Pendientes':
                if (completado){
                    elemento.classList.add('hidden');
                }
                break;
            case 'Completados':
                if (!completado){
                    elemento.classList.add('hidden');
                }
                break;
        }
    }

});