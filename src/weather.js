const API_KEY = "a6c10c0c7ff3d72670d412cd1aca147c"

const weatherData = async(city, units = "metric") =>{
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=${units}`;
    const makeIconURL = (iconId) => `https://openweathermap.org/img/wn/${iconId}@2x.png`;

    const data = await fetch(URL).then((res) => res.json()).catch((error) => console.log(error));
    console.log(data)
    
    const{
        weather,
        main :{temp,feels_like, humidity, pressure, temp_max, temp_min},
        wind : {speed},
        sys : {country}, 
        name
    } = data
    console.log(weather,speed,country,feels_like)
    const {description, icon} = weather[0];

    return{
        temp,
        humidity,
        pressure,
        temp_max,
        temp_min,
        weather,
        feels_like,
        speed,
        country,
        name,
        description,
        iconURL: makeIconURL(icon)
    };

}
export {weatherData};