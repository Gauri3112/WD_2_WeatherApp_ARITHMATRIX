# Weather App

A beautiful and responsive weather application built with HTML, CSS, and JavaScript that displays current weather information for any city worldwide.

## Features

- 🌤️ Real-time weather data from OpenWeatherMap API
- 🎨 Modern, responsive design with gradient background
- 🔍 Search functionality with both click and Enter key support
- 🌍 **NEW: Dropdown with 50+ world cities organized by region**
- 📊 Displays temperature, humidity, and wind speed
- 🌦️ Dynamic weather icons based on current conditions
- ❌ Error handling for invalid city names
- 📱 Mobile-friendly responsive design
- ⌨️ Type city names or select from dropdown

## Setup Instructions

1. **Get an API Key**
   - Visit [OpenWeatherMap](https://openweathermap.org/api)
   - Sign up for a free account
   - Generate an API key

2. **Configure the API Key**
   - Open `script.js`
   - Replace `YOUR_API_KEY` with your actual OpenWeatherMap API key
   - Save the file

3. **Run the Application**
   - Open `index.html` in your web browser
   - Start searching for weather information!

## Usage

1. **Type a city name** in the search box, OR
2. **Select a city** from the dropdown menu organized by regions
3. Click the search button or press Enter
4. View the current weather conditions including:
   - Temperature in Celsius
   - City name
   - Humidity percentage
   - Wind speed in km/h
   - Weather icon representing current conditions

## 🌍 Available Cities

The app includes a comprehensive dropdown with 50+ cities organized by region:

### Major Cities
- London, UK
- New York, USA
- Tokyo, Japan
- Paris, France
- Mumbai, India
- Sydney, Australia
- Dubai, UAE
- Singapore

### European Cities
- Berlin, Germany
- Rome, Italy
- Madrid, Spain
- Amsterdam, Netherlands
- Vienna, Austria
- Prague, Czech Republic
- Stockholm, Sweden
- Copenhagen, Denmark

### Asian Cities
- Beijing, China
- Shanghai, China
- Seoul, South Korea
- Bangkok, Thailand
- Jakarta, Indonesia
- Manila, Philippines
- Kuala Lumpur, Malaysia
- Hong Kong

### American Cities
- Los Angeles, USA
- Chicago, USA
- Toronto, Canada
- Vancouver, Canada
- Mexico City, Mexico
- São Paulo, Brazil
- Buenos Aires, Argentina
- Lima, Peru

### African Cities
- Cairo, Egypt
- Lagos, Nigeria
- Johannesburg, South Africa
- Cape Town, South Africa
- Nairobi, Kenya
- Casablanca, Morocco
- Tunis, Tunisia
- Accra, Ghana

### Middle Eastern Cities
- Istanbul, Turkey
- Tehran, Iran
- Riyadh, Saudi Arabia
- Doha, Qatar
- Kuwait City, Kuwait
- Beirut, Lebanon
- Tel Aviv, Israel
- Baghdad, Iraq

### Oceanic Cities
- Melbourne, Australia
- Auckland, New Zealand
- Wellington, New Zealand
- Honolulu, Hawaii
- Fiji
- Tahiti, French Polynesia

### 🌐 Additional Cities
You can also search for any other city worldwide by typing its name in the search box. The app supports cities from all countries and regions!

## Weather Icons

The app includes weather icons for:
- ☀️ Clear skies
- ☁️ Clouds
- 🌧️ Rain
- 🌦️ Drizzle
- 🌫️ Mist
- ❄️ Snow

## File Structure

```
WD_2_WeatherApp_ARITHMATRIX/
├── index.html          # Main HTML file
├── style.css           # CSS styles
├── script.js           # JavaScript functionality
├── README.md           # This file
└── images/             # Weather icons
    ├── clear.png
    ├── clouds.png
    ├── drizzle.png
    ├── humidity.png
    ├── mist.png
    ├── rain.png
    ├── search.png
    ├── snow.png
    └── wind.png
```

## Technologies Used

- HTML5
- CSS3 (with Flexbox)
- JavaScript (ES6+)
- OpenWeatherMap API

## Browser Support

This app works on all modern browsers including:
- Chrome
- Firefox
- Safari
- Edge

## Notes

- The app requires an internet connection to fetch weather data
- API calls are limited by your OpenWeatherMap plan
- The design is optimized for light mode only as per user preference
