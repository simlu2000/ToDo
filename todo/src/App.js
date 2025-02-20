import { useState,} from "react";
import { BrowserRouter as Router} from "react-router-dom";
import DashboardLayoutBasic from "./components/DashboardLayoutBasic";
import './style/home_style.css';


function App() {
  return (
    <Router>
      {/*<Navbar />*/}
      <DashboardLayoutBasic />
      { /*<Routes>
        <Route path="/" />
        <Route path="/graphs" element={<GraphsScreen />} />
        <Route path="/about" element={<AboutScreen />} />
        <Route path="/login" element={<LoginScreen />} />
      </Routes>
      */}
    </Router>
  );
}

export default App;
