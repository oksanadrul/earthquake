import csv from 'csv-parser';
import fs from 'fs';
import { Earthquake } from '../models/earthquake';

// Function to parse CSV and insert the data into MongoDB
export const importCSVToMongoDB = async (csvFilePath: string) => {
  const earthquakes: {
    location: { longitude: string; latitude: string };
    magnitude: string;
    date: string;
  }[] = [];

  fs.createReadStream(csvFilePath)
    .pipe(csv())
    .on('data', (row) => {
      earthquakes.push({
        location: {
          longitude: row.Longitude,
          latitude: row.Latitude,
        },
        magnitude: row.Magnitude,
        date: row.DateTime,
      });
    })
    .on('end', async () => {
      console.log('CSV file processed successfully');

      // Insert the earthquake data into MongoDB
      try {
        await Earthquake.insertMany(earthquakes); // Bulk insert into MongoDB
        console.log('Data successfully inserted into MongoDB');
      } catch (error) {
        console.error('Error inserting data into MongoDB:', error);
      }
    })
    .on('error', (err) => {
      console.error('Error reading the CSV file:', err);
    });
};
