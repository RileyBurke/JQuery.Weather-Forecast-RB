(function($) {
    $.fn.weatherForecast = function(options) {

        let settings = $.extend({
            openWeatherApiKey: null,
            geoLocation: 0,
            iconSet: 0,
            closeable: true,
            forecast: true,
            defaultIcons: true,
            units: "metric"
        }, options);


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
                const weatherForecast = new WeatherForecast(json, 0);
                console.log(weatherForecast);
            }
        }


        function getWeatherInfo(city_name) {
            const api_key = settings.openWeatherApiKey;
            const api_url_current_weather = "https://api.openweathermap.org/data/2.5/weather?q=" + city_name + "&appid=" + api_key + "&units=" + settings.units;
            const api_url_weather_forecast = "https://api.openweathermap.org/data/2.5/forecast?q=" + city_name + "&appid=" + api_key + "&units=" + settings.units;

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


        return this.each( () => {
            this.css({
                "display": "block",
                "width": "300px",
                "height": "200px",
                "text-align": "center"
                });
            console.log("hello");
            let $display, $icons;
            // setWeatherDisplayProperties();
            // setWeatherIconProperties();

            $(this).find('#update_weather').on("click", function(event) {
                event.preventDefault();
                let city_name = $("#city").val();
                console.log(city_name);
                console.log("test");
                getWeatherInfo(city_name, "weather");

            });
            //
            // function setWeatherDisplayProperties() {
            //
            // }
            //
            // function setWeatherIconsProperties() {
            //
            // }
        });

    }
} (jQuery));

