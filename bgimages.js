const body = document.querySelector("body");
const imgCnt = 11;
function init(){
    loadImages();
}

function loadImages(){
    const img = new Image();
    const imgIdx = Math.ceil(Math.random() * imgCnt);
    img.src = `images/${imgIdx}.jpg`
    img.classList.add('bg-image');
    body.appendChild(img);
    
}

init();