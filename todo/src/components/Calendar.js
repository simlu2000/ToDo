import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import { styled } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
import dayjs from 'dayjs';

const StyledCalendar = styled(Calendar)(({ theme }) => ({
  width: '100%',
  maxWidth: '100%',
  backgroundColor: theme.palette.mode === 'dark' ? 'rgba(10,10,10)' : 'rgba(235,235,235)',
  backdropFilter: 'blur(5px)',
  WebkitBackdropFilter: 'blur(5px)',
  fontFamily: "'Arial', 'Helvetica', sans-serif",
  lineHeight: '2em',
  padding: '10px',
  borderRadius: '5px',
}));

const CustomCalendar = styled('div')(({ theme }) => ({
  '& .react-calendar__navigation': {
    display: 'flex',
    marginTop: '2%',
    marginLeft: '5%',
    marginRight: '5%',
    height: '40px',
    marginBottom: '1em',
  },
  '& .react-calendar button': {
    margin: 0,
    border: 0,
    outline: 'none',
  },
  '& .react-calendar__navigation button': {
    minWidth: '44px',
    backgroundColor: theme.palette.mode === 'dark' ? 'rgba(10,10,10)' : 'rgba(245,245,245)',
  },
  '& .react-calendar__month-view__weekdays': {
    textAlign: 'center',
    textTransform: 'uppercase',
    font: 'inherit',
    fontSize: '0.75em',
    fontWeight: 'bold',
    color: theme.palette.mode === 'dark' ? '#34b3db' : 'rgba(26, 52, 59, 0.65)',
  },
  '& .react-calendar__tile': {
    backgroundColor: theme.palette.mode === 'dark' ? 'rgba(20,20,20)' : '#FFFFFF',
    backdropFilter: 'blur(5px)',
    WebkitBackdropFilter: 'blur(5px)',
    height: '40px',
    margin: '5px',
    width: '40px', 
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  '& .react-calendar__tile--now': {
    background: theme.palette.mode === 'dark' ? '#000000' : '#FFFFFF',
    color: theme.palette.mode === 'dark' ? '#FFFFFF' : '#000000',
  },
  '& .react-calendar__tile--now:enabled:hover, .react-calendar__tile--now:enabled:focus': {
    background: '#ffffa9',
  },
  '& .task-dot': {
    height: '8px',
    width: '8px',
    backgroundColor: theme.palette.mode === 'dark' ? '#34b3db' : '#df2935',
    borderRadius: '50%',
    position: 'absolute',
    bottom: '3px', 
  },
}));

const CalendarComponent = () => {
  const theme = useTheme();
  const [tasks, setTasks] = useState({});

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || {};
    setTasks(savedTasks);
  }, []);

  const getTileContent = ({ date, view }) => {
    if (view === 'month') {
      const formattedDate = dayjs(date).format('YYYY-MM-DD');

      if (Array.isArray(tasks)) {
        const taskForTheDay = tasks.filter((task) => task.date === formattedDate);

        if (taskForTheDay.length > 0) {
          return <div className="task-dot"></div>; 
        }
      }
    }
    return null;
  };


  return (
    <CustomCalendar>
      <StyledCalendar
        locale="en-US"
        tileClassName="react-calendar__tile"
        navigationClassName="react-calendar__navigation"
        tileContent={getTileContent}
      />
    </CustomCalendar>
  )
}

export default CalendarComponent;
