import {createContext, useContext,useState} from "react";
import d1 from '../jsonfile/data1.json'
import d2 from "../jsonfile/data2.json";
import d3 from "../jsonfile/data3.json";
const dataContext=createContext();

const DataProvider=({children})=>{
    const [ldata,setLData]=useState([...d1,...d2,...d3]);
    const [location, setLocation] = useState({
      coord: {
        lon: 68.3737,
        lat: 25.3924,
      },
      weather: [
        {
          id: 804,
          main: "Clouds",
          description: "overcast clouds",
          icon: "04d",
        },
      ],
      base: "stations",
      main: {
        temp: 301.87,
        feels_like: 301.93,
        temp_min: 301.87,
        temp_max: 301.87,
        pressure: 1013,
        humidity: 45,
        sea_level: 1013,
        grnd_level: 1009,
      },
      visibility: 10000,
      wind: {
        speed: 7.75,
        deg: 289,
        gust: 8.81,
      },
      clouds: {
        all: 100,
      },
      dt: 1713085170,
      sys: {
        country: "PK",
        sunrise: 1713056674,
        sunset: 1713102509,
      },
      timezone: 18000,
      id: 1176734,
      name: "Hyderābād",
      cod: 200,
    });
    const [pinedData,setPinedData]=useState([]);

    return (
      <dataContext.Provider
        value={{
          location,
          setLocation,
          pinedData,
          setPinedData,
          ldata,
          setLData,
        }}
      >
        {children}
      </dataContext.Provider>
    );
}
export const DataState=()=>{
    return useContext(dataContext);
}

export default DataProvider;