const request =  async () => {
    let city = document.getElementById("search").value;
    let requestapi = await fetch(`https://api.weatherapi.com/v1/current.json?key=69645ce9bf554afa863102051211810&q=${city}&aqi=no`)
    let response = await requestapi.json()
    return response
}

const example = async(city1, id) => {
    let requestapi = await fetch(`https://api.weatherapi.com/v1/current.json?key=69645ce9bf554afa863102051211810&q=${city1}&aqi=no`)
    let response = await requestapi.json()
    document.getElementById(id).innerHTML = `<h3 style="text-align: center">${response.location.name} </h3> 
    <img style="padding-left: 110px"src="https:${response.current.condition.icon}">
    <p>Condition: ${response.current.condition.text}</p>
    <p>Humidity: ${response.current.humidity}</p>
    <p>Cloud: ${response.current.cloud}</p>
    <p>Temperature(°C): ${response.current.temp_c}</p>
    <p>Wind_mph: ${response.current.wind_mph}</p>`   
}
const search = async(id) =>{
    let response = await request();
    document.getElementById(id).innerHTML = `<h3 style="text-align: center">${response.location.name} </h3> 
    <img style="padding-left: 110px"src="https:${response.current.condition.icon}">
    <p>Condition: ${response.current.condition.text}</p>
    <p>Humidity: ${response.current.humidity}</p>
    <p>Cloud: ${response.current.cloud}</p>
    <p>Temperature(°C): ${response.current.temp_c}</p>
    <p>Wind_mph: ${response.current.wind_mph}</p>`
}
Examples_cities:{
example("UK", "city1");
example("Rome", "city2");
example("France", "city3");
example("Switzerland", "city4");
}
