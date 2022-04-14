"use strict"

$("#open_weather").weatherForecast({
    openWeatherApiKey: "adcf237fa5811f92e8a66288993e9335",
    geoLocation: false,
    forecast: true,
    openForecastDisplay: function(){
        console.log("Test open display.")
    },
    closeForecastDisplay: function(){
        console.log("Test close display.")
    },
    borderStyle: "dashed",
    borderWidth: "1px",
    borderColor: "red"
});
