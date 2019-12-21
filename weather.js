const geoInfo_LS = "geoInfo";
const API_KEY = "0a2a392043f6d9c73366b228d3921945";
// const body = document.querySelector('body');

function init(){

    checkLocation();
}
function checkLocation(){
    const geoInfo = JSON.parse(localStorage.getItem(geoInfo_LS));
    if( geoInfo === null){
        requestGeoInfo();
    }
    
    getWeather(geoInfo.latitude, geoInfo.longitude);
}
function requestGeoInfo(){
    navigator.geolocation.getCurrentPosition(success, error, options);
}
const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };
  
function success(pos) {
    const crd = pos.coords;
    const crdObj = {
        latitude : crd.latitude,
        longitude : crd.longitude
    }

    saveGeoInfo(crdObj);
};
function saveGeoInfo(crdObj){
    localStorage.setItem(geoInfo_LS, JSON.stringify(crdObj));
}

function error(err) {
console.warn('ERROR(' + err.code + '): ' + err.message);
};

function getWeather(lat, lon){
    console.log(lat, lon);
    
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`)
    .then(data=>{
        return data.json();
    }
    ).then(json=>{
        console.log(json);
        const temp = json.main.temp;
        const location = json.name;

        const spanTag = document.createElement("span");
        spanTag.innerText = `${temp} / ${location}`;
        body.appendChild(spanTag);
    })

}

  
init();