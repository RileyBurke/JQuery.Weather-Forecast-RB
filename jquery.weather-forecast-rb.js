(function($) {
    $.fn.weatherForecast = function(options) {

        let settings = $.extend({
            openWeatherApiKey: null,
            geoLocation: 0,
            iconSet: 0,
            closeable: true
        }, options);



        function getWeatherInfo(city_name, mode) {
            const api_key = settings.openWeatherApiKey;
            const api_url = "https://api.openweathermap.org/data/2.5/" + mode + "?q=" + city_name + "&appid=" + api_key + "&units=metric";
            console.log(api_url);
            fetch(api_url)
                .then(response => response.json())
                .then( json => console.log(json) )
                .catch(e => console.log(e.message));
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

