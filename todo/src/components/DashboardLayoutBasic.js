import * as React from 'react';
import { useState, useEffect } from 'react';
import { extendTheme, styled } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
import { Outlet } from "react-router-dom";

/*icons*/
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';

/*components*/
import DashboardIcon from '@mui/icons-material/Dashboard';
import PieChartIcon from '@mui/icons-material/PieChart';
import InfoIcon from '@mui/icons-material/Info';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Tooltip from '@mui/material/Tooltip';
import DatePicker from './DatePicker';
import DialogAddTask from './DialogAddTask';
import { Typography, Fab } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import CalendarComponent from './Calendar';
import DeleteButton from './DeleteButton';

import todoLogo from '../utils/TODO.png';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import LineChartData from './LineChartData';
import PieChartCategoriesData from './PieChartCategoriesData';
import PieChartTasksData from './PieChartTasksData';
dayjs.extend(isSameOrAfter);


/*specifies the navigation with the dashboard layout of mui*/
const NAVIGATION = [
  {
    kind: 'header',
    title: 'Main items',
  },
  {
    segment: 'dashboard',
    title: 'Dashboard',
    icon: <DashboardIcon />,
  },
  {
    segment: 'graphs',
    title: 'Graphs',
    icon: <PieChartIcon />,
  },
  {
    kind: 'divider',
  },
  {
    kind: 'header',
    title: 'Manage',
  },
  {
    segment: 'login',
    title: 'Login',
    icon: <LoginIcon />,
  },
  {
    segment: 'settings',
    title: 'Settings',
    icon: <SettingsIcon />,
  },
  {
    segment: 'about',
    title: 'About',
    icon: <InfoIcon />,
  },
  {
    kind: 'divider',
  },
  {
    segment: 'logout',
    title: 'Logout',
    icon: <LogoutIcon />,
  },

];

function useDemoRouter(initialPath) {
  const [pathname, setPathname] = React.useState(initialPath);

  const router = React.useMemo(() => {
    return {
      pathname,
      searchParams: new URLSearchParams(),
      navigate: (path) => setPathname(String(path)),
    };
  }, [pathname]);

  return router;
}

/*themes for the dashboard layout of mui*/
const demoTheme = extendTheme({
  palette: {
    primary: {
      main: '#DF2935',
    },
    secondary: {
      main: '#FCFCFC',
    }
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
  colorSchemes: { light: true, dark: true },
  colorSchemeSelector: 'class',
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

const Skeleton = styled('div')(({ theme, height }) => ({
  backgroundColor: theme.palette.primary.main,
  borderRadius: theme.shape.borderRadius,
  height,
  content: '" "',
}));

function SidebarFooter({ mini }) {
  return (
    <Typography
      variant="caption"
      sx={{ m: 1, whiteSpace: 'nowrap', overflow: 'hidden' }}
    >
      {mini ? '© ToDo' : `©Copyright ${new Date().getFullYear()} - Simone Lutero`}
    </Typography>
  );
}
SidebarFooter.propTypes = {
  mini: PropTypes.bool.isRequired,
};

function CustomAppTitle() {
  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <img style={{ width: '3rem' }} src={todoLogo} />
      <Typography variant="h6">ToDo</Typography>
      <Chip size="small" label="BETA" color="info" />
      {/*<Tooltip title="Connected to production">
        <CheckCircleIcon color="success" fontSize="small" />
      </Tooltip>*/}
    </Stack>
  );
}

export default function DashboardLayoutBasic(props) {
  const { window } = props;
  const [tasks, setTasks] = useState([]);
  const [openDialogAddTask, setOpenDialogAddTask] = useState(false);
  const router = useDemoRouter('/dashboard');
  const theme = useTheme(); //state of the current theme
  const [isCompleted, setIsCompleted] = useState(false);
  const [selectedDate, setSelectedDate] = useState(dayjs()); //default selected date: today 
  const demoWindow = window ? window() : undefined;

  function handleClick(param) { //manage the open of the adding tasks dialog
    setOpenDialogAddTask(param);
  }

  const addTask = (newTask) => { //adding task and save in localStorage
    const updatedTask = { ...newTask, isCompleted: false }; //add a new task as not completed
    const updatedTasks = [...tasks, updatedTask]; //add updatedtask as the last element of tasks
    setTasks(updatedTasks); //update the state
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));  //save in local Storage with setItem()
  };

  const deleteTask = (taskToDelete) => {
    const updatedTasks = tasks.filter(task => task !== taskToDelete); //filter out the task to delete
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };


  function handleCompleted(completedTask) { //set the task completed when the user click the checked btn
    const updatedTasks = tasks.map(task => task.title === completedTask.title ? { ...task, isCompleted: !task.isCompleted } : task); //insert the tasks in updated tasks whose title is the same of the completed task and set it as completed
    setTasks(updatedTasks); //update the state
    localStorage.setItem('tasks', JSON.stringify(updatedTasks)); //save in localStorage 
  }


  useEffect(() => { //every time the component is mounted, update the savedTasks and the related state
    const savedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (savedTasks) setTasks(savedTasks);
  }, []);

  useEffect(() => {
    //every time the state of the tasks change, update the tasks in localStorage
    if (tasks.length > 0) {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }, [tasks]);

  const today = dayjs().startOf('day'); //today
  const tomorrow = today.add(1, 'day').startOf('day');; //i take today, add one day and start from that day (so from tomorrow)

  //filter today's tasks
  const todayTasks = tasks.filter(task => {
    const taskDate = dayjs(task.date); //date of the task
    return taskDate.isValid() && taskDate.isSame(today, 'day'); //return the task if task date is valid and the date is the same of today
  });

  //filter tasks from tomorrow
  const nextTasks = tasks.filter(task => {
    const taskDate = dayjs(task.date); //task date
    //return the task if the date is valid and if the task date is the same or after the selected date (state)
    return taskDate.isValid() && taskDate.isSameOrAfter(selectedDate, 'day');
  });

  const completedTasks = tasks.filter(task => {
    const taskDate = dayjs(task.date);
    return taskDate.isValid() && task.isCompleted == true;
  })

  //state for data change
  const handleDateChange = (date) => {
    setSelectedDate(date);
  }

  const Box = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? 'rgba(10,10,10)' : 'rgba(245,245,245)',
    marginLeft: '2%',
    webkitBackdropFilter: 'blur(5px)',
    backdropFilter: 'blur(10px)',
    display: 'flex',
    alignItems: 'flex-start',
    flexDirection: 'column',
    borderRadius: '25px',
    color: theme.palette.mode === 'light' ? '#000000' : 'rgba(245,245,245)',
    marginTop: '5%',
    boxShadow: theme.palette.mode === 'dark' ? '0 4px 10px rgba(0, 0, 0, 0.6)' : '0 4px 10px rgba(0, 0, 0, 0.1)',

  }));

  const Task = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? 'rgba(20,20,20)' : 'rgba(255,255,255)',
    width: '96%',
    color: theme.palette.mode === 'dark' ? '#FFFFFF' : '#000000',
    borderRadius: '25px',
    width: '96%',
    padding: '15px',
    margin: '1% auto',
    display: 'flex',
    alignItems: 'flex-start',
    flexDirection: 'row',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(5px)',
    boxShadow: theme.palette.mode === 'dark' ? '0 4px 10px rgba(0, 0, 0, 0.6)' : '0 4px 10px rgba(0, 0, 0, 0.1)',
  }));

  const ChartsBox = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? 'rgba(10,10,10)' : 'rgba(245,245,245)',
    marginLeft: '2%',
    webkitBackdropFilter: 'blur(5px)',
    backdropFilter: 'blur(10px)',
    display: 'flex',
    alignItems: 'flex-start',
    flexDirection: 'row',
    borderRadius: '25px',
    color: theme.palette.mode === 'light' ? '#000000' : 'rgba(245,245,245)',
    marginTop: '5%',
    boxShadow: theme.palette.mode === 'dark' ? '0 4px 10px rgba(0, 0, 0, 0.6)' : '0 4px 10px rgba(0, 0, 0, 0.1)',

  }));


  const isNextTasksEmpty = nextTasks.length === 0;
  const isCompletedTasksEmpty = completedTasks.length === 0;
  const lastWeek = today.subtract(7, 'day');

  return (
    <AppProvider
      navigation={NAVIGATION}
      branding={{
        logo: <img src={todoLogo} alt="ToDo Logo" />,
        title: 'ToDo',
        homeUrl: '/toolpad/core/introduction',
      }}
      router={router}
      theme={demoTheme}
      window={demoWindow}

    /*session={session}
    authentication={authentication}*/

    >
      <DashboardLayout
        defaultSidebarCollapsed
        slots={{
          appTitle: CustomAppTitle,
          sidebarFooter: SidebarFooter,
        }}
        
      >
        <PageContainer>
          <div><CalendarComponent tasks={tasks || []} /></div>
          <div>
            {router.pathname === '/dashboard' && (
              <>
                {/* TODAY */}
                <Box>
                  <div className="title">
                    <Typography variant="h5">Today's tasks</Typography>
                  </div>
                  {todayTasks.map((task, index) => {
                    const taskDate = dayjs(task.date);
                    return (
                      <Task key={index} className={theme.palette.mode === "dark" ? "task task-dark" : "task task-light"}>
                        <div id="taskState">
                          <input
                            className="state-btn"
                            type="checkbox"
                            checked={task.isCompleted}
                            sx={{
                              '&.Mui-checked': {
                                color: '#FFFFFF',
                              },
                              color: '#FFFFFF',
                            }}
                            onChange={() => handleCompleted(task)}
                          />
                        </div>
                        <div className="task-data">
                          <Typography variant="h6">{task.title.charAt(0).toUpperCase() + String(task.title).slice(1)}</Typography>
                          <Typography variant="body2">Date: {taskDate.isValid() ? taskDate.format('YYYY-MM-DD') : 'Invalid date'}</Typography>
                          <Typography variant="body2">Category: {task.category}</Typography>
                        </div>
                        <DeleteButton onDelete={() => deleteTask(task)} />
                      </Task>
                    );
                  })}
                </Box>


                {/* NEXT */}
                <Box>
                  <div className="title">
                    <Typography variant="h5">Next Tasks</Typography>
                    <DatePicker selectedDate={selectedDate} onDateChange={handleDateChange} />
                  </div>

                  {isNextTasksEmpty ? (
                    <Typography variant="body1" color="#34b3db" sx={{ marginTop: 2, marginLeft: 3 }}>
                      No tasks available for the selected date.
                    </Typography>
                  ) : (
                    nextTasks.map((task, index) => {
                      const taskDate = dayjs(task.date);
                      return (
                        <Task key={index} className={theme.palette.mode === "dark" ? "task task-dark" : "task task-light"}>
                          <div id="taskState">
                            <input
                              className="state-btn"
                              type="checkbox"
                              sx={{
                                '&.Mui-checked': { color: '#FFFFFF' },
                                color: '#FFFFFF',
                              }}
                              onChange={() => handleCompleted(task)}
                            />
                          </div>
                          <div className="task-data">
                            <Typography variant="h6">{task.title.charAt(0).toUpperCase() + String(task.title).slice(1)}</Typography>
                            <Typography variant="body2">Date: {taskDate.isValid() ? taskDate.format('YYYY-MM-DD') : 'Invalid date'}</Typography>
                            <Typography variant="body2">Category: {task.category}</Typography>
                          </div>
                          <DeleteButton onDelete={() => deleteTask(task)} />
                        </Task>
                      );
                    })
                  )}
                </Box>
              </>
            )}

            {router.pathname === '/graphs' && (

              <div>
                <Typography sx={{ marginTop: '5%', marginLeft: '2%', marginBottom: '2%' }} variant="h5">
                  {lastWeek.format('dddd DD MMM')} &nbsp; - &nbsp; {today.format('dddd DD MMM')} :
                  </Typography>
                <Box>
                  <PieChartCategoriesData tasks={completedTasks} />
                </Box>
                <Box>
                  <LineChartData tasks={completedTasks} />
                </Box>
                <Box>
                  <PieChartTasksData tasks={completedTasks} />
                </Box>
                <Box>
                  <div className="title">
                    <Typography sx={{ marginBottom: '2%' }} variant="h5">Completed tasks</Typography>
                    <DatePicker selectedDate={selectedDate} onDateChange={handleDateChange} />
                  </div>

                  {isCompletedTasksEmpty ? (
                    <Typography variant="body1" color="#34b3db" sx={{ marginTop: 2, marginLeft: 3 }}>
                      No completed tasks.
                    </Typography>
                  ) : (
                    completedTasks.map((task, index) => {
                      const taskDate = dayjs(task.date);
                      return (
                        <Task key={index} className={theme.palette.mode === "dark" ? "task task-dark" : "task task-light"}>
                          <div className="task-data">
                            <Typography variant="h6">{task.title.charAt(0).toUpperCase() + String(task.title).slice(1)}</Typography>
                            <Typography variant="body2">Date: {taskDate.isValid() ? taskDate.format('YYYY-MM-DD') : 'Invalid date'}</Typography>
                            <Typography variant="body2">Category: {task.category}</Typography>
                          </div>
                        </Task>
                      );
                    })
                  )}
                </Box>
              </div>


            )}
          </div>
        </PageContainer>

        <Fab
          aria-label="add"
          sx={{
            position: 'fixed', bottom: 25, right: 50, backgroundColor: '#34B3DB', color: '#FFFFFF',
            '&:hover': {
              backgroundColor: '#FFFFFF',
              color: '#000000',
            }
          }}
          onClick={handleClick}>
          <AddIcon sx={{ fontSize: 60 }} />
        </Fab>

        {openDialogAddTask && (
          <DialogAddTask
            open={openDialogAddTask}
            onClose={() => setOpenDialogAddTask(false)}
            addTask={addTask}
          />
        )}
      </DashboardLayout>
      <div><Outlet /></div>
    </AppProvider>

  );
  
}