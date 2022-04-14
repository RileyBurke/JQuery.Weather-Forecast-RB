# JQuery-Weather-Forecast-RB
 
Simple weather app using OpenWeatherMap API to get the weather and/or forecast for a given location.

## Installation

To set up add an empty div with an id of open_weather to your html, along with the script files in the following order:
- The JQuery file.
- lib_weather.js
- jquery.weather-forecast-rb.js
- Your own javascript files.

Once your html is set up you can call the plugin in your javascript file like so:
```javascript
$("#open_weather").weatherForecast({

(CUSTOM OPTIONS HERE)
 
)};
```

## Customization
There are many options for customization listed below along with their default values and an explanation of each:
```javascript
openWeatherApiKey: null, //An API key from OpenWeatherMap required for the plugin to get the weather information.
geoLocation: false, //If enabled derives a location and the weather from the users position data instead of entering a location manually.
forecast: true, //If enabled a clickable + symbol can be used to pop open a table containing forecast information.
units: "metric", //Metric or imperial units.
tableColor: "rgba(255, 255, 255, .6)", //The color of the forecast table.
openForecastDisplay: "null", //Your own function to be called upon opening the forecast table.
closeForecastDisplay: "null", //Your own function to be called upon closing the forecast table.
borderStyle: "solid", //The style of the border around the plugin div should you choose to use one.
borderWidth: "0px", //The width of the border around the plugin div should you choose to use one.
borderColor: "black", //The color of the border around the plugin div should you choose to use one.
pluginColor: "rgba(255, 255, 255, .0)", //The color of the background of the plugin div element.
tableTextColor: "navy" //The color of the text within the forecast table. 
```
