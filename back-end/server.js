const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');

const port = 3001;

// Serve static assets (React app) from the 'build' directory
app.use(express.static(path.join(__dirname, 'build')), cors());

// Serve the React app for all routes
app.get('*', (req, res) => {
  res.json({message: 'GET Data received from the front-end', data: req.url});
});

// Simple endpoint to handle incoming requests
app.post('http://192.168.11.131:3000', (req, res) => {
  // Access request body data
  const requestData = req.body;

  // Process data or perform actions based on the request
  // For simplicity, let's just echo the received data
  res.json({ message: 'POST Data received from the front-end', data: requestData });
});

app.listen(port, () => {
  console.log(`Server is running on http://192.168.11.131:${port}`);
});
