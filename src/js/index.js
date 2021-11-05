const showhtml = (city, id, response) => {
    document.getElementById(id).innerHTML = `<h3 style="text-align: center">${response.location.name} </h3> 
    <img src="https:${response.current.condition.icon}">
    <p>Condition: ${response.current.condition.text}</p>
    <p>Humidity: ${response.current.humidity}</p>
    <p>Cloud: ${response.current.cloud}</p>
    <p>Temperature(°C): ${response.current.temp_c}</p>
    <p>Wind_mph: ${response.current.wind_mph}</p>`
    
}
const getUserLocation = () => {
    return new Promise(function(resolve, reject) {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(resolve);
        } else {
          reject("Geolocation is not supported by this browser")
        }
    });
  }
const  showPosition = (position) => {
    let coordinates = new Object();
    coordinates = {
        latitude:position.coords.latitude,
        longitude:position.coords.longitude
    }
    return coordinates;
}

const mycity = async(coordinates) =>{
    let city;
    let request = await fetch(`https://api.weatherapi.com/v1/current.json?key=69645ce9bf554afa863102051211810&q=${coordinates.latitude},${coordinates.longitude}`)
    let response = await request.json()
    showhtml(city, "city", response)
    return coordinates
}

const search = async(id) =>{
    let city = document.getElementById("search").value;
    let requestapi = await fetch(`https://api.weatherapi.com/v1/current.json?key=69645ce9bf554afa863102051211810&q=${city}&aqi=no`)
    let response = await requestapi.json()
    showhtml(city, id, response)   
    return response
}


async function around(coord){    
    limits = 20;
    let url= await fetch(`https://browse.search.hereapi.com/v1/browse?at=${coord.latitude},${coord.longitude}&limit=${limits}&categories=350-3500-0302&apikey=yvC_lpZ5UJ-mLrhHb8MCRMbDErDThM5mpSAn_M-xglo`)
    let response = await url.json()
    for(let position of response.items){
    console.log(position.position)
    }
}


function CreationMap(coord){
    var platform = new H.service.Platform({
        apikey: "yvC_lpZ5UJ-mLrhHb8MCRMbDErDThM5mpSAn_M-xglo"
    });
    var defaultLayers = platform.createDefaultLayers();
    var map = new H.Map(document.getElementById('map'),
        defaultLayers.vector.normal.map,{
        center: {lat:coord.latitude, lng:coord.longitude},
        zoom: 13,
        pixelRatio: window.devicePixelRatio || 1
    });
    window.addEventListener('resize', () => map.getViewPort().resize());
    var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));
    var ui = H.ui.UI.createDefault(map, defaultLayers);
    let parisMarker = new H.map.Marker({lat:coord.latitude, lng:coord.longitude});
    map.addObject(parisMarker); 
    return coord  
}

Main:{
getUserLocation()
.then(showPosition)
.then(mycity)
.then(CreationMap)
.then(around)
}
