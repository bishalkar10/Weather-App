const searchBox = document.querySelector("input");
const searchButton = document.getElementById("search-button");
let errorMessage = document.getElementById("errorMessage");
const city = document.getElementById("city");
const sky = document.getElementById("sky");
const currentTemp = document.getElementById("curr-temp");
const feelsLike = document.getElementById("feels-like");
const celcius = document.getElementById("celcius");
const apiKey = "e06c1f534fffdea7117dd966f5ca6575"; //don't use my api key. okay!

async function getWeatherData(cityName) {
  try {
    const data = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`
    );
    const response = await data.json();
    if (response.cod === "404") {
      throw new Error("City not found");
    }
    return response;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
}

function capitalize(string) {
  let str_list = string.split(" ");
  str_list = str_list.map((str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  });
  return str_list.join(" ");
}
function kelvinToCelcius(number) {
  const result = number - 273;
  return Number.isInteger(result) ? result.toFixed(0) : result.toFixed(0);
}
function display(response) {
  try {
    // if it was valid query then clear the error message and display the weather stats
    errorMessage.innerText = "";
    city.innerText = response.name.toUpperCase();
    currentTemp.innerText = kelvinToCelcius(response.main.temp);
    celcius.innerText = "℃";
    sky.innerText = capitalize(response.weather[0].description);
    feelsLike.innerText = `Feels Like ${kelvinToCelcius(
      response.main.feels_like
    )}°C`;
  } catch (error) {
    // catch the error message and clear the screen
    console.log(error.message);
    city.innerText = "";
    currentTemp.innerText = "";
    celcius.innerText = "";
    sky.innerText = "";
    feelsLike.innerText = "";
  }
}

searchButton.addEventListener("click", async () => {
  const cityName = searchBox.value;
  // if city name is empty, then display the error message
  if (cityName.trim() === "") {
    errorMessage.innerText = "Please Enter a valid City name";
    // and clear the screen if you have a search result on the screen
    city.innerText = "";
    sky.innerText = "";
    currentTemp.innerText = "";
    feelsLike.innerText = "";
    celcius.innerText = "";
    return;
  }
  try {
    const response = await getWeatherData(cityName);
    display(response);
  } catch (error) {
    //catch the error and if the 'City not found' error, then clear the screen and display the error message
    // console.log(error.message)
    if (error.message === "City not found") {
      // console.log(error.message)
      city.innerText = "";
      sky.innerText = "";
      currentTemp.innerText = "";
      feelsLike.innerText = "";
      celcius.innerText = "";
      errorMessage.innerText = "City not found. Please enter a valid City name";
    }
  }
});
