import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import DashboardLayoutBasic from "./components/DashboardLayoutBasic";
import GraphsScreen from './screens/GraphsScreen';
import AboutScreen from './screens/AboutScreen';
import LoginScreen from './screens/LoginScreen';
import DialogAddTask from "./components/DialogAddTask";
import {
  Typography,
  Fab,
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import './style/home_style.css';


function App() {
  const [openDialogAddTask, setOpenDialogAddTask] = useState(false);
  const [tasks, setTasks] = useState([]);
  function handleClick(param) {
    setOpenDialogAddTask(param);
  }

  const addTask = (newTask) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
  }
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

      <div id="tasksBox">
        {tasks.map((task, index) => (
          <div key={index} id="task">
            <Typography variant="h6">{task.title}</Typography>
            <Typography variant="body2">Date:  Date: {task.date ? task.date.format('YYYY-MM-DD') : 'No date selected'}</Typography>
            <Typography variant="body2">Category: {task.category}</Typography>
          </div>
        ))}
      </div>

      <Fab
        aria-label="add"
        sx={{
          position: 'fixed', bottom: 24, right: 20, backgroundColor: '#34B3DB', color:'#FFFFFF',
          '&:hover': {
            backgroundColor: '#FFFFFF',
            color:'#000000',
          }
        }}
        onClick={handleClick}>
        <AddIcon sx={{ fontSize: 60}} />
      </Fab>

      {openDialogAddTask && (
        <DialogAddTask
          open={openDialogAddTask}
          onClose={() => setOpenDialogAddTask(false)}
          addTask={addTask}
          
        />
      )}

    </Router>
  );
}

export default App;
