//Api + URL

const apiKey = "Use your API here"; 
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

//City Name Date & Time + it's container
const cityName = document.querySelector(".cityName");
const nameCity = document.querySelector("#city");
const date = document.querySelector("#date");
const time = document.querySelector("#time");

//Result container
const result = document.querySelector(".result");

//Weather Details (Temp, humidity, windSp, feelsLike)
const temp = document.querySelector("#temp");
const humidity = document.querySelector("#humidity");
const wind = document.querySelector("#wind");
const feels = document.querySelector("#feels");

//Search Input and Button
const input = document.querySelector(".searchIn");
const searchBtn = document.querySelector(".searchBtn");

//Icons for Temp, humidity and windSp
const tempIcon = document.querySelector(".tempIcon");
const humidityIcon = document.querySelector(".humidityIcon");
const windSpIcon = document.querySelector(".windSpIcon");

//Description of weather
const des = document.querySelector("#des");

//Even listeners for search button 
searchBtn.addEventListener("click", () => {
  const city = input.value.trim();
  if (city != "") {
    getWeather(city);
  }
});

// Even listener for Enter key in search input
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const city = input.value.trim();
    if (city !== "") {
      getWeather(city);
    }
  }
});

//Main function to fetch weather data
async function getWeather(city) {
  const url = `${apiUrl}${city}&appid=${apiKey}`;

  //it'll try to fetch the data form the API and if it fails, it'll catch an error
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("City not found");
    }

    //It'll catch the data in form of JSON and then we can extract the required data from it 
    const data = await response.json();
    console.log(data);

    //Extracting the required data form JSON like tempValue, humidityValue etc.
    const tempValue = data.main.temp;
    const humidityValue = data.main.humidity;
    const windValue = data.wind.speed;
    const feelsLikeValue = data.main.feels_like;
    const weatherMain = data.weather[0].main;
    const iconCode = data.weather[0].icon;

    //Making everything that was hidden cuz of error, visible again :)
    result.style.display = "grid";
    cityName.style.display = "block";
    tempIcon.display = "block";
    feels.style.display = "block";
    tempIcon.style.display = "block";
    humidityIcon.style.display = "block";
    windSpIcon.style.display = "block";
    des.style.display = "block";
    tempIcon.style.display = "block";

    //Setting the time and date from the JSON and converting it to representable format
    const utcSeconds = data.dt;
    const timezoneOffset = data.timezone; // in seconds

    const localTime = new Date((utcSeconds + timezoneOffset) * 1000);

    const optionsDate = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "UTC",
    };

    const optionsTime = {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
      timeZone: "UTC",
    };

    //Setting the innerHTMl (text) of the elements to the extracted data
    temp.innerHTML = `Temperature: ${tempValue}°C`;
    humidity.innerHTML = `Humidity: ${humidityValue}%`;
    wind.innerHTML = `Wind Speed: ${windValue} m/s`;
    feels.innerHTML = `Feels like: ${feelsLikeValue}°C`;
    des.innerHTML = `${data.weather[0].description}`;
    nameCity.innerHTML = `${data.name}, ${data.sys.country}`;
    date.innerHTML = new Intl.DateTimeFormat("en-US", optionsDate).format(
      localTime
    );
    time.innerHTML = new Intl.DateTimeFormat("en-US", optionsTime).format(
      localTime
    );

    //Resetting the position of main temperature 
    temp.style.position = "";
    temp.style.right = "";
    temp.style.bottom = "";

    //Switch case for handeling icons based on the weather condition
    switch (iconCode) {
      case "01d":
        tempIcon.src = "assets/sunny.png";
        break;
      case "01n":
        tempIcon.src = "assets/night.png";
        break;
      case "02d":
        tempIcon.src = "assets/fewCloudsDay.png";
        break;
      case "02n":
        tempIcon.src = "assets/fewCloudsNight.png";
        break;
      case "03d":
        tempIcon.src = "assets/cloudyDay.png";
        break;
      case "03n":
        tempIcon.src = "assets/cloudyNight.png";
        break;
      case "04d":
        tempIcon.src = "assets/cloudyDay.png";
        break;
      case "04n":
        tempIcon.src = "assets/cloudyNight.png";
        break;
      case "09d":
        tempIcon.src = "assets/rainyDay.png";
        break;
      case "09n":
        tempIcon.src = "assets/rainyNight.png";
        break;
      case "10d":
        tempIcon.src = "assets/lightRainDay.png";
        break;
      case "10n":
        tempIcon.src = "assets/lightRainNight.png";
        break;
      case "11d":
        tempIcon.src = "assets/thunder.png";
        break;
      case "11n":
        tempIcon.src = "assets/thunder.png";
        break;
      case "13d":
        tempIcon.src = "assets/snow.png";
        break;
      case "13n":
        tempIcon.src = "assets/snow.png";
        break;
      case "50d":
        tempIcon.src = "assets/foggy.png";
        break;
      case "50n":
        tempIcon.src = "assets/foggy.png";
        break;
      default:
        tempIcon.src = ""; 
        break;
    }

    //Setting humidity icons same way as temp icons
    if (humidityValue < 30) {
      humidityIcon.src = "assets/dry.png";
    } else if (humidityValue >= 30 && humidityValue <= 60) {
      humidityIcon.src = "assets/moderateHumidity.png";
    } else if (humidityValue > 60) {
      humidityIcon.src = "assets/humid.png";
    }

    //Setting windSp icons
    if (windValue < 5) {
      windSpIcon.src = "assets/lowWind.png";
    } else if (windValue >= 5 && windValue <= 15) {
      windSpIcon.src = "assets/moderateWind.png";
    } else if (windValue > 15) {
      windSpIcon.src = "assets/heavyWind.png";
    }

    // Previous approach using weather description for icons was overly complex and didn't scale well.

    // if(description == "clear sky" && isDay){
    //     tempIcon.src = "sunny.png";
    // }else if(description == "clear sky" && !isDay){
    //     tempIcon.src = "night.png";
    // }else if(description == "few clouds" && isDay){
    //     tempIcon.src = "fewCloudsDay.png";
    // }else if(description == "few clouds" && !isDay){
    //     tempIcon.src = "fewCloudsNight.png";
    // }else if(description == "scattered clouds" || description == "overcast clouds" && isDay){
    //     tempIcon.src = "cloudyDay.png";
    // }else if(description == "scattered clouds" || description == "overcast clouds" && !isDay){
    //     tempIcon.src = "cloudyNight.png";
    // }else if(description == "broken clouds" && isDay){
    //     tempIcon.src = "cloudyDay.png";
    // }else if(description == "broken clouds" && !isDay){
    //     tempIcon.src = "cloudyNight.png";
    // }else if(description == "shower rain" && isDay){
    //     tempIcon.src = "rainyDay.png";
    // }else if(description == "shower rain" && !isDay){
    //     tempIcon.src = "rainyNight.png";
    // }else if(description == "rain" && isDay){
    //     tempIcon.src = "lightRainDay.png";
    // }else if(description == "rain" && !isDay){
    //     tempIcon.src = "lightRainNight.png";
    // }else if(description == "thunderstorm"){
    //     tempIcon.src = "thunder.png";
    // }else if(description == "snow"){
    //     tempIcon.src = "snow.png";
    // }else if(description == "mist" || description == "haze" || description == "fog"){
    //     tempIcon.src = "foggy.png";
    // }

    //Catching the error if the city is not found it'll throw an error and its for error handling so that
    //it will display "Invalid City" instead of crashing the app

  } catch (err) {

    //Making everything that was visible, hidden again cuz of error
    console.error(err);
    result.style.display = "grid";
    temp.innerHTML = "Invalid City";
    humidity.innerHTML = "Invalid City";
    wind.innerHTML = "Invalid City";
    tempIcon.style.display = "none";
    feels.style.display = "none";
    tempIcon.style.display = "none";
    humidityIcon.style.display = "none";
    windSpIcon.style.display = "none";
    des.style.display = "none";
    tempIcon.style.display = "none";

    temp.style.position = "relative";
    temp.style.right = "120%";
    temp.style.bottom = "52%";

    cityName.style.display = "none";

  }
}
