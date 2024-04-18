import { NavLink } from 'react-router-dom';
import { DataState } from '../config/ContextApi';
interface LocationData {
  name: string;
  cou_name_en:string;
  timezone:string;
  geoname_id:number;
  // Add other properties as needed
}
interface Dec{
  data:LocationData
}
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
}
const DatadisplayCard = ({data}:Dec) => {
  const { pinedData, setPinedData }:DataContextType= DataState();
  const handleAddToFav=()=>{
    console.log(pinedData.length)
     if(pinedData.length==0){
      const pindata=[...pinedData,data]
      setPinedData(pindata);
      localStorage.setItem("location", JSON.stringify(pindata));
      console.log('31');
      console.log(pinedData);
      return;
     }
     const fdata=pinedData.filter((p)=>p.name==data.name);
     if (fdata.length>0)
     {
      console.log("already exist");
      return;
     }
     const pindata = [...pinedData, data];
     setPinedData( pindata);
     localStorage.setItem("location", JSON.stringify(pindata));
     console.log("9864532");
     console.log(pinedData);

  }
  return (
    <div>
      <div className="flex justify-around  h-[50px] lg:text-[1rem] md:text-[.85rem] sm:text-[.75rem] text-[.8rem] ">
        <NavLink to="/weather" className="flex justify-around w-[90%]">
          <div className="flex items-center w-[150px] ">{data.geoname_id}</div>
          <div className="flex items-center w-[250px] cursor-pointer">
            {data.name}
          </div>
          <div className="flex items-center w-[150px]">{data.cou_name_en}</div>
          <div className="flex items-center w-[250px]">{data.timezone}</div>
        </NavLink>
        <button className="flex items-center justify-center w-[100px] hover:bg-orange-900 rounded-md" onClick={handleAddToFav}>
          Add to Fav
        </button>
      </div>
    </div>
  );
}

export default DatadisplayCard