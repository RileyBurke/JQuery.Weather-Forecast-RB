"use strict"

class WeatherForecast{
    constructor(json, index){
        this.city = json['city']['name'];
        this.currentTemp = json['list'][index]['main']['temp'];
        this.tempMax = json['list'][index]['main']['temp_max'];
        this.tempMin = json['list'][index]['main']['temp_min'];
        this.windSpeed = json['list'][index]['wind']['speed'];
        this.weatherDescription = json['list'][index]['weather'][0]['main'];
        this.weatherCode = json['list'][index]['weather'][0]['icon'];
        this.time = new Date(json['list'][index]['dt_txt']);

        if (typeof(json['list'][index]['rain']) !== 'undefined'){
            this.rain = json['list'][index]['rain']['3h'];
        }else{
            this.rain = 0;
        }

        if (typeof(json['list'][index]['snow']) !== 'undefined'){
            this.snow = json['list'][index]['snow']['3h'];
        }else{
            this.snow = 0;
        }
    }

    get isRaining(){
        return this.rain > 0;
    }

    get isSnowing(){
        return this.snow > 0;
    }

    get weatherIconUrl(){
        return "https://openweathermap.org/img/wn/" + this.weatherCode + "@2x.png"
    }

    get dateTimeString(){
        let hour = this.time.getHours();
        let amPm = "AM";

        if (hour === 0){   //If 12AM
            hour = 12;
        }else if (hour === 12){  //If 12PM
            amPm = "PM";
        }else if (hour > 12){   //If 1PM through 11PM
            hour = hour - 12;
            amPm = "PM";
        }

        return this.time.toDateString() + " " + hour + amPm;
    }
}

class CurrentWeather{
    constructor(json){
        this.city = json['name'];
        this.currentTemp = json['main']['temp'];
        this.tempMax = json['main']['temp_max'];
        this.tempMin = json['main']['temp_min'];
        this.windSpeed = json['wind']['speed'];
        this.weatherDescription = json['weather'][0]['main'];
        this.weatherCode = json['weather'][0]['icon'];

        if (typeof(json['rain']) !== 'undefined'){
            this.rain = json['rain']['3h'];
        }else{
            this.rain = 0;
        }

        if (typeof(json['snow']) !== 'undefined'){
            this.snow = json['snow']['3h'];
        }else{
            this.snow = 0;
        }
    }

    get isRaining(){
        return this.rain > 0;
    }

    get isSnowing(){
        return this.snow > 0;
    }

    get weatherIconUrl(){
        return "https://openweathermap.org/img/wn/" + this.weatherCode + "@2x.png"
    }
}