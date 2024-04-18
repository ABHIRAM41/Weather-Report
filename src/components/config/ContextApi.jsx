import {createContext, useContext,useRef,useState} from "react";
const dataContext=createContext();

const DataProvider=({children})=>{
    const [ldata,setLData]=useState([]);
    const [c1, setC1] = useState(1);
    const [location, setLocation] = useState({
      // Initialize with your actual data
      geoname_id: 1269843,
      name: "Hyderābād",
      ascii_name: "Hyderabad",
      alternate_names: [
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
        "海得拉巴",
      ],
      feature_class: "P",
      feature_code: "PPLA",
      country_code: "IN",
      cou_name_en: "India",
      country_code_2: null,
      admin1_code: "40",
      admin2_code: "536",
      admin3_code: null,
      admin4_code: null,
      population: 6809970,
      elevation: null,
      dem: 515,
      timezone: "Asia/Kolkata",
      modification_date: "2024-02-01",
      label_en: "India",
      coordinates: {
        lon: 78.45636,
        lat: 17.38405,
      },
    });
    const [pinedData,setPinedData]=useState([]);
    const [storedData,setStoredData]=useState(JSON.parse(localStorage.getItem("location")));

    return (
      <dataContext.Provider
        value={{
          location,
          setLocation,
          pinedData,
          setPinedData,
          ldata,
          setLData,
          c1,
          setC1,
          storedData,
          setStoredData,
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