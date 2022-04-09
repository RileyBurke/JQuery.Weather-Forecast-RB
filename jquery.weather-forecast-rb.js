(function($) {
    $.fn.weatherForecast = function(options) {

        let settings = $.extend({
            openWeatherApiKey: null,
            geoLocation: 0,
            iconSet: 0,
            closeable: true,
            forecast: true
        }, options);


        function getWeatherData(json, mode){
            if (mode === "weather"){
                const currentWeather = new CurrentWeather(json);
                console.log(currentWeather);
            }else if(mode === "forecast"){
                const weatherForecast = new WeatherForecast(json, 0);
                console.log(weatherForecast);
            }
        }


        function getWeatherInfo(city_name) {
            const api_key = settings.openWeatherApiKey;
            const api_url_current_weather = "https://api.openweathermap.org/data/2.5/weather?q=" + city_name + "&appid=" + api_key + "&units=metric";
            const api_url_weather_forecast = "https://api.openweathermap.org/data/2.5/forecast?q=" + city_name + "&appid=" + api_key + "&units=metric";

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
                    .catch(e => console.log(e.message));
            }else{
                fetch(api_url_current_weather)
                    .then(response => response.json())
                    .then(json => getWeatherData(json, "weather"))
                    .catch(e => console.log(e.message));
            }
        }


        return this.each( () => {
            console.log("hello");
            let $display, $icon;
            // setWeatherDisplayProperties();
            // setWeatherIconProperties();
            getWeatherInfo("Halifax", "weather");


            $(this).find('a').on("click", function(event) {
                console.log("test");
                event.preventDefault();
            });
            //
            // function setWeatherDisplayProperties() {
            //
            // }
            //
            // function setWeatherIconProperties() {
            //
            // }
        });

        //This will require use of another api. Add later as an option for users.
        // function getLocation(){
        // if (navigator.geolocation) {
        //     navigator.geolocation.getCurrentPosition();
        //
        //
        // }else{
        //
        // }
        // }


    }
} (jQuery));

