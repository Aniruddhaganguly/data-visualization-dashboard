import React from 'react';
import '../app/globals.css';

const Layout = ({ children }) => (
  <html lang="en">
    <head>
      <title>COVID-19 Data Analysis</title>
      <meta name="description" content="Visualize COVID-19 case data by country and year" />
      <link rel="icon" href="/favicon.ico" />
    </head>
    <body className="bg-gray-100 text-gray-900">
      <div className="min-h-screen flex flex-col">
        {/* Header */}
        <header className="bg-indigo-600 text-white shadow-md text-center py-4">
          <div className="container mx-auto">
            <h1 className="text-2xl font-semibold">
            COVID-19 Data Analysis
            </h1>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-grow container mx-auto p-4">
          {children}
        </main>

        {/* Footer */}
        <footer className="bg-gray-800 text-gray-200 text-center p-4">
          <p>Created by Aniruddha Ganguly</p>
          <p>Feel free to use this code as you like!</p>
          <p>Contact Email: aniruddha.ganguly98@gmail.com</p>
        </footer>
      </div>
    </body>
  </html>
);

export default Layout;
