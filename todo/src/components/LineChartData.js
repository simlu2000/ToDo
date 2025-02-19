import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import dayjs from 'dayjs';

const LineChartData = ({ tasks }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    //attività completate negli ultimi 7 giorni
    const today = dayjs().startOf('day');
    const lastWeek = Array.from({ length: 7 }).map((_, i) => today.subtract(i, 'day'));

    const completedTasksPerDay = lastWeek.map(date => {
      const dayTasks = tasks.filter(task => {
        const taskDate = dayjs(task.date);
        return taskDate.isValid() && taskDate.isSame(date, 'day') && task.isCompleted;
      });
      return { date: date.format('YYYY-MM-DD'), completed: dayTasks.length };
    }).reverse();

    setData(completedTasksPerDay);
  }, [tasks]);

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart
        data={data}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="completed" stroke="#ffba08" activeDot={{ r: 8 }} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default LineChartData;
