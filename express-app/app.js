const express = require('express');
const app = express();
const port = 3001;


// Define a route for the root URL
app.get('/', (req, res) => {
  res.send('Hello, Express!');
});


app.

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
