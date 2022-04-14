(function($) {
    $.fn.weatherForecast = function(options) {

        let settings = $.extend({
            openWeatherApiKey: null,
            geoLocation: false,
            forecast: true,
            units: "metric",
            tableColor: "rgba(255, 255, 255, .6)",
            openForecastDisplay: "null",
            closeForecastDisplay: "null",
            borderStyle: "solid",
            borderWidth: "0px",
            borderColor: "black",
            pluginColor: "rgba(255, 255, 255, .0)",
            tableTextColor: "black",
            closeButtonColor: "black",
            closeButtonBorder: "2px solid black",
            pluginTextColor: "black",
            pluginTextFont: "times new roman",
            tableTextFont: "times new roman"
        }, options);

        return this.find( () => {
            this.css({
                "display": "block",
                "width": "300px",
                "height": "200px",
                "text-align": "center",
                "padding": "20px",
                "border-style": settings.borderStyle,
                "border-width": settings.borderWidth,
                "border-color": settings.borderColor,
                "background-color": settings.pluginColor,
                "color": settings.pluginTextColor,
                "font-family": settings.pluginTextFont
                });

            let location;
            let tableDisplayed = true;
            let html = `<div id="weather_display">
                <img src="images/icons/weather_unknown.png" id="current_icon" alt="Current Weather" height="128px"
                     width="128px">`;
            if (settings.forecast === true){
                html += `<span id="get_forecast"></span>`;
            }
            if (settings.geoLocation === true){
                console.log("Geolocation ON")
                geoLocate().then(r => getWeatherInfo(r))
                $("#update_weather").click();

                html += `<br><span id="current_temperature"></span><br><br><span id="geolocation_city"></span></div>`
                this.html(html);
            }else{
                 html+= `<br><span id="current_temperature"></span>
                <br><br>
                <label for="city">City: </label>
                <input type="text" id="city" name="city">
                <input type="button" id="update_weather" name="update_weather" value="Go">
                </div>`;
                this.html(html);
            }

            $(this).find('#update_weather').on("click", function(event) {
                event.preventDefault();
                if (settings.geoLocation === false){
                    location = "q=" + $("#city").val();
                }
                getWeatherInfo(location, "weather");
            });

            function getWeatherInfo(location) {
                const api_key = settings.openWeatherApiKey;
                const api_url_current_weather = "https://api.openweathermap.org/data/2.5/weather?" + location + "&appid=" + api_key + "&units=" + settings.units;
                const api_url_weather_forecast = "https://api.openweathermap.org/data/2.5/forecast?" + location + "&appid=" + api_key + "&units=" + settings.units;
                if (location === "GEOLOCATION OFF"){
                    alert("Geolocation is currently turned off. Cannot retrieve weather.")
                    $("#current_icon").attr("src", "images/icons/weather_unknown.png");
                    $("#geolocation_city").text("Geolocation failed.");
                }else if (settings.forecast === true){
                    fetch(api_url_weather_forecast)
                        .then(response => response.json())
                        .then(json => getWeatherData(json, "forecast"))
                        .catch(e => console.log(e.message));
                    fetch(api_url_current_weather)
                        .then(response => response.json())
                        .then(json => getWeatherData(json, "weather"))
                        .catch( () => {
                            $("#current_icon").attr("src", "images/icons/weather_unknown.png");
                            $("#current_temperature").text("Invalid city");
                        });
                }else{
                    fetch(api_url_current_weather)
                        .then(response => response.json())
                        .then(json => getWeatherData(json, "weather"))
                        .catch( () => {
                            $("#current_icon").attr("src", "images/icons/weather_unknown.png");
                            $("#current_temperature").text("Invalid city");
                        });
                }
            }

            function getWeatherData(json, mode){
                let tempUnit = "K";
                let windUnit = "KM/H";
                if (settings.units === "metric"){
                    tempUnit = "C";
                }else if(settings.units === "imperial"){
                    tempUnit = "F";
                    windUnit = "MPH";
                }
                if (mode === "weather"){
                    const currentWeather = new CurrentWeather(json);
                    $("#current_icon").attr("src", currentWeather.weatherIconUrl);
                    $("#current_temperature").text(currentWeather.currentTemp.toFixed(0) + "\xB0" + tempUnit);
                    $("#geolocation_city").text(currentWeather.city);
                }else if(mode === "forecast") {
                    if (tableDisplayed) {
                    let html = `<table id="forecast_table" style=><tr><th id="table_title" colspan="4"></th></tr><tr><th>Time</th><th></th><th>Temp</th><th>Wind</th></tr>`;
                    for(let i = 4; i < 40; i += 4){
                        const weatherForecast = new WeatherForecast(json, i);
                        let windSpeed = weatherForecast.windSpeed;
                        if (!(windUnit === "MPH")){
                            windSpeed = (windSpeed * 3.6).toFixed(2); //Changes M/S values to KM/H
                        }
                        html += `<tr>
                            <td><span id="date_time${i}">${weatherForecast.dateTimeString}</span></td>
                            <td><img id="icon${i}" src="${weatherForecast.weatherIconUrl}" height="50px" width="50px"></td>
                            <td><span id="temp${i}">${weatherForecast.currentTemp}&#176;${tempUnit}</span></td>
                            <td><span id="wind${i}">${windSpeed}${windUnit}</span></td>
                            </tr>`
                    }
                    html += `</table>`;
                    $forecastDisplay.append(html);

                    $("#forecast_table").css({
                        "margin-left": "auto",
                        "margin-right": "auto",
                        "display": "inline-block",
                        "margin-top": "10px",
                        "color": settings.tableTextColor,
                        "font-family": settings.tableTextFont
                    });
                    $("td, th").css({
                        "padding-left": "10px",
                        "padding-right": "10px"
                    });
                    $("tr, table").css({
                        "border": "solid",
                        "border-width": "1px",
                        "border-collapse": "collapse",
                        "background-color": settings.tableColor
                    });
                    if (settings.geoLocation){
                        $("#table_title").text($("#geolocation_city").text());
                    }else{
                        $("#table_title").text($("#city").val());
                    }
                    $("#table_title").css({
                        "font-size": "25px",
                        "padding-top": "5px",
                        "padding-bottom": "5px"
                    })
                    tableDisplayed = false;

                }else{
                        for(let i = 4; i < 40; i += 4){
                            const weatherForecast = new WeatherForecast(json, i);
                            let windSpeed = weatherForecast.windSpeed;
                            if (!(windUnit === "MPH")){
                                windSpeed = (windSpeed * 3.6).toFixed(2); //Changes M/S values to KM/H
                            }
                            $("#table_title").text(weatherForecast.city);
                            $(`#date_time${i}`).text(weatherForecast.dateTimeString);
                            $(`#icon${i}`).attr("src", weatherForecast.weatherIconUrl);
                            let tempDisplayed = weatherForecast.currentTemp + "\xB0" + tempUnit;
                            $(`#temp${i}`).text(tempDisplayed);
                            let windDisplayed = windSpeed + windUnit;
                            $(`#wind${i}`).text(windDisplayed);
                        }
                    }
                }
            }

            async function geoLocate(){
                let position = await getLocation();
                if (position !== null){
                    let latitude = position.coords.latitude;
                    let longitude = position.coords.longitude;
                    return ("lat=" + latitude.toString() + "&lon=" + longitude.toString());
                }else{
                    console.log("Geolocation OFF.")
                    return "GEOLOCATION OFF";
                }
            }

            function getLocation() {
                if (navigator.geolocation) {
                    console.log("Locating...");
                    return new Promise((getPosition) => {
                        navigator.geolocation.getCurrentPosition(getPosition, showError)});
                }else{
                    alert("Geolocation not supported by browser.");
                    return null;
                }
            }

            function showError(error) {
                switch(error.code) {
                    case error.PERMISSION_DENIED:
                        $("#geolocation_city").text("Geolocation failed.");
                        alert("User denied the request for Geolocation.");
                        break;
                    case error.POSITION_UNAVAILABLE:
                        $("#geolocation_city").text("Geolocation failed.");
                        alert("Location information is unavailable.");
                        break;
                    case error.TIMEOUT:
                        $("#geolocation_city").text("Geolocation failed.");
                        alert("The request to get user location timed out.");
                        break;
                }
            }

            let $forecastButton, $forecastDisplay, $closeButton;
            if (settings.forecast) {
                setForecastButtonProperties();
                setForecastDisplayProperties();
                setCloseButtonProperties();
                $(this).find('#get_forecast').on("click", function(){
                    if (((!($("#city").val() === "") && !settings.geoLocation) || (!($("#city_geolocation").val() === "") && settings.geoLocation))
                        && (!($("#current_icon").attr("src") === "images/icons/weather_unknown.png")) && (($("#current_temperature").text() !== ""))){

                        if($.isFunction(settings.openForecastDisplay)) {
                            settings.openForecastDisplay.call(this);
                        }

                        $forecastDisplay.show();
                    }
                });
            }

            function setForecastButtonProperties(){
                $forecastButton = $('<a>+</a>');
                $forecastButton.css({
                    "font-size": "40px",
                    "padding-left": "10px",
                    "cursor": "pointer"
                });
                $("#get_forecast").append($forecastButton);

            }

            function setForecastDisplayProperties() {
                $forecastDisplay = $('<div></div>');
                $forecastDisplay.css({
                    "background": "rgba(0, 0, 0, 0.5)",
                    "display": "none",
                    "text-align": "center",
                    "position": "absolute",
                    "width": "100%",
                    "height": "100vh",
                    "top": "0px",
                    "left": "0px",
                    "padding-top": "10%",
                    "z-index": "1"
                });
                $("body").append($forecastDisplay);
            }

            function setCloseButtonProperties() {
                let properties = {
                    "color": settings.closeButtonColor,
                    "cursor": "pointer",
                    "font-size": "50px",
                    "position": "fixed",
                    "top": "10px",
                    "right": "25px",
                    "border": settings.closeButtonBorder,
                    "padding-left": "4px",
                    "padding-right": "4px",
                    "z-index": "2",
                    "background": settings.tableColor,
                }
                $closeButton = $('<span id="close">X</span>');
                $closeButton.css(properties);
                $forecastDisplay.append($closeButton);
            }

            $closeButton.click(function () {
                if($.isFunction(settings.closeForecastDisplay)) {
                    settings.closeForecastDisplay.call(this);
                }

                $forecastDisplay.hide();
            })

        });
    }
} (jQuery));

