// src/app/dashboard/summary.js
"use client";
import React, { useEffect, useState } from 'react';
import PieChartComponent from '../../components/PieChartComponent';
import Link from 'next/link';
// src/components/PieChartComponent.js
import './PieChartComponent.css';

const Summary = () => {
    const [pieChartData, setPieChartData] = useState({ labels: [], data: [] });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/data');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const jsonData = await response.json();
                updatePieChartData(jsonData);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);

    // Function to update Pie Chart data for all countries/regions
    const updatePieChartData = (data) => {
        const countryTotals = {};

        // Aggregate total cases for each country
        data.forEach(item => {
            const country = item['Country/Region'];
            const totalCasesForCountry = Object.values(item).slice(1).reduce((acc, value) => acc + (Number(value) || 0), 0);
            countryTotals[country] = (countryTotals[country] || 0) + totalCasesForCountry;
        });

        // Prepare data for Pie Chart
        const labels = Object.keys(countryTotals);
        const totalCases = Object.values(countryTotals);

        setPieChartData({ labels, data: totalCases });
    };

    return (
        <div className="pie-chart-container">
            <h1 className="pie-chart-title">COVID-19 Summary</h1>
            <PieChartComponent chartData={pieChartData} />
            <div className="pie-chart-links">
                <div>
                    <Link  href="/" className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-300 transition">Go to Home</Link>

                </div>
                <div>
                    <Link  href="/dashboard" className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-300 transition">Go to Data Trend</Link>

                </div>
        </div>
        </div>
    );
};

export default Summary;
