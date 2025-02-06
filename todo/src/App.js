import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import GraphsScreen from './screens/GraphsScreen';
import AboutScreen from './screens/AboutScreen';
import LoginScreen from './screens/LoginScreen';
import DialogAddTask from "./components/DialogAddTask";
import {
  Typography,
  Fab,
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';


function App() {
  const [openDialogAddTask, setOpenDialogAddTask] = useState(false);

  function handleClick(param) {
    setOpenDialogAddTask(param);
  }
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" />
        <Route path="/graphs" element={<GraphsScreen />} />
        <Route path="/about" element={<AboutScreen />} />
        <Route path="/login" element={<LoginScreen />} />
      </Routes>
      <Typography variant="h2" sx={{ marginLeft: '2%', marginTop: '2%' }}>Hi User, these are your tasks:</Typography>
      <Typography variant="h2" sx={{ marginLeft: '2%', marginTop: '2%' }}>Add a Task</Typography>

      <Fab
        aria-label="add"
        sx={{
          position: 'fixed', bottom: 24, right: 20, backgroundColor: 'black',
          '&:hover': {
            backgroundColor: '#DF2935',
          }
        }}
        onClick={handleClick}>
        <AddIcon sx={{ fontSize: 50, color: 'white' }} />
      </Fab>

      {openDialogAddTask && (
        <DialogAddTask
          open={openDialogAddTask}
          onClose={() => setOpenDialogAddTask(false)}
          
        />
      )}

    </Router>
  );
}

export default App;
