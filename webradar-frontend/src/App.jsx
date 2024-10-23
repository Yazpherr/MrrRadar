import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./components/views/LandingPage";
import Dashboard from "./components/dashboard/Dashboard";
import DataFromAPI from "./components/views/DataFromAPI"; // Importa el nuevo componente
import AboutUs from "./components/views/AboutUs";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import RadarDataView from './components/views/RadarDataView';
import FilterGraph from './components/views/FilterGraph'; // Importa el nuevo componente


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/app" element={<LandingPage />} />
        <Route path="/app/dashboard" element={<Dashboard />} />
        <Route path="/app/data" element={<DataFromAPI />} />
        <Route path="/app/quienes-somos" element={<AboutUs />} />
        <Route path="/app/radar-data" element={<RadarDataView />} /> {/* Nueva ruta */}
        <Route path="/app/filter-graph" element={<FilterGraph />} /> {/* Nueva ruta */}
      </Routes>
    </Router>
  );
}

export default App;
