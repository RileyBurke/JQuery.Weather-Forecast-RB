"use strict"

$("body").css({
    "background-color": "cyan"
});

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
    borderColor: "red",
    pluginColor: "rgba(216, 191, 216, .5)",
    tableTextColor: "navy",
    closeButtonColor: "red",
    closeButtonBorder: "2px solid green",
    pluginTextFont: "arial",
    tableTextFont: "arial"
});
