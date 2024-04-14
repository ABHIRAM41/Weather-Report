import React from 'react'
import { Outlet } from 'react-router-dom'
import PinedData from './PinedData'
const Main = () => {
  return (
    <div className="flex flex-col md:flex-row justify-around gap-1">
      <Outlet />
      <PinedData />
    </div>
  );
}

export default Main