const express = require('express');
const account = require("./Account.js")
const app = express();
const port = 3001;


app.use(express.json());


// Define a route for the root URL
app.get('/', (req, res) => {
  res.send('Hello, Express!');
});


app.post('/create-account', async (req, res) => {
  try {
    const data = req.body; // Assuming you're sending data in the request body
    await account.insertUser("test@email.com", "passwardo", 10); // filler
    res.status(201).json({ message: 'Data written to MongoDB successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
