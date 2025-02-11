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
import Grid from '@mui/material/Grid2';
import todoLogo from '../utils/TODO.png';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import PropTypes from 'prop-types';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import { useTheme } from '@mui/material/styles';
import { useState, useEffect } from 'react';
import DialogAddTask from './DialogAddTask';
import {
  Typography,
  Fab,
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import DateCalendarServerRequest from './DateCalendarServerRequest'
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
  /*{
    segment: 'reports',
    title: 'Reports',
    icon: <BarChartIcon />,
    children: [
      {
        segment: 'sales',
        title: 'Sales',
        icon: <DescriptionIcon />,
      },
      {
        segment: 'traffic',
        title: 'Traffic',
        icon: <DescriptionIcon />,
      },
    ],
  }, 
  */
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

  useEffect(() => { //ogni volta che lo stato si aggiorna, salva in locale
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (savedTasks) setTasks(savedTasks);
  }, []);




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
          <div>
            {router.pathname === '/dashboard' && (
              tasks.length === 0 ? (
                <Typography variant="h5" color="#54D3DB">No task available</Typography>
              ) : (
                <div className={theme.palette.mode === "dark" ? "box box-dark" : "box box-light"}>
                  <div className="title">
                    <Typography variant="h6">Today's tasks</Typography>
                  </div>
                  {tasks.map((task, index) => (
                    <div key={index} className={theme.palette.mode === "dark" ? "task task-dark" : "task task-light"}>
                      <div id="taskState">
                        <input className="state-btn" type="checkbox" sx={{
                          '&.Mui-checked': {
                            color: '#FFFFFF',
                          },
                          color: '#FFFFFF',
                        }} onChange={() => handleCompleted(task)} />
                      </div>
                      <div className="task-data">
                        <Typography variant="h6">{task.title.charAt(0).toUpperCase() + String(task.title).slice(1)}</Typography>
                        <Typography variant="body2">Date: {task.date ? task.date.format('YYYY-MM-DD') : 'No date selected'}</Typography>
                        <Typography variant="body2">Category: {task.category}</Typography>
                      </div>
                    </div>
                  ))}
                </div>
              )
            )}
          </div>

          <div>
            <DateCalendarServerRequest/>
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