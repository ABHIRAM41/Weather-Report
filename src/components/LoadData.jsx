import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
// import ldata from './LocationData.json';
import DatadisplayCard from './Displaycard/DatadisplayCard'
import List from "react-virtualized/dist/commonjs/List";
import AutoSizer from "react-virtualized/dist/commonjs/AutoSizer";
import { DataState } from "./config/ContextApi";
import { FaSort } from "react-icons/fa";

const LoadData = () => {
    const { setLocation, ldata,c1 } = DataState();
    const [data, setData] = useState(ldata);
    const [count, setCount] = useState(ldata.length);
    const [c, setC] = useState(0);
    const [search,setSearch]=useState("");
    
    const handleWholeData=()=>{
      // setCount(count+1);
      setCount(ldata.length);
      setData(ldata);
      console.log(count);
    }
    useEffect(()=>{
      handleWholeData();
    },[c,c1])

    // sorting geoname_id
    // const handleGeonameid=()=>{
    //   console.log("handleGeonameid");
    //   const sorteddata = data.sort((a, b) => {
    //     const nameA = a.geoname_id; // ignore upper and lowercase
    //     const nameB = b.geoname_id; // ignore upper and lowercase
    //     if (nameA < nameB) {
    //       return -1;
    //     }
    //     if (nameA > nameB) {
    //       return 1;
    //     }

    //     // names must be equal
    //     return 0;
    //   });
    //   setData(sorteddata);
    // }
    const handleCityName=()=>{
      const sorteddata = data.sort((a, b) => {
        const nameA = a?.name // ignore upper and lowercase
        const nameB = b?.name // ignore upper and lowercase
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
        const nameA = a?.cou_name_en; // ignore upper and lowercase
        const nameB = b?.cou_name_en; // ignore upper and lowercase
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
      setC(c + 1);

    }
    const handleTimezone=()=>{
      const sorteddata = data.sort((a, b) => {
        const nameA = a?.timezone; // ignore upper and lowercase
        const nameB = b?.timezone; // ignore upper and lowercase
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
    data && <div className="2xl:w-[	1536px] xl:w-[1280px] lg:w-[1024px] md:w-[768px] sm:w-[	640px] h-[100vh] ">
      <h1 className="text-[40px] font-bold flex justify-center pt-[20px]">
        Weather Report
      </h1>
      <div className=" w-[99%] flex justify-between items-center ml-[15px] p-[20px]">
        <button
          className="px-[20px] py-1 hover:bg-orange-600 bg-orange-800 rounded-md"
          onClick={handleAllLocations}
        >
          Number of Citys {count}
        </button>
        <div className="flex w-[300px] gap-[30px]">
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
      <div className="flex justify-around items-center w-[99%] h-[50px] mb-3 min-w-[440px] overflow-scroll-x">
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
      <div className="w-[100%] h-[70vh] min-w-[440px] overflow-scroll-x">
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
      </div>
      
    </div>
  );
}

export default LoadData