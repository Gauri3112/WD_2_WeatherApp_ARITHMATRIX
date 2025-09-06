// -----------------------------
// Weather App (Immersive Layout)
// -----------------------------

const apiKey = "4d8fb5b93d4af21d66a2948710284366"; // replace with your own key
const currentUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const forecastUrlBase = "https://api.openweathermap.org/data/2.5/forecast?units=metric";

// DOM references
const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const weatherCard = document.getElementById("weatherCard");
const hourlySection = document.querySelector(".hourly-section");
const weatherIcon = document.querySelector(".weather-icon");
const cityElem = document.querySelector(".city");
const tempElem = document.querySelector(".temp");
const descElem = document.querySelector(".description");
const humidityElem = document.querySelector(".humidity");
const windElem = document.querySelector(".wind");
const lastUpdatedElem = document.querySelector(".last-updated");
const hourlyContainer = document.getElementById("hourlyUpdates");
const loader = document.getElementById("loader");
const messageBox = document.getElementById("message");
const backgroundContainer = document.getElementById("backgroundAnimation");

// state
let currentCondition = null;
let animationNodes = [];

// ---------------- Utilities ----------------
function showLoader(show = true) {
  loader.style.display = show ? "flex" : "none";
}
function showMessage(text = "", isError = false) {
  if (!text) {
    messageBox.style.display = "none";
    return;
  }
  messageBox.style.display = "block";
  messageBox.textContent = text;
  messageBox.style.background = isError ? "rgba(255,0,0,0.15)" : "rgba(0,0,0,0.25)";
}
function getIcon(main) {
  main = (main || "").toLowerCase();
  if (main.includes("cloud")) return "images/clouds.png";
  if (main.includes("rain")) return "images/rain.png";
  if (main.includes("drizzle")) return "images/drizzle.png";
  if (main.includes("mist")) return "images/mist.png";
  if (main.includes("snow")) return "images/snow.png";
  return "images/clear.png";
}
function formatLocalTime(offsetSeconds) {
  const now = new Date();
  const utc = now.getTime() + now.getTimezoneOffset() * 60000;
  return new Date(utc + offsetSeconds * 1000).toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  });
}

// ---------------- Background + Animations ----------------
function clearAnimations() {
  animationNodes.forEach(el => el.remove());
  animationNodes = [];
}
function setBackground(condition, offset = 0) {
  const c = condition.toLowerCase();
  if (c === currentCondition) return;
  currentCondition = c;
  clearAnimations();

  if (c.includes("rain") || c.includes("drizzle")) {
    document.body.style.background = "linear-gradient(180deg,#4e54c8,#8f94fb)";
    createRain();
  } else if (c.includes("snow")) {
    document.body.style.background = "linear-gradient(180deg,#e6e9f0,#eef1f5)";
    createSnow();
  } else if (c.includes("cloud")) {
    document.body.style.background = "linear-gradient(180deg,#606c88,#3f4c6b)";
  } else {
    document.body.style.background = "linear-gradient(180deg,#fceabb,#f8b500)";
    createSun();
  }
}
function createSun() {
  for (let i = 0; i < 10; i++) {
    const ray = document.createElement("div");
    ray.className = "sun-ray";
    ray.style.transform = `rotate(${i * 36}deg)`;
    backgroundContainer.appendChild(ray);
    animationNodes.push(ray);
  }
}
function createRain() {
  for (let i = 0; i < 40; i++) {
    const drop = document.createElement("div");
    drop.className = "raindrop";
    drop.style.left = `${Math.random() * 100}%`;
    drop.style.animationDuration = `${0.5 + Math.random()}s`;
    backgroundContainer.appendChild(drop);
    animationNodes.push(drop);
  }
}
function createSnow() {
  for (let i = 0; i < 25; i++) {
    const snow = document.createElement("div");
    snow.className = "snowflake";
    snow.textContent = ["❄", "❅", "❆"][Math.floor(Math.random() * 3)];
    snow.style.left = `${Math.random() * 100}%`;
    snow.style.animationDuration = `${2 + Math.random() * 3}s`;
    backgroundContainer.appendChild(snow);
    animationNodes.push(snow);
  }
}

// ---------------- Hourly Forecast ----------------
function buildHourly(list, offset) {
  hourlyContainer.innerHTML = "";
  list.slice(0, 8).forEach((item, idx) => {
    const local = new Date((item.dt + offset) * 1000);
    const time = local.toLocaleTimeString([], { hour: "numeric" });
    const temp = Math.round(item.main.temp);
    const icon = getIcon(item.weather[0].main);

    const card = document.createElement("div");
    card.className = "hour-card";
    if (idx === 0) card.classList.add("current");
    card.innerHTML = `
      <p>${time}</p>
      <img src="${icon}" alt="${item.weather[0].description}">
      <p>${temp}°C</p>
    `;
    hourlyContainer.appendChild(card);
  });
}

// ---------------- Fetch ----------------
async function fetchWeather(city) {
  showMessage("");
  showLoader(true);
  try {
    const resp = await fetch(`${currentUrl}${encodeURIComponent(city)}&appid=${apiKey}`);
    if (!resp.ok) throw new Error("City not found");
    const data = await resp.json();

    // Show sections once data is loaded
    weatherCard.style.display = "block";
    hourlySection.style.display = "block";

    cityElem.textContent = `${data.name}, ${data.sys.country}`;
    tempElem.textContent = `${Math.round(data.main.temp)}°C`;
    descElem.textContent = data.weather[0].description;
    humidityElem.textContent = `${data.main.humidity}%`;
    windElem.textContent = `${data.wind.speed} km/h`;
    weatherIcon.src = getIcon(data.weather[0].main);
    lastUpdatedElem.textContent = `Updated: ${new Date().toLocaleTimeString()} | City time: ${formatLocalTime(data.timezone)}`;

    setBackground(data.weather[0].main, data.timezone);
    fetchForecast(data.coord.lat, data.coord.lon, data.timezone);
  } catch (e) {
    console.error(e);
    showMessage("Could not load weather.", true);
  } finally {
    showLoader(false);
  }
}
async function fetchForecast(lat, lon, offset) {
  try {
    const resp = await fetch(`${forecastUrlBase}&lat=${lat}&lon=${lon}&appid=${apiKey}`);
    if (!resp.ok) return;
    const data = await resp.json();
    buildHourly(data.list, offset);
  } catch (e) {
    console.error(e);
  }
}

// ---------------- Events ----------------
searchBtn.addEventListener("click", e => {
  e.preventDefault();
  if (cityInput.value.trim()) fetchWeather(cityInput.value.trim());
});
cityInput.addEventListener("keyup", e => {
  if (e.key === "Enter" && cityInput.value.trim()) fetchWeather(cityInput.value.trim());
});

// ---------------- Initial ----------------
window.addEventListener("load", () => {
  // Hide weather + hourly sections initially
  weatherCard.style.display = "none";
  hourlySection.style.display = "none";
  showMessage("Search for a city to get started", false);
});
