const todoForm = document.querySelector(".js-todo-form");
const todoValue = todoForm.querySelector(".js-todo-input");
const todoList = document.querySelector(".todo-list");
const todos_LS = "todos";
const idCount_LS = "idCount";

let todos = [];
let idCount = localStorage.getItem(idCount_LS);



function init(){
    idCounterCheck();
    loadTodoList();
    todoForm.addEventListener("submit", handleSubmit);
}
function idCounterCheck(){
    if( idCount == null ){
        idCount = 0;
        localStorage.setItem(idCount_LS, 0);
    }
}
function loadTodoList(){
    const todoListString = localStorage.getItem(todos_LS);
    const todoListParsing = JSON.parse(todoListString);
    if( todoListParsing == null) return;

    todoListParsing.forEach(todo=>{
        todos.push(todo);
        changeDom(todo);
    });
}
function makeTodoDOM(todo){
        const tempLiTag = document.createElement("li");
        const tempBtnTag = document.createElement("button");
        const tempSpanTag = document.createElement("span");

        tempBtnTag.addEventListener("click", handleDelete);

        tempSpanTag.append(todo.contents);
        tempBtnTag.append(' x ');
        tempLiTag.append(tempSpanTag);
        tempLiTag.id = todo.id;
        tempLiTag.append(tempBtnTag);
        todoList.append(tempLiTag);
}

function handleDelete(event){
    const targetId = event.target.parentNode.id;
    todos = todos.filter(function(todo){
        return todo.id !== parseInt(targetId);
    });

    localStorage.setItem(todos_LS, JSON.stringify(todos));
    
    event.target.parentNode.remove();
}

function handleSubmit(event){
    event.preventDefault();
    const inputValue = todoValue.value;
    if(inputValue == "") return;
    
    const nextId = idCount++;
    const todoObject = {
        id : nextId,
        contents : inputValue
    }
    todos.push(todoObject);
    makeTodoDOM(todoObject);

    localStorage.setItem(todos_LS, JSON.stringify(todos));
    localStorage.setItem(idCount_LS, idCount);

    todoValue.value ="";
}

init();