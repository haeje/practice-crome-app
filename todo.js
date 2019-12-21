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
    if( todoListString == []) return;
    const todoListParsing = JSON.parse(todoListString);
    
    if( todoListParsing == null) return;

    todoListParsing.forEach(todo=>{
        todos.push(todo);

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

        
    });
}
function handleDelete(event){
    const targetId = event.target.parentNode.id;

    console.log(event);
    
    event.target.parentNode.remove();
    
    const cleanToDos = todos.filter(function(todo){
        return todo.id !== parseInt(targetId);
    });

    todos = cleanToDos;
    localStorage.setItem(todos_LS, JSON.stringify(todos));
}

function handleSubmit(event){

    event.preventDefault();
    const inputValue = todoValue.value;
    
    if(inputValue == "") return;


    const tempLiTag = document.createElement("li");
    const tempBtnTag = document.createElement("button");
    const tempSpanTag = document.createElement("span");
    const nextId = idCount++;

    tempBtnTag.addEventListener("click", handleDelete);
    tempSpanTag.append(inputValue);
    tempBtnTag.append(' x ');
    tempLiTag.append(tempSpanTag);
    tempLiTag.id = nextId;
    tempLiTag.append(tempBtnTag);
    todoList.append(tempLiTag);

    
    
    const todoObject = {
        id : nextId,
        contents : inputValue
    }
    todos.push(todoObject);

    localStorage.setItem(todos_LS, JSON.stringify(todos));
    localStorage.setItem(idCount_LS, idCount);

    todoValue.value ="";
}

init();