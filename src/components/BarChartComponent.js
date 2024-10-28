import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChartComponent = ({ chartData }) => {
    const data = {
        labels: chartData.labels,
        datasets: [
            {
                label: 'COVID-19 Cases Bar graph',
                data: chartData.data,
                backgroundColor: 'rgba(255, 189, 94, 0.5)', // Light orange for the bar chart
                borderColor: 'rgba(255, 159, 64, 1)', // Darker shade for the border
            },
        ],
    };

    return (
        <div>
            <Bar data={data} />
        </div>
    );
};

export default BarChartComponent;
