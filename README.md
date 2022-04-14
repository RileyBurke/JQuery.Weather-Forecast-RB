# JQuery-Weather-Forecast-RB
 
Simple weather app using OpenWeatherMap API to get the weather and/or forecast for a given location.

![image](https://user-images.githubusercontent.com/90390132/163441233-b9d959ea-1dd5-44c5-a140-bb9885d02d6d.png)

![image](https://user-images.githubusercontent.com/90390132/163441427-68ef0eb3-f77d-43dc-95ea-e9da88100296.png)


## Installation

To set up add an empty div with an id of open_weather to your html, along with the script files in the following order:
- The JQuery file.
- lib_weather.js
- jquery.weather-forecast-rb.js
- Your own javascript files.

```html
<div id="open_weather"></div>
<script src="jquery-3.6.0.js"></script>
<script src="lib_weather.js"></script>
<script src="jquery.weather-forecast-rb.js"></script>
<script src="app.js"></script>
```


Once your html is set up you can call the plugin in your javascript file like so:
```javascript
$("#open_weather").weatherForecast({

//CUSTOM OPTIONS HERE
 
)};
```

In order to use this plugin you will need to make an account and acquire an API key from OpenWeatherMap: https://openweathermap.org/
For demonstration and testing purposes an api key will be provided in my demo app.js files settings. By running the demo html file index.html with this you can test the customization options and functionality of the plugin.


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
