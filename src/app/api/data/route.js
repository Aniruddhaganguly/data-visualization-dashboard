// src/app/api/data/route.js
import axios from 'axios';
import Papa from 'papaparse';

export async function GET(req) {
  try {
    const confirmedCasesUrl = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv';
    const response = await axios.get(confirmedCasesUrl);

    // Parse CSV data
    const parsedData = Papa.parse(response.data, { header: true });

    return new Response(JSON.stringify(parsedData.data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error("Error fetching COVID data:", error);
    return new Response(JSON.stringify({ error: 'Failed to fetch data' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}