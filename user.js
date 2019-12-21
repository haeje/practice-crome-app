const formElement = document.querySelector(".js-form");
const inputElement = formElement.querySelector("input");
const grettingElement = document.querySelector(".js-gretting");


function init(){
    formElement.addEventListener('keypress', enterHandler)
    loadUserName();
}

function loadUserName(){
    const username = localStorage.getItem('username');
    if( username == null )  {
        grettingElement.classList.add('dis-none');
    }else {
        inputElement.classList.add('dis-none');
        grettingElement.innerText = `Hello, ${username}`;
    }
}

function enterHandler(e){
   
    const key = e.keyCode;
    if( key != 13) return;
    e.preventDefault()

    const summittedName = inputElement.value;
    grettingElement.innerText = `Hello, ${summittedName}`;
    grettingElement.classList.remove('dis-none');
    inputElement.classList.add('dis-none');

    localStorage.setItem('username', summittedName);

}


init();