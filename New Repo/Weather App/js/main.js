console.log("WindScrib v1.0.1");

const API_KEY = "e33607657d15ab134399ef40a1c43892";





async function getUserGeoLocation() {


  // New Promise
  return new Promise((resolve,reject)=>{

    const geoLocation = checkGeoLocation();

    if (geoLocation === null) return reject("Browsers does not have support for geo location");
  

     geoLocation.getCurrentPosition(
      (position) => {
        Latitude = position.coords.latitude;
        Longitude = position.coords.longitude;
  
        resolve({lat:Latitude,log:Longitude});
      },
      (err) => {
        if (err.PERMISSION_DENIED) {
          return reject("WindScrib requires your location data to work");
        }
        if (err.POSITION_UNAVAILABLE) {
          return reject("Unable to get current location info");
        }
        return reject(err.message);
      }
    );



  });
}

function checkGeoLocation() {
  if (navigator.geolocation) {
    return navigator.geolocation;
  } else {
    alert("Unable to get geo location information");
    return null;
  }
}

async function getWeatherInfo({lat,log}) {

  if (!lat || !log) return alert("Location Access Is Required");

  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${Latitude}&lon=${Longitude}&appid=${API_KEY}&units=metric`;

  const weatherResponse = await fetch(url);

  const weatherData = await weatherResponse.json();

  console.log(weatherData);

  updateWeatherReport(weatherData);
}


function getEle(id=""){
  if(!id) throw "element is required";
  
  return document.getElementById(id);
}


function updateWeatherReport(data){

  const lat = data.coord.lat;
  const lon = data.coord.lon;
  const temp = data.main.temp;
  const description = data.weather[0].description;
  const location = data.name + ", " + data.sys.country;
  const humidity = data.main.humidity;
  const pressure = data.main.pressure;
  const speed = data.wind.speed;

  
  getEle("weather-temp").innerHTML = temp + " <sup>°C</sup>";
  getEle("weather-desc").innerHTML = description;
  getEle("location").innerHTML = location;
  getEle("lat").innerHTML = "Latitude: "+ lat;
  getEle("lon").innerHTML = "Longitude: "+ lon;
  getEle("humidity").innerHTML = "Humidity: "+ humidity;
  getEle("pressure").innerHTML = "Pressure: "+ pressure;
  getEle("speed").innerHTML = "Speed: "+ speed;


}




getUserGeoLocation().then(getWeatherInfo).catch(alert);
