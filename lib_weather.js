"use strict"

class WeatherForecast{
    constructor(json, index){
        this.city = json['city']['name'];
        this.currentTemp = json['list'][index]['main']['temp'];
        this.tempMax = json['list'][index]['main']['temp_max'];
        this.tempMin = json['list'][index]['main']['temp_min'];
        this.windSpeed = json['list'][index]['wind']['speed'];
        this.weatherDescription = json['list'][index]['weather'][0]['main'];

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
}

class CurrentWeather{
    constructor(json){
        this.city = json['name'];
        this.currentTemp = json['main']['temp'];
        this.tempMax = json['main']['temp_max'];
        this.tempMin = json['main']['temp_min'];
        this.windSpeed = json['wind']['speed'];
        this.weatherDescription = json['weather'][0]['main'];

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
}