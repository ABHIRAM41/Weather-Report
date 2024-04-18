// import {createContext, useContext,useState} from "react";

// const dataContext=createContext("");

// const DataProvider=({children})=>{

//     const [location, setLocation] = useState({
//       coord: {
//         lon: 68.3737,
//         lat: 25.3924,
//       },
//       weather: [
//         {
//           id: 804,
//           main: "Clouds",
//           description: "overcast clouds",
//           icon: "04d",
//         },
//       ],
//       base: "stations",
//       main: {
//         temp: 301.87,
//         feels_like: 301.93,
//         temp_min: 301.87,
//         temp_max: 301.87,
//         pressure: 1013,
//         humidity: 45,
//         sea_level: 1013,
//         grnd_level: 1009,
//       },
//       visibility: 10000,
//       wind: {
//         speed: 7.75,
//         deg: 289,
//         gust: 8.81,
//       },
//       clouds: {
//         all: 100,
//       },
//       dt: 1713085170,
//       sys: {
//         country: "PK",
//         sunrise: 1713056674,
//         sunset: 1713102509,
//       },
//       timezone: 18000,
//       id: 1176734,
//       name: "Hyderābād",
//       cod: 200,
//     });
//     const [pinedData,setPinedData]=useState([]);

//     return (
//       <dataContext.Provider
//         value={{ location, setLocation, pinedData, setPinedData }}
//       >
//         {children}
//       </dataContext.Provider>
//     );
// }
// export const DataState=()=>{
//     return useContext(dataContext);
// }

// export default DataProvider;

import React, { createContext, useContext, useState } from 'react';

interface Coordinates {
  lon: number;
  lat: number;
}

interface LocationData {
  geoname_id: number;
  name: string;
  ascii_name: string;
  alternate_names: string[];
  feature_class: string;
  feature_code: string;
  country_code: string;
  cou_name_en: string;
  country_code_2: string | null;
  admin1_code: string;
  admin2_code: string;
  admin3_code: string | null;
  admin4_code: string | null;
  population: number;
  elevation: number | null;
  dem: number;
  timezone: string;
  modification_date: string;
  label_en: string;
  coordinates: Coordinates;
}

interface DataContextType {
  location: LocationData;
  setLocation: React.Dispatch<React.SetStateAction<LocationData>>;
  pinedData: LocationData[]; // Adjust the type as needed
  setPinedData: React.Dispatch<React.SetStateAction<LocationData[]>>; // Adjust the type as needed
  ldata:LocationData[];
  setLData:React.Dispatch<React.SetStateAction<LocationData[]>>
  c1:number;
  setC1:React.Dispatch<React.SetStateAction<number>>;
  storedData: LocationData[]; // Adjust the type as needed
  setStoredData: React.Dispatch<React.SetStateAction<LocationData[]>>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);
interface tp{
  children:React.ReactNode
}
const DataProvider = ({ children }:tp) => {
  const [ldata,setLData]=useState<LocationData[]>([]);
  const [c1, setC1] = useState(1);
  const [location, setLocation] = useState<LocationData>({
    // Initialize with your actual data
geoname_id:1269843,
name:"Hyderābād",
ascii_name:"Hyderabad",
alternate_names:[
"Bhaganagar",
"HYD",
"Haidarabadas",
"Haiderabad",
"Hajdarabad",
"Hajdarábád",
"Hyderabad",
"Hyderābād",
"Khajdarabad",
"Khajderabad",
"hai de la ba",
"haidarabada",
"haidarabadu",
"haiderabado",
"haitarapat",
"hayadarabada ema. karporesana",
"hayadrabada",
"hydr abad",
"hydr abad dkn",
"hydrabad",
"Хайдарабад",
"Хајдерабад",
"حیدر آباد",
"حیدر آباد دکن",
"حیدرآباد",
"हैदराबाद",
"হায়দরাবাদ এম. কর্পোরেশন",
"হায়দ্রাবাদ",
"ஹைதராபாத்",
"హైదరాబాదు",
"ハイデラバード",
"海得拉巴"
],
feature_class:"P",
feature_code:"PPLA",
country_code:"IN",
cou_name_en:"India",
country_code_2:null,
admin1_code:"40",
admin2_code:"536",
admin3_code:null,
admin4_code:null,
population:6809970,
elevation:null,
dem:515,
timezone:"Asia/Kolkata",
modification_date:"2024-02-01",
label_en:"India",
coordinates:{
lon:78.45636,
lat:17.38405
}
});

  const [pinedData, setPinedData] = useState<LocationData[]>([]); // Adjust the type as needed
const [storedData,setStoredData]=useState<LocationData[]>(JSON.parse(localStorage.getItem("location")|| ""));
  return (
    <DataContext.Provider value={{ 
          location,
          setLocation,
          pinedData,
          setPinedData,
          ldata,
          setLData,
          c1,
          setC1,
          storedData,
          setStoredData,}}>
      {children}
    </DataContext.Provider>
  );
};

export const DataState = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

export default DataProvider;
