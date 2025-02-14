import React from 'react';
import Calendar from 'react-calendar';
import { styled } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';

const StyledCalendar = styled(Calendar)(({ theme }) => ({
  width: '100%',
  maxWidth: '100%',
  backgroundColor: theme.palette.mode === 'dark' ? 'rgba(68, 162, 191, 0.58)' : 'rgba(69, 167, 197, 0.47)',
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
    backgroundColor: theme.palette.mode === 'dark' ? 'rgba(68, 162, 191, 0.58)' : 'rgba(238, 251, 255, 0.65)',

  },
  '& .react-calendar__month-view__weekdays': {
    textAlign: 'center',
    textTransform: 'uppercase',
    font: 'inherit',
    fontSize: '0.75em',
    fontWeight: 'bold',
    color: 'orangered',
  },
  '& .react-calendar__month-view__days__day--weekend': {
    color: '#FF2525',
  },
  '& .react-calendar__month-view__days__day--neighboringMonth, .react-calendar__decade-view__years__year--neighboringDecade, .react-calendar__century-view__decades__decade--neighboringCentury': {
    color: '#FF2525',
  },
  '& .react-calendar__tile': {
    backgroundColor: theme.palette.mode === 'dark' ? 'rgba(68, 162, 191, 0.58)' : 'rgba(238, 251, 255, 0.65)',
    backdropFilter: 'blur(5px)',
    WebkitBackdropFilter: 'blur(5px)',
    height: '40px',
    margin: '25px',
    width: '20px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  '& .react-calendar__tile--now': {
    background: '#FFFFFF',
    color: '#000000',
  },
  '& .react-calendar__tile--now:enabled:hover, .react-calendar__tile--now:enabled:focus': {
    background: '#ffffa9',
  },
  '& .task-counter': {
    fontSize: '0.8rem',
  },
}));

const CalendarComponent = () => {
  const theme = useTheme();  

  return (
    <CustomCalendar>
      <StyledCalendar
        locale="en-US"  
        tileClassName="react-calendar__tile"
        navigationClassName="react-calendar__navigation"
      />
    </CustomCalendar>
  );
}

export default CalendarComponent;
