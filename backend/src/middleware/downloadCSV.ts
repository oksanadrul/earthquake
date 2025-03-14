import axios from 'axios';
import fs from 'fs';
import https from 'https';

// Function to download the CSV file from an external URL
const downloadCSV = async (url: string, downloadPath: string) => {
  // Create an HTTPS agent to bypass SSL certificate validation
  const agent = new https.Agent({
    rejectUnauthorized: false,  // Allow self-signed certificates
  });

  const writer = fs.createWriteStream(downloadPath);

  try {
    console.log(`Starting download from: ${url}`);

    const response = await axios.get(url, {
      responseType: 'stream',  // Important to download it as a stream
      httpsAgent: agent,  // Set custom HTTPS agent
    });

    console.log(`Received response with status code: ${response.status}`);

    // Pipe the response stream to the local file
    response.data.pipe(writer);

    return new Promise<void>((resolve, reject) => {
      writer.on('finish', () => {
        console.log('CSV file downloaded successfully');
        resolve();  // Resolve once the file is downloaded
      });
      writer.on('error', (err) => {
        console.error('Error writing the file:', err);
        reject(err);  // Reject if there's an error during the file write
      });
    });
  } catch (error) {
    console.error('Error during CSV download:', error);
    throw new Error('Failed to download CSV');  // Rethrow with a clear message
  }
};

export { downloadCSV };
