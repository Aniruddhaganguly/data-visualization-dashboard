// src/components/Filter.js
import React from 'react';
import './Filter.css';

const Filter = ({ countries, selectedCountry, onCountryChange, selectedYear, setSelectedYear }) => {
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 5 }, (_, i) => currentYear - i);

    return (
        <div className="filter-container">
            <label htmlFor="country-select" className="filter-label">Select a country:</label>
            <select
                id="country-select"
                className="filter-select"
                value={selectedCountry}
                onChange={(e) => onCountryChange(e.target.value)}
            >
                {countries.map((country, index) => (
                    <option key={`${country}-${index}`} value={country}>
                        {country}
                    </option>
                ))}
            </select>

            <label className="filter-label">
                Select Year:
                <select
                    className="filter-select"
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                >
                    <option value="">All Years</option>
                    {years.map((year) => (
                        <option key={year} value={year}>
                            {year}
                        </option>
                    ))}
                </select>
            </label>
        </div>
    );
};

export default Filter;