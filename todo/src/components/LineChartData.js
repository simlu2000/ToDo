import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import dayjs from 'dayjs';



export default function LineChartData({ tasks }) {
    const data = tasks.map(task => ({
        date: task.date ? dayjs(task.date).format('YYYY-MM-DD') : 'N/A',
        completed: task.isCompleted ? 1 : 0,
    })).reduce((acc, cur) => { //con reduce aggreghiamo i dati in base alla data, quindi accumula risultati in un unico array
        //acc= accumulatore, array che accumula i dati aggregati
        //cur=elem corrente
        const existing = acc.find(item => item.date === cur.date);//per ogni cur vediamo se esiste un oggetto in acc con la stessa data
        if (existing) { //se esiste sommiamo valore di completed ad oggetto esistente (se ci sono piu task completati nel giorno le sommo in completed)
            existing.completed += cur.completed;
        } else { //non esiste, aggiungiamo l'oggetto corrente cur in acc
            acc.push(cur);
        }
        return acc;
    }, []);

    const dates = data.map(item => item.date);
    const completions = data.map(item => item.completed);
    console.log(dates);

    return (
        <LineChart data={data}
            xAxis={[{ data: dates }]}
            series={[{ data: completions }]}
            width={500}
            height={300}
        />

    );
}
