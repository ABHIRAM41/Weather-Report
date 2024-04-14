import './App.css'
import LoadData from './components/LoadData'
import {Routes,Route} from 'react-router-dom';
import Weather from './components/Weather';
import PinedData from './components/PinedData';
import Main from './components/Main';
function App() {

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
