
const https = require('https');
const fs = require('fs');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const port = 3001;
const authRoutes = require("./Routes/AuthRoutes.js");
const cookieParser = require("cookie-parser")
require('dotenv').config()

const options = {
  key: fs.readFileSync( process.env.SERVER_KEY),
  cert: fs.readFileSync( process.env.SERVER_CERT)
};


app.use(express.json());

// Define a route for the root URL
// app.get('/', (req, res) => {
//   res.send('Hello, Express!');
// });

// debug route
app.post('/sanity-check', async (req, res) => {
  try {
    console.log("here")
    const data = req.body; // Assuming you're sending data in the request body
    // await account.insertUser("test@email.com", "passwardo", 10); // filler
    return res.status(201).json({ message: 'Data written to MongoDB successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }});

app.get("/", (req, res) => {
  res.send("Hello, Express!");
});


// Start the server
server = app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});


module.exports = {app, server};

// FR48 -> Mongo instance chosen encrypted as default state
const uri = "mongodb+srv://mehta1:4Y8d1Y2uADwpzaWE@cluster0.w4dfpbc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(uri, {}).then(() => {
  console.log("DB Connection Successful")
}).catch(err => {
  console.log(err.message)
})

app.use(cors({
  origin: ["http://localhost:3000"],
  method: ["GET", "POST", "DELETE"],
  credentials: true,
}));
app.use(cookieParser());
app.use(express.json());
app.use("/", authRoutes);


// FR49 -> underutilzed -> works in conjunction with server.cert and server.key
// would be secrets in production
https.createServer(options, app).listen(443);

