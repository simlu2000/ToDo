import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const PieChartCategoriesData = ({ tasks }) => {
  const data = Object.values(
    tasks.reduce((acc, task) => {
      if (!acc[task.category]) {
        acc[task.category] = { category: task.category, value: 0 };
      }
      acc[task.category].value += task.isCompleted ? 1 : 0;
      return acc;
    }, {})
  );

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <>
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ category, percent }) => `${category}: ${(percent * 100).toFixed(0)}%`}
            outerRadius={150}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
      {/*Legenda*/}
      <div className="legend">
        {data.map((entry, index) => (
          <div key={`legend-item-${index}`} className="legend-item">
            <div
              className="legend-color"
              style={{ backgroundColor: COLORS[index % COLORS.length] }} //imposto colore in base all'ordine categorie nell'array colors
            ></div>
            <div className="legend-text" style={{ color: COLORS[index % COLORS.length] }} >{entry.category}</div>
          </div>
        ))}
      </div>
    </>
  );
};

export default PieChartCategoriesData;