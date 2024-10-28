// src/components/PieChartComponent.js
import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
import chroma from 'chroma-js';

// Register the required elements
Chart.register(ArcElement, Tooltip, Legend);

// Function to format values
const formatValue = (value) => {
    if (value >= 1e9) {
        return (value / 1e9).toFixed(2) + 'B'; // Convert to billions
    } else if (value >= 1e6) {
        return (value / 1e6).toFixed(2) + 'M'; // Convert to millions
    }
    return value.toString(); // Return as is if less than a million
};

const PieChartComponent = ({ chartData }) => {
    const { labels, data } = chartData;

    // Generate a distinct color palette based on the number of labels
    const colors = chroma.scale('Set3').colors(data.length); // Use a color scale

    // Create a dataset for the pie chart
    const pieChartData = {
        labels: labels.map((label, index) => `${label} (${formatValue(data[index])})`), // Add formatted values to labels
        datasets: [
            {
                data: data,
                backgroundColor: colors,
                hoverBackgroundColor: colors.map(color => chroma(color).alpha(0.7).css()), // Slightly transparent colors on hover
            },
        ],
    };

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
            <Pie data={pieChartData} />
        </div>
    );
};

export default PieChartComponent;
