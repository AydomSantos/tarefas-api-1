const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Rotas
app.get('/api/data', (req, res) => {
  // Handle GET request for data
  res.json({ message: 'Hello from the server!' });
});


const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});