# JQuery-Weather-Forecast-RB
 
Simple weather app using OpenWeatherMap API to get the weather and/or forecast for a given location.

![image](https://user-images.githubusercontent.com/90390132/163441233-b9d959ea-1dd5-44c5-a140-bb9885d02d6d.png)

To get the current weather type in the name of a city and press the go button. The icon and weather will then update.

![image](https://user-images.githubusercontent.com/90390132/163444659-93cfdd82-b5ab-4a9c-a8cf-f67014043116.png)

If the forecast option is enabled you can then press + to open a display of the weather forecast for the next 5 days. You can close this display by clicking the X button in the top right of the webpage. You can change cities and display forecasts as many times as you would like.

![image](https://user-images.githubusercontent.com/90390132/163444203-0ae334c9-aad3-41d0-b34c-154e456c2cf0.png)

There is also an option to use geolocation instead. If this is enabled and you allow the page to access your location the city and weather information will automatically populate.

![image](https://user-images.githubusercontent.com/90390132/163447925-6a87da24-d52a-49f0-8254-5f98e3fde482.png)



## Installation

To set up the plugin simply add an empty div element with an id of open_weather to the body of your HTML file, along with the JavaScript/jQuery files in the following order:
- The jQuery file.
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


Once your HTML is set up correctly you can call the plugin in your JavaScript files like so:
```javascript
$("#open_weather").weatherForecast({

//CUSTOM OPTIONS HERE
 
)};
```

In order to use this plugin you will need to make an account and acquire an API key from OpenWeatherMap: https://openweathermap.org/
For demonstration and testing purposes an API key will be provided in my demo app.js files settings. By running the demo HTML file index.html with this you can test the customization options and functionality of the plugin. The settings given in this file are only used for demonstration and are not necessarily the default values.


## Customization
There are many options for customization provided. Listed below is an explanation of each along with their default values:
```javascript
openWeatherApiKey: null, //An API key from OpenWeatherMap required for the plugin to get the weather information.
geoLocation: false, //If enabled derives a location and the weather from the users position data instead of entering a location manually.
forecast: true, //If enabled a clickable + symbol can be used to pop open a table containing forecast information.
units: "metric", //Metric or imperial units.
tableColor: "rgba(255, 255, 255, .6)", //The background color of the forecast table and close button.
openForecastDisplay: "null", //Your own function to be called upon opening the forecast table.
closeForecastDisplay: "null", //Your own function to be called upon closing the forecast table.
borderStyle: "solid", //The style of the border around the plugin div should you choose to use one.
borderWidth: "0px", //The width of the border around the plugin div should you choose to use one.
borderColor: "black", //The color of the border around the plugin div should you choose to use one.
pluginColor: "rgba(255, 255, 255, .0)", //The color of the background of the plugin div element.
tableTextColor: "navy" //The color of the text within the forecast table. 
closeButtonColor: "black", //The color of the closeButton text.
closeButtonBorder: "2px solid black" //The settings for the border of the close button.
pluginTextColor: "black", //The color of the text in the plugin div.
pluginTextFont: "times new roman", //The font used by the text in the plugin div.
tableTextFont: "times new roman" //The font used by the text in the forecast table.
```
