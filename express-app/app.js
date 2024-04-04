const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const account = require("./Account.js");
const app = express();
const port = 3001;
const authRoutes = require("./Routes/AuthRoutes.js");
const cookieParser = require("cookie-parser")
require('dotenv').config()

app.use(express.json());

// Define a route for the root URL
// app.get('/', (req, res) => {
//   res.send('Hello, Express!');
// });


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


const uri = "mongodb+srv://mehta1:4Y8d1Y2uADwpzaWE@cluster0.w4dfpbc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(uri, {}).then(() => {
  console.log("DB Connection Successful")
}).catch(err => {
  console.log(err.message)
})

app.use(cors({
  origin: ["http://localhost:3000"], // change later
  method: ["GET", "POST", "DELETE"],
  credentials: true,
}));
app.use(cookieParser());
app.use(express.json());
app.use("/", authRoutes);

