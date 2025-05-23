import * as React from 'react';
import { useState, useEffect } from 'react';
import { extendTheme, styled } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';

/*components*/
import DashboardIcon from '@mui/icons-material/Dashboard';
import PieChartIcon from '@mui/icons-material/PieChart';
import InfoIcon from '@mui/icons-material/Info';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';
import { Typography, Fab } from "@mui/material";
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import DatePicker from './DatePicker';
import DialogAddTask from './DialogAddTask';
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


/*navigazione con la barra navigazione layout dashboard*/
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
    segment: 'about',
    title: 'About',
    icon: <InfoIcon />,
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

/*tema layout dashboard mui*/
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
    </Stack>
  );
}

export default function DashboardLayoutBasic(props) {
  const { window } = props;
  const [tasks, setTasks] = useState([]);
  const [openDialogAddTask, setOpenDialogAddTask] = useState(false);
  const router = useDemoRouter('/dashboard');
  const theme = useTheme(); //stato tema mui corrente
  const [isCompleted, setIsCompleted] = useState(false);
  const [selectedDate, setSelectedDate] = useState(dayjs()); //oggi come data default
  const demoWindow = window ? window() : undefined;

  function handleClick(param) { //per apertura dialog aggiunta task
    setOpenDialogAddTask(param);
  }

  const addTask = (newTask) => { //aggiunta task
    const updatedTask = { ...newTask, isCompleted: false }; //nuova task non ancora completata
    const updatedTasks = [...tasks, updatedTask]; //aggiungo nuova task in fondo
    setTasks(updatedTasks); //aggiorno stato
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));  //salvo in localStorage
  };

  const deleteTask = (taskToDelete) => {
    const updatedTasks = tasks.filter(task => task !== taskToDelete); //filtro tasks prendendo quelle != task da eliminare
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };


  function handleCompleted(completedTask) { //per settare una task come completata
    const updatedTasks = tasks.map(task => task.title === completedTask.title ? { ...task, isCompleted: !task.isCompleted } : task);  //se corrisponde imposto completata
    setTasks(updatedTasks); 
    localStorage.setItem('tasks', JSON.stringify(updatedTasks)); 
  }


  useEffect(() => { //ogni volta che il componente viene montato, prendo le tasks e imposto stato
    const savedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (savedTasks) setTasks(savedTasks);
  }, []);

  useEffect(() => { //ogni volta che le tasks vengono aggiornate
    if (tasks.length > 0) {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }, [tasks]);

  const today = dayjs().startOf('day'); //oggi
  const tomorrow = today.add(1, 'day').startOf('day');; //prendo oggi, aggiungo 1 giorno -> da li in poi = tomorrow

  //filtro task oggi
  const todayTasks = tasks.filter(task => {
    const taskDate = dayjs(task.date); 
    return taskDate.isValid() && taskDate.isSame(today, 'day'); //ritorno se data valida ed è oggi
  });

  //filtro task da domani
  const nextTasks = tasks.filter(task => {
    const taskDate = dayjs(task.date); 
    return taskDate.isValid() && taskDate.isSameOrAfter(selectedDate, 'day');
  });

  //task completate
  const completedTasks = tasks.filter(task => {
    const taskDate = dayjs(task.date);
    return taskDate.isValid() && task.isCompleted == true;
  })

  //stato cambio data
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
  const lastWeek = today.subtract(7, 'day'); //ultima settimana (oggi - 7 giorni)

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
                {/* oggi */}
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


                {/* da domani */}
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

            {/*per sezione/pagina grafici*/}
            {router.pathname === '/graphs' && (

              <div>
                <Typography sx={{ marginTop: '5%', marginLeft: '2%', marginBottom: '2%' }} variant="h5">
                  {lastWeek.format('dddd DD MMM')} &nbsp; - &nbsp; {today.format('dddd DD MMM')} :
                  </Typography>
                <Box>
                {isCompletedTasksEmpty ? (
                    <Typography variant="body1" color="#34b3db" sx={{ marginTop: 2, marginLeft: 3 }}>
                      No completed tasks.
                    </Typography>
                  ) : (
                  <PieChartTasksData tasks={completedTasks} />
                  )}
                </Box>
                <Box>
                {isCompletedTasksEmpty ? (
                    <Typography variant="body1" color="#34b3db" sx={{ marginTop: 2, marginLeft: 3 }}>
                      No completed tasks.
                    </Typography>
                  ) : (
                  <LineChartData tasks={completedTasks} />
                  )}
                </Box>
                <Box>
                {isCompletedTasksEmpty ? (
                    <Typography variant="body1" color="#34b3db" sx={{ marginTop: 2, marginLeft: 3 }}>
                      No completed tasks.
                    </Typography>
                  ) : (
                  <PieChartCategoriesData tasks={completedTasks} />
                  )}
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

          {/*dialog aggiunta task*/}
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