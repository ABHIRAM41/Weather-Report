import {useState, useEffect} from 'react';
import {DataState} from "./config/ContextApi";
import { NavLink } from 'react-router-dom';
import axios from 'axios';
const Weather = () => {
  const {location}:any = DataState();
  const [locationData,setLocationData]= useState<WeatherData>();
  const [scale,setScale]=useState(0);
  const [k, setK] = useState<number[]>([]);
  const [c, setC] = useState<number[]>([]);
  const [f, setF] = useState<number[]>([]);
  const [bg, setBg]=useState("");

  interface Coord {
  lon: number;
  lat: number;
  }

  interface Weather {
    id: number;
    main: string;
    description: string;
    icon: string;
  }

  interface Main {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level: number;
    grnd_level: number;
  }

  interface Wind {
    speed: number;
    deg: number;
    gust: number;
  }

  interface Rain {
    '1h': number;
  }

  interface Clouds {
    all: number;
  }

  interface Sys {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  }

  interface WeatherData {
    coord: Coord;
    weather: Weather[];
    base: string;
    main: Main;
    visibility: number;
    wind: Wind;
    rain: Rain;
    clouds: Clouds;
    dt: number;
    sys: Sys;
    timezone: number;
    id: number;
    name: string;
    cod: number;
  }


  const getData=async()=>{
    console.log(location);
    try{
      const {data} = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${location.name}&appid=c8b6fb8ba03efeb1c88cde68a059a2a0`
      );
      setLocationData(data);
      // console.log(locationData, locationData?.weather[0].icon[2]);
      setBg(data?.weather[0].icon);
      console.log(bg);
      setK([
        data?.main?.temp,
        data?.main?.temp_max,
        data?.main?.temp_min,
      ]);
      setC([
        Math.round((data?.main.temp - 273.15) * 100) / 100,
        Math.round((data?.main.temp_max - 273.15) * 100) / 100,
        Math.round((data?.main.temp_min - 273.15) * 100) / 100,
      ]);
      setF([
        Math.round(((data?.main.temp - 273.15) * (9 / 5) + 32) * 100) / 100,
        Math.round(((data?.main.temp_max - 273.15) * (9 / 5) + 32) * 100) / 100,
        Math.round(((data?.main.temp_min - 273.15) * (9 / 5) + 32) * 100) / 100,
      ]);

    } 
    catch(error){
      console.log("error");
      console.log(error);
    }
  }
  useEffect(()=>{
    getData();
  },[location])

  const handleKelvin=()=>{
    setScale(0);
  }
  const handleCelsius = () => {
    setScale(1);
  };
  const handleFahrenheit = () => {
    setScale(2);
  };

  return (
    <div className="flex flex-col gap-[30px] h-[100vh] pt-[20px] w-[60%]">
      <h2 className="text-[40px] font-bold flex justify-center ">
        <NavLink to='/'>
        Weather Report
        </NavLink>
      </h2>
      <div className="flex gap-2 justify-center items-center">
        <div>🌡 Change to:-</div>
        <div className={`${scale == 0 && "hidden"}`} onClick={handleKelvin}>
          <button className="bg-red-500 hover:bg-red-600 py-[5px] px-1 rounded-md">
            Kelvin
          </button>
        </div>
        <div className={`${scale == 1 && "hidden"}`} onClick={handleCelsius}>
          <button className="bg-red-500 hover:bg-red-600 py-[5px] px-1 rounded-md">
            Celsius
          </button>
        </div>
        <div className={`${scale == 2 && "hidden"}`} onClick={handleFahrenheit}>
          <button className="bg-red-500 hover:bg-red-600 py-[5px] px-1 rounded-md">
            Fahrenheit
          </button>
        </div>
      </div>
      <div className="flex justify-center  ">
        <div
          className={`flex  text-gray-100 flex-col items-center ${
            bg[0] == "5"
              ? "bg-[url('/src/assets/mist.jpeg')]"
              : bg[0] == "1" && bg[1] == "3"
              ? "bg-[url('/src/assets/snowimg.jpeg')]"
              : bg[0] == bg[1]
              ? "bg-[url('/src/assets/tunderss.jpeg')]"
              : bg[1] == "0" || bg[1] == "9"
              ? "bg-[url('/src/assets/rainy.jpg')]"
              : bg[1] == "3" || bg[1] == "4"
              ? "bg-[url('/src/assets/cloudy.jpeg')]"
              : (bg[1] == "1" || bg[1] == "2") && bg[2] == "n"
              ? "bg-[url('/src/assets/clearSkynight.jpg')]"
              : "bg-[url('/src/assets/morning.jpg')]"
          } bg-cover p-[20px] w-[400px]`}
        >
          <div className="backdrop-blur-sm w-[90%]">
            <h4
              className={`text-[40px] font-bold ${
                bg[0] == "5" && "text-gray-900"
              } flex justify-center`}
            >
              {locationData?.name}{" "}
            </h4>
            <div className="flex flex-col gap-2 items-center ">
              <div>
                <img
                  src={
                    locationData?.weather[0].icon
                      ? `https://openweathermap.org/img/wn/${locationData?.weather[0].icon}@4x.png`
                      : ""
                  }
                />
              </div>
              <div>
                {locationData?.weather[0].icon[2] == "n"
                  ? "Night 🌠"
                  : "Morning 🌄"}
                /{locationData?.weather[0].description}{" "}
                {locationData?.weather[0].icon[1] == "9" && "🌧"}
              </div>
              <div>
                Temperature:
                {scale == 0 && " " + k[0] + "K "}
                {scale == 1 && " " + c[0] + "°C "}
                {scale == 2 && " " + f[0] + "°F "} 🌡
              </div>

              <div>Humidity: {locationData?.main.humidity}% 💦</div>
              <div>Wind Speed: {locationData?.wind.speed} 💨</div>
              <div>Atmosphereic pressure: {locationData?.main.pressure}%</div>
              <div>
                Temperature High: {scale == 0 && " " + k[1] + "K "}
                {scale == 1 && " " + c[1] + "°C "}
                {scale == 2 && " " + f[1] + "°F "} 🥵
              </div>
              <div>
                Temperature low: {scale == 0 && " " + k[2] + "K "}
                {scale == 1 && " " + c[2] + "°C "}
                {scale == 2 && " " + f[2] + "°F "} 🥶
              </div>
              {/* <div>
                Weather Description: {locationData?.weather[0].description}
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Weather

