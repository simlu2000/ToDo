import * as React from 'react';
import { extendTheme, styled } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PieChartIcon from '@mui/icons-material/PieChart';
import InfoIcon from '@mui/icons-material/Info';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';
import todoLogo from '../utils/TODO.png';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import PropTypes from 'prop-types';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Tooltip from '@mui/material/Tooltip';
import { useTheme } from '@mui/material/styles';
import { useState, useEffect } from 'react';
import DialogAddTask from './DialogAddTask';
import CalendarComponent from './Calendar';
import DatePicker from './DatePicker';
import {
  Typography,
  Fab,
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
dayjs.extend(isSameOrAfter);
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
      <Tooltip title="Connected to production">
        <CheckCircleIcon color="success" fontSize="small" />
      </Tooltip>
    </Stack>
  );
}

export default function DashboardLayoutBasic(props) {
  const { window } = props;
  const [tasks, setTasks] = useState([]);
  const [openDialogAddTask, setOpenDialogAddTask] = useState(false);
  const router = useDemoRouter('/dashboard');
  const theme = useTheme(); //ottengo tema corrente
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const demoWindow = window ? window() : undefined;

  function handleClick(param) {
    setOpenDialogAddTask(param);
  }

  const addTask = (newTask) => {
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  function handleCompleted(completedTask) {
    const updatedTasks = tasks.filter(task => task.title != completedTask.title);
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  }


  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (savedTasks) setTasks(savedTasks);
  }, []);

  useEffect(() => {
    // Ogni volta che lo stato delle task cambia, aggiorna il localStorage
    if (tasks.length > 0) {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }, [tasks]);

  const today = dayjs().startOf('day'); //oggi
  const tomorrow = today.add(1, 'day').startOf('day');; //prendo today e aggiugno un giorno e parto da domani

  //filtro tasks oggi
  const todayTasks = tasks.filter(task => {
    const taskDate = dayjs(task.date);
    return taskDate.isValid() && taskDate.isSame(today, 'day');
  });

  //filtro tasks da domani in poi
  const nextTasks = tasks.filter(task => {
    const taskDate = dayjs(task.date);
    //se data non selezionata prendi tutto da domani in poi
    return taskDate.isValid() && taskDate.isSameOrAfter(selectedDate, 'day');
  });

  //gestione selezione data
  const handleDateChange = (date) => {
    setSelectedDate(date);
  }

  const Box = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? 'rgba(10,10,10)' : 'rgba(245,245,245)',
    background: theme.palette.mode === 'dark' ? '#8e0e00' : ' #c9d6ff',
    background: theme.palette.mode === 'dark' ? '-webkit-linear-gradient(to top, #8e0e00,rgb(0, 0, 0))' : '-webkit-linear-gradient(to bottom, #c9d6ff, #e2e2e2)',
    background: theme.palette.mode === 'dark' ? 'linear-gradient(to top,#8e0e00,rgb(0, 0, 0))' : 'linear-gradient(to bottom,rgba(119, 192, 214, 0.6), #c9d6ff, #e2e2e2)', /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    marginLeft: '2%',
    webkitBackdropFilter: 'blur(5px)',
    backdropFilter: 'blur(10px)',
    display: 'flex',
    alignItems: 'flex-start',
    flexDirection: 'column',
    borderRadius: '25px',
    color: theme.palette.mode === 'light' ? '#000000' : '#FFFFFF',
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
  
  const isNextTasksEmpty = nextTasks.length === 0;

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
                {nextTasks.length > 0 && (
                  <Box>
                    <div className="title">
                      <Typography variant="h4">Today's tasks</Typography>
                    </div>
                    {todayTasks.map((task, index) => {
                      const taskDate = dayjs(task.date);
                      return (
                        <Task key={index} className={theme.palette.mode === "dark" ? "task task-dark" : "task task-light"}>
                          <div id="taskState">
                            <input
                              className="state-btn"
                              type="checkbox"
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
                        </Task>
                      );
                    })}
                  </Box>
                )}

                {/* NEXT */}
                  <Box>
                    <div className="title">
                      <Typography variant="h4">Next Tasks</Typography>
                      <DatePicker selectedDate={selectedDate} onDateChange={handleDateChange} />
                    </div>

                    {isNextTasksEmpty ? (
                    <Typography variant="body1" color="error" sx={{ marginTop: 2, marginLeft:3 }}>
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
                        </Task>
                      );
                    })
                  )}
                </Box>
              </>
            )}
          </div>
        </PageContainer>


        <Fab
          aria-label="add"
          sx={{
            position: 'fixed', bottom: 24, right: 20, backgroundColor: '#34B3DB', color: '#FFFFFF',
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
    </AppProvider>
  );
}