const timeViewElement = document.querySelector('.js-clock');


function init(){
    updateTimeInfo();
    setInterval(updateTimeInfo, 1000);
}

function updateTimeInfo(){
    timeViewElement.innerText = getTime();
}

function getTime(){
    const currentDate = new Date();
    const getHour = currentDate.getHours();
    const getMin = currentDate.getMinutes();
    const getSecond = currentDate.getSeconds();

    return `${makeTwoFigures(getHour)}:${makeTwoFigures(getMin)}:${makeTwoFigures(getSecond)}`;
}

function makeTwoFigures(figure){
    if( figure < 10 )  return '0'+figure;
    else return figure;
}


init();