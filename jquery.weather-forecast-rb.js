(function($) {
    $.fn.weatherForecast = function(options) {

        let settings = $.extend({
            openWeatherApiKey: null,
            geoLocation: false,
            forecast: true,
            units: "metric",
            iconSet: 0
        }, options);

        return this.each( () => {
            this.css({
                "display": "block",
                "width": "300px",
                "height": "200px",
                "text-align": "center"
                });
            console.log(settings.geoLocation);


            let location;
            if (settings.geoLocation === true){
                console.log("Geolocation ON")
                geoLocate().then(r => getWeatherInfo(r))
                $("#get_city").hide();
                $("#update_weather").click();
            }


            function getWeatherData(json, mode){
                let tempUnit = "K";
                if (settings.units === "metric"){
                    tempUnit = "C";
                }else if(settings.units === "imperial"){
                    tempUnit = "F";
                }
                if (mode === "weather"){
                    const currentWeather = new CurrentWeather(json);
                    console.log(currentWeather);
                    $("#current_icon").attr("src", currentWeather.weatherIconUrl);
                    $("#current_temperature").text(currentWeather.currentTemp.toFixed(0) + "\xB0" + tempUnit);
                }else if(mode === "forecast"){
                    for(let i = 4; i < 40; i += 4){
                        const weatherForecast = new WeatherForecast(json, i);
                        console.log(weatherForecast);
                    }

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
                    return "00000000000";
                }
            }


            async function geoLocate(){
                let position = await getLocation();
                console.log(position);
                let latitude = position.coords.latitude;
                console.log(latitude);
                let longitude = position.coords.longitude;
                console.log(longitude);
                console.log("lat=" + latitude.toString() + "&lon=" + longitude.toString());
                return ("lat=" + latitude.toString() + "&lon=" + longitude.toString());
            }


            let $forecastDisplay, $dailyForecast, $closeButton;
            if (settings.forecast) {
                setForecastDisplayProperties();
                $("#get_forecast").text("+");
                $(this).find('#get_forecast').on("click", function(event){
                    $forecastDisplay.show();
                    console.log("Display forecast");
                });
            }

            // setWeatherIconProperties();

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
                    "position": "fixed",
                    "left": "40%",
                    "right": "40%"
                });
                $("body").append($forecastDisplay);
            }
        });

    }
} (jQuery));

