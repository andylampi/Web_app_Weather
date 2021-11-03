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

const createArr = (coord) => {
    const uluru = { lat: coord.latitude, lng: coord.longitude };
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 13,
    center: uluru,
  });
  const marker = new google.maps.Marker({
    position: uluru,
    map: map,
  });
}

Main:{
getUserLocation().then(showPosition).then(mycity).then(createArr)
}
