// src/app/dashboard/page.js
"use client";
import React, { useEffect, useState } from 'react';
import LineChartComponent from '../../components/LineChartComponent';
import BarChartComponent from '@/components/BarChartComponent';
import Filter from '../../components/Filter';
import './Dashboard.css';  // Import CSS for styling
import Link from 'next/link';
const Dashboard = () => {
    const [chartData, setChartData] = useState({ labels: [], data: [] });
    
    const [countries, setCountries] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState('Japan');
    const [selectedYear, setSelectedYear] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/data');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const jsonData = await response.json();

                const uniqueCountries = ['Whole World', ...new Set(jsonData.map(item => item['Country/Region']))];
                setCountries(uniqueCountries);

                // Update pie chart data for the whole world
                updatePieChartData(jsonData);

                // Update line and bar chart data based on selected country and year
                updateChartData(jsonData, selectedCountry, selectedYear);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/data');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const jsonData = await response.json();

                // Update line and bar chart data based on selected country and year
                updateChartData(jsonData, selectedCountry, selectedYear);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, [selectedCountry, selectedYear]);

    const updateChartData = (data, country, year) => {
        if (country === 'Whole World') {
            const labels = Object.keys(data[0]).filter(key => key !== 'Country/Region');
            const aggregatedData = labels.map(label => {
                const yearlyData = data.map(item => Number(item[label]) || 0);
                return yearlyData.reduce((sum, value) => sum + value, 0);
            });

            const filteredLabels = year
                ? labels.filter(label => new Date(label).getFullYear() === Number(year))
                : labels;

            setChartData({ labels: filteredLabels.slice(3), data: aggregatedData.slice(3) });
        } else {
            const countryData = data.filter(item => item['Country/Region'] === country);
            const labels = Object.keys(countryData[0]).filter(key => key !== 'Country/Region');
            const filteredLabels = year
                ? labels.filter(label => new Date(label).getFullYear() === Number(year))
                : labels;

            const chartData = filteredLabels.map(label => Number(countryData[0][label]) || 0);
            setChartData({ labels: filteredLabels.slice(3), data: chartData.slice(3) });
        }
    };

   

    return (
        <div className="dashboard-container">
            <h1 className="dashboard-title">COVID-19 Data Trend Dashboard</h1>
            <Filter
                countries={countries}
                selectedCountry={selectedCountry}
                onCountryChange={setSelectedCountry}
                selectedYear={selectedYear}
                setSelectedYear={setSelectedYear}
            />
            <LineChartComponent chartData={chartData} country={selectedCountry} />
            <BarChartComponent chartData={chartData} />
           

            <div className="data-chart-links">
                <div>
                    <Link  href="/" className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-300 transition">Go to Home</Link>

                </div>
                <div>
                    <Link  href="/summary" className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-300 transition">Go to Summary</Link>

                </div>
        </div>
        </div>
    );
};

export default Dashboard;
