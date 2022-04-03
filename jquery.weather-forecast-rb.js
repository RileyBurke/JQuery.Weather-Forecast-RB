(function($) {
    $.fn.weatherForecast = function(options) {

        let settings = $.extend({
            apiKey: "adcf237fa5811f92e8a66288993e9335"
        }, options);

        function getWeatherInfo(city_name, mode) {
            const api_key = settings.apiKey;
            const api_url = "https://api.openweathermap.org/data/2.5/" + mode + "?q=" + city_name + "&appid=" + api_key + "&units=metric"
        }

        function getLocation(){
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition();
        }else{

        }
        }
    }
} (jQuery));

