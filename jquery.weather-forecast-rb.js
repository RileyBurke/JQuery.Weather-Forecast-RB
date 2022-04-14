(function($) {
    $.fn.weatherForecast = function(options) {

        let settings = $.extend({
            openWeatherApiKey: null,
            geoLocation: false,
            forecast: true,
            units: "metric",
            tableColor: "rgba(0, 0, 0, 0)"
        }, options);

        return this.find( () => {
            this.css({
                "display": "block",
                "width": "300px",
                "height": "200px",
                "text-align": "center"
                });
            console.log(settings.geoLocation);

            let location;
            let html = `<div id="weather_display">
                <img src="images/icons/weather_unknown.png" id="current_icon" alt="Current Weather" height="128px"
                     width="128px">`;
            if (settings.forecast === true){
                html += `<span id="get_forecast"><a>+</a></span>`;
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
                    <form id="get_city">
                        <label for="city">City: </label>
                        <input type="text" id="city" name="city">
                            <input type="button" id="update_weather" name="update_weather" value="Go">
                    </form>
                </div>`;
                this.html(html);
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
                    console.log(currentWeather);
                    $("#current_icon").attr("src", currentWeather.weatherIconUrl);
                    $("#current_temperature").text(currentWeather.currentTemp.toFixed(0) + "\xB0" + tempUnit);
                    $("#geolocation_city").text(currentWeather.city);
                }else if(mode === "forecast") {
                    let html = `<table id="forecast_table" style=><th>Time</th><th>Icon</th><th>Temp</th><th>Wind</th>`;
                    for(let i = 4; i < 40; i += 4){
                        const weatherForecast = new WeatherForecast(json, i);
                        let windSpeed = weatherForecast.windSpeed;
                        if (!(windUnit === "MPH")){
                            windSpeed = (windSpeed * 3.6).toFixed(2); //Change M/S values to KM/H
                        }
                        console.log(weatherForecast);
                        html += `<span id="forecast${i}"><tr>
                            <td><span id="date_time${i}">${weatherForecast.dateTimeString}</span></td>
                            <td><img id="icon${i}" src="${weatherForecast.weatherIconUrl}" height="50px" width="50px"></td>
                            <td><span id="temp${i}">${weatherForecast.currentTemp}&#176;${tempUnit}</span></td>
                            <td><span id="wind${i}">${windSpeed}${windUnit}</span></td>
                            </tr></span><br>`
                    }
                    html += `</table>`;
                    $forecastDisplay.html(html);
                    $("#forecast_table").css({
                        "margin-left": "auto",
                        "margin-right": "auto"
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
                }
            }

            function getWeatherInfo(location) {
                const api_key = settings.openWeatherApiKey;
                const api_url_current_weather = "https://api.openweathermap.org/data/2.5/weather?" + location + "&appid=" + api_key + "&units=" + settings.units;
                const api_url_weather_forecast = "https://api.openweathermap.org/data/2.5/forecast?" + location + "&appid=" + api_key + "&units=" + settings.units;

                if (settings.forecast === true){
                    console.log(api_url_weather_forecast);
                    console.log(api_url_current_weather);
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
                }else if (location === "GEOLOCATION OFF"){
                    alert("Geolocation is currently turned off. Cannot retrieve weather.")
                    $("#current_icon").attr("src", "images/icons/weather_unknown.png");
                    $("#geolocation_city").text("Geolocation failed.");
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

            function getLocation() {
                if (navigator.geolocation) {
                    console.log("Locating...");
                    return new Promise((getPosition) => {
                        navigator.geolocation.getCurrentPosition(getPosition)});
                }else{
                    alert("Geolocation not supported by browser.");
                    return null;
                }
            }

            async function geoLocate(){
                let position = await getLocation();
                if (!position.ok){
                    console.log(position);
                    let latitude = position.coords.latitude;
                    console.log(latitude);
                    let longitude = position.coords.longitude;
                    console.log(longitude);
                    console.log("lat=" + latitude.toString() + "&lon=" + longitude.toString());
                    return ("lat=" + latitude.toString() + "&lon=" + longitude.toString());
                }else{
                    return "GEOLOCATION OFF";
                }
            }

            let $forecastDisplay, $closeButton;
            if (settings.forecast) {
                setForecastDisplayProperties();
                setCloseButtonProperties();
                $(this).find('#get_forecast').on("click", function(event){
                    console.log($("#current_temperature").text())
                    if ((!($("#city").val() === "") && !settings.geoLocation) || (!($("#city_geolocation").val() === "") && settings.geoLocation)
                    || ($("#current_temperature").text() !== "Invalid city")){
                        $forecastDisplay.show();
                        console.log("Display forecast");
                    }
                });
            }

            $(this).find('#update_weather').on("click", function(event) {
                event.preventDefault();
                if (settings.geoLocation === false){
                    location = "q=" + $("#city").val();
                }
                console.log(location);
                console.log("test");
                getWeatherInfo(location, "weather");
            });

            function setForecastDisplayProperties() {
                $forecastDisplay = $('<div></div>');
                $forecastDisplay.css({
                    "display": "none",
                    "text-align": "center",
                    "position": "absolute",
                    "width": "100%",
                    "top": "0px",
                    "left": "0px",
                    "height": "100%",
                    "vertical-align": "middle"
                });
                $("body").append($forecastDisplay);
            }

            function setCloseButtonProperties() {
                let properties = {
                    "color": "black",
                    "cursor": "pointer",
                    "font-size": "20px",
                    "position": "absolute",
                    "top": "5px",
                    "right": "5px",
                    "border": "0px",
                    "z-index": "1"
                }
                $closeButton = $('<span>X</span>');
                $closeButton.css(properties);
                $forecastDisplay.append($closeButton);
            }
        });
    }
} (jQuery));

