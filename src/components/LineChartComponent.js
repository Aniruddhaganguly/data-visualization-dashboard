import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

// Register the necessary components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const ChartComponent = ({ chartData, country }) => {
  if (!chartData) {
    return <p>No data available for the chart.</p>;
  }

  // Data setup with formatted labels
  const data = {
    labels: chartData.labels,
    datasets: [
      {
        label: 'COVID-19 Cases Line chart',
        data: chartData.data,
        borderColor: 'rgba(75, 192, 193, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
      },
    ],
  };

  // Format numbers in millions or billions
  const formatNumber = (value) => {
    if (value >= 1e9) return `${(value / 1e9).toFixed(1)}B`; // Billions
    if (value >= 1e6) return `${(value / 1e6).toFixed(1)}M`; // Millions
    return value;
  };

  // Chart options
  const options = {
    responsive: true,
    scales: {
      y: {
        ticks: {
          callback: function (value) {
            return formatNumber(value);
          },
          color: '#333', // Customize tick color for better contrast
        },
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            const label = context.dataset.label || '';
            const value = formatNumber(context.raw);
            return `${label}: ${value}`;
          },
        },
      },
    },
  };

  return (
    <div className="w-full lg:w-4/5 xl:w-2/3 mx-auto">
      <Line data={data} options={options} />
    </div>
  );
};

export default ChartComponent;