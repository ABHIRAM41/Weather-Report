import { useEffect } from 'react'
import { DataState } from './config/ContextApi'
import { useNavigate } from 'react-router-dom';

const PinedData = () => {
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
   const { pinedData, setPinedData, setLocation, storedData, setStoredData  } =      DataState();
  //  const [count,setCount]=useState(0);
   const navigate=useNavigate();
    const displaydata=()=>{
      if (storedData != null && storedData.length) {
        const locationdata = JSON.parse(localStorage.getItem("location") || "");
        console.log(locationdata);
        setPinedData(locationdata);
      }
    }
   useEffect(()=>{

    displaydata();
   },[])

   const handleLocation=(data:LocationData)=>{
    console.log(data)
      setLocation(data);
      // setCount(count+1);
      navigate('/weather');

   }
   const handleDeletion=(data:LocationData)=>{
      const Delete=pinedData.filter(d=>d.name!=data.name);
      setPinedData(Delete);
      setStoredData(Delete);
      localStorage.setItem("location", JSON.stringify(Delete));

   }
  return (
    <div className="flex justify-center h-[100vh] md:items-start items-center md:pt-3">
      <div className="flex flex-col gap-1 ">
        <h1 className="text-[20px] font-semibold w-[150px] my-[10px]">
          Fav Locations
        </h1>
        {(storedData != null && storedData.length) != 0 &&
          pinedData?.map((data, index) => (
            <div key={data.geoname_id} className="flex gap-2">
              <div
                className={`cursor-pointer ${
                  index % 2 == 0 && "bg-orange-800"
                } hover:bg-orange-600 p-[5px] rounded-md`}
                onClick={() => handleLocation(data)}
              >
                {data.name}
              </div>
              <div
                className={`flex items-center justify-center cursor-pointer text-[20px] ${
                  index % 2 == 0 && "bg-orange-800"
                } hover:bg-orange-600 px-[5px] rounded-md`}
                onClick={() => handleDeletion(data)}
              >
                -
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default PinedData