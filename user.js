const formElement = document.querySelector(".js-form");
const inputElement = formElement.querySelector("input");
const grettingElement = document.querySelector(".js-gretting");
let username = null;

function init(){
    loadUserName();

    formElement.addEventListener('keypress', enterHandler)
}
function loadUserName(){
    if( existUserNameLocalStorage() )  {
        inputElement.classList.add('dis-none');
        grettingElement.innerText = `Hello, ${username}`;
    }else {
        grettingElement.classList.add('dis-none');
    }
}
function existUserNameLocalStorage(){
    username = localStorage.getItem('username');
    if( username == null) return false;
    else return true;
}

function enterHandler(e){
    if( e.key != 'Enter') return;
    e.preventDefault();

    const summittedName = inputElement.value;
    gretting(summittedName);
}
function gretting(summittedName){
    if( summittedName == "") return ;

    grettingElement.innerText = `Hello, ${summittedName}`;
    grettingElement.classList.remove('dis-none');
    inputElement.classList.add('dis-none');

    saveNameAtLocalStorage(summittedName);
}
function saveName(summittedName){
    localStorage.setItem('username', summittedName);
}


init();