import React from 'react';
import Link from 'next/link';
import './homepge.css'
const HomePage = () => (
  <main className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
    <div className="max-w-3xl text-center bg-white shadow-lg rounded-lg p-8">
      <h1 className="text-4xl font-bold text-indigo-600 mb-4">Welcome to the COVID-19 Data Dashboard</h1>
      <p className="text-gray-700 mb-6">
        Track the progression of COVID-19 cases globally, with data visualization by country and year. Explore the trends and view key statistics to understand the impact of the pandemic worldwide.
      </p>
      <div className="homePage-links">
                <div>
                    <Link  href="/dashboard" className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-300 transition">Go to Data Trend</Link>

                </div>
                <div>
                    <Link  href="/summary" className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-300 transition">Go to Summary</Link>

                </div>
        </div>



    </div>
  </main>
);

export default HomePage;
