import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import DashboardLayoutBasic from "./components/DashboardLayoutBasic";
import GraphsScreen from './screens/GraphsScreen';
import AboutScreen from './screens/AboutScreen';
import LoginScreen from './screens/LoginScreen';
import './style/home_style.css';


function App() {
  const [tasks, setTasks] = useState([]);
  

  return (
        <Router>
          <DashboardLayoutBasic>
            <Routes>
              <Route path="/" element={<DashboardLayoutBasic />} />
              <Route path="/graphs" element={<GraphsScreen />} />
              <Route path="/about" element={<AboutScreen />} />
              <Route path="/login" element={<LoginScreen />} />
            </Routes>
          </DashboardLayoutBasic>
        </Router>
      );
    }
export default App;
