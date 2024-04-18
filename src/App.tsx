import './App.css'
import LoadData from './components/LoadData'
import {Routes,Route} from 'react-router-dom';
import Weather from './components/Weather';
import PinedData from './components/PinedData';
import Main from './components/Main';
import { DataState } from './components/config/ContextApi';
import { useEffect } from 'react';
import axios from 'axios';
function App() {

  const { ldata, setLData,c1, setC1 } = DataState();

  useEffect(() => {
  getData();
}, [c1]);

const getData = async () => {
  const { data } = await axios.get(
    "https://abhiram41.github.io/Weather-Report/LocationData.json"
  );
  setLData(data.locationData);
  console.log(ldata);
  if (c1 < 2) setC1(c1 + 1);
};

  return (
    <div className="bg-[url('/src/assets/red.jpg')] bg-cover text-slate-100">
      <Routes>
        <Route path="/pin" element={<PinedData />} />
        <Route path="/" element={<Main />}>
          <Route path="/" element={<LoadData />} />
          <Route path="/weather" element={<Weather />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App

