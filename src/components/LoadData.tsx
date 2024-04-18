import React, { useEffect, useState } from 'react';
// import { NavLink } from 'react-router-dom';
// import ldata from './LocationData.json';
import DatadisplayCard from './Displaycard/DatadisplayCard'
// import { List } from 'react-virtualized';
import AutoSizer from "react-virtualized/dist/commonjs/AutoSizer";
import List from "react-virtualized/dist/commonjs/List";
import { DataState } from "./config/ContextApi";
import { FaSort } from "react-icons/fa";

const LoadData = () => {
  interface LocationData {
  name: string;
  cou_name_en:string;
  timezone:string;
  geoname_id:number;
  // Add other properties as needed
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
  ldata:LocationData[];
  setLData:React.Dispatch<React.SetStateAction<LocationData[]>>
  c1:number;
  setC1:React.Dispatch<React.SetStateAction<number>>;
  storedData: LocationData[]; // Adjust the type as needed
  setStoredData: React.Dispatch<React.SetStateAction<LocationData[]>>;
}
    // const ldata: LocationData[] = []; // Initialize with your actual data
    const { setLocation, ldata,c1 } = DataState();
  const [data, setData] = useState<LocationData[]>(ldata);
  const [count, setCount] = useState<number>(ldata.length);
  const [c, setC] = useState<number>(0);
  const [search, setSearch] = useState<string>('');
    // const { setLocation}:DataContextType = DataState();
    const handleWholeData=()=>{
      // setCount(count+1);
      setCount(ldata.length);
      setData(ldata);
      console.log(count);
    }
    useEffect(()=>{
      handleWholeData();
    },[c,c1])

    const handleCityName=()=>{
      const sorteddata = data.sort((a, b) => {
        const nameA = a?.name 
        const nameB = b?.name 
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }

        // names must be equal
        return 0;
      });
      setCount(data.length);
      setData(sorteddata);
      setC(c+1)
    }
    const handleCountryName=()=>{
      const sorteddata = data.sort((a, b) => {
        const nameA = a?.cou_name_en; 
        const nameB = b?.cou_name_en; 
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }

        
        return 0;
      });
      setCount(data.length);
      setData(sorteddata);
      setC(c + 1);

    }
    const handleTimezone=()=>{
      const sorteddata = data.sort((a, b) => {
        const nameA = a?.timezone; 
        const nameB = b?.timezone; 
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }

        
        return 0;
      });
      setCount(data.length);
      setData(sorteddata);
      setC(c + 1);

    }

    const handleSearch =()=>{
      if (search === "") { setData(ldata);
        setCount(ldata.length);
        return; }
        const filterBySearch = ldata.filter((item) => {
            if (
              item
                .name
                .toString()
                .toLowerCase()
                .includes(search.toString().toLowerCase())
            ) {
              return item;
            }
        })
        setData(filterBySearch);
        setSearch("");
        setCount(filterBySearch.length);
    }
    const handleAllLocations=()=>{
      setData(ldata);
      setCount(data.length);
    }


  return (
    data && (
      <div className=" h-[100vh]  md:w-[80%]">
        <h1 className="text-[40px] font-bold flex justify-center pt-[20px]">
          Weather Report
        </h1>
        <div className=" w-[99%] gap-4 flex justify-between items-center md:ml-[15px] p-[20px] md:flex-row flex-col">
          <button
            className="px-[20px]  py-1 hover:bg-orange-600 bg-orange-800 rounded-md"
            onClick={handleAllLocations}
          >
            Number of Citys {count}
          </button>
          <div className="flex sm:flex-row flex-col  md:w-[300px] w-[200px] gap-[10px]">
            <input
              className=" rounded-md p-1 text-black"
              type="text"
              value={search}
              placeholder="search city"
              onChange={(e) => setSearch(e.target.value)}
            />
            <button
              className="px-[20px] py-1 hover:bg-orange-600 bg-orange-800 rounded-md"
              onClick={handleSearch}
            >
              search
            </button>
          </div>
        </div>
        <div className="flex justify-around items-center w-[99%] h-[50px] mb-3 lg:text-[1rem] md:text-[.85rem] sm:text-[.75rem] text-[.8rem]">
          <div className="flex justify-around items-center w-[90%]">
            <div
              className="flex items-center w-[150px]"
              // onClick={handleGeonameid}
            >
              Geoname_Id
            </div>
            <div
              className="flex items-center w-[250px] cursor-pointer"
              onClick={handleCityName}
            >
              City_Name <FaSort />
            </div>
            <div
              className="flex items-center w-[150px] cursor-pointer"
              onClick={handleCountryName}
            >
              Country_Name <FaSort />
            </div>
            <div
              className="flex items-center w-[250px] cursor-pointer"
              onClick={handleTimezone}
            >
              TimeZone <FaSort />
            </div>
          </div>
          <div className="flex items-center justify-center w-[100px]">
            Add to Fav
          </div>
        </div>
        <div className="w-[100%] h-[70vh]  overflow-scroll-x">
          {data && (
            <AutoSizer>
              {({ height, width }) => (
                <List
                  width={width}
                  height={height}
                  rowHeight={50}
                  rowCount={data?.length}
                  rowRenderer={({ index, key, style, parent }) => {
                    const d = data[index];
                    return (
                      <div
                        key={d.geoname_id}
                        style={style}
                        onClick={(e) => setLocation(d)}
                        className={`hover:bg-orange-800  ${
                          index % 2 == 0 && "bg-orange-700"
                        }`}
                      >
                        <DatadisplayCard data={d} />

                        <div></div>
                      </div>
                    );
                  }}
                />
              )}
            </AutoSizer>
          )}
        </div>
      </div>
    )
  );
}

export default LoadData