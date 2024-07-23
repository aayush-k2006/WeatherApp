let input = document.getElementById("countryName");
input.addEventListener("keyup", (e) => {
  if (e.code === "Enter") {
    const location = document.getElementById("countryName").value;
    getData(location);
    getCordinates(location);
  }
});

let button = document.getElementById("btn");
button.addEventListener("click", () => {
  const location = document.getElementById("countryName").value;
  getData(location);
  getCordinates(location);
});

async function getData(location = "kathmandu") {
  try {
    let { lat, lon } = await getCordinates(location);
    let response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=6cad19972cf118b624587d46a1c406c2&units=metric`
    );
    let data = await response.json();
    console.log(data);
    const icon = document.getElementById("icon");
    document.querySelector(".condition").innerHTML = data.weather[0].main;
    document.querySelector("#cityName").innerHTML = data.name;
    document.querySelector(".temp").innerHTML =
      Math.round(data.main.temp) + "°C";

    document.getElementById("high").innerHTML =
      "H:" + Math.round(data.main.temp_max) + "°";
    document.getElementById("low").innerHTML =
      "L:" + Math.round(data.main.temp_min) + "°";

    if (data.weather[0].main == "Clouds") icon.src = "./images/clouds.png";
    else if (data.weather[0].main == "Clear") icon.src = "./images/clear.png";
    else if (data.weather[0].main == "Rain") icon.src = "./images/rain.png";
    else if (data.weather[0].main == "Drizzle") icon.src = "./images/drizzle.png";
    else if (data.weather[0].main == "Mist") icon.src = "./images/mist.png";
    
  } catch (error) {
    throw error;
  }
}

async function getCordinates(cityName = "Damak") {
  try {
    let response = await fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=6cad19972cf118b624587d46a1c406c2`
    );
    let data = await response.json();
    // console.log(data), "geo coordinates";
    let coordinates = {
      lat: data[0].lat,
      lon: data[0].lon,
      name: data[0].name,
    };
    return coordinates;
  } catch (error) {
    throw error;
  }
}

getCordinates();
getData();
