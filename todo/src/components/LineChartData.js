import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import dayjs from 'dayjs';

export default function LineChartData({ tasks }) {
    const today = dayjs();
    const lastWeek = today.subtract(7, 'day');

    const data = tasks
        .filter(task => task.date && dayjs(task.date).isValid() && dayjs(task.date).isAfter(lastWeek))
        .map(task => ({
            date: dayjs(task.date).format('YYYY-MM-DD'),
            completed: task.isCompleted ? 1 : 0, // Or: completed: Boolean(task.isCompleted) ? 1 : 0
        }))
        .reduce((acc, cur) => {
            const existing = acc.find(item => item.date === cur.date);
            if (existing) {
                existing.completed += cur.completed;
            } else {
                acc.push(cur);
            }
            return acc;
        }, []);

    const dates = data.map(item => item.date);
    const completions = data.map(item => item.completed);

    console.log("Data:", data); // Debugging
    console.log("Dates:", dates); // Debugging
    console.log("Completions:", completions); // Debugging

    if (data.length === 0) {
        return <div>No data to display</div>;
    }

    return (
        <LineChart
            xAxis={[{ data: dates }]}
            series={[{ data: completions }]}
            width={500}
            height={300}
        />
    );
}