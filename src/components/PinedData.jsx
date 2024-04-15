import React, { useEffect, useState } from 'react'
import { DataState } from './config/ContextApi'
import { useNavigate } from 'react-router-dom';

const PinedData = () => {
   const { pinedData, setPinedData, setLocation } = DataState();
  //  const [count,setCount]=useState(0);
   const navigate=useNavigate();
    const displaydata=()=>{
        console.log(pinedData)
        const locationdata=JSON.parse(localStorage.getItem("location"));
        console.log(locationdata);
        setPinedData(locationdata);
    }
   useEffect(()=>{

    displaydata();
   },[])

   const handleLocation=(data)=>{
    console.log(data)
      setLocation(data);
      // setCount(count+1);
      navigate('/weather');

   }
   const handleDeletion=(data)=>{
      const Delete=pinedData.filter(d=>d.name!=data.name);
      setPinedData(Delete);
      localStorage.setItem("location", JSON.stringify(Delete));

   }
  return (
    <div className='flex justify-center mb-[80px] mt-1'>
      <div className="flex flex-col gap-1 ">
        <h1 className="text-[20px] font-semibold w-[150px] my-[10px]">Fav Locations</h1>
        {pinedData?.map((data, index) => (
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