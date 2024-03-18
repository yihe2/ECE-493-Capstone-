const express = require("express");
const app = express();
const port = 3001;

app.use(express.json());

// Define a route for the root URL
app.get("/", (req, res) => {
  res.send("Hello, Express!");
});

app.post("/user/info", (req, res) => {
  const info = req.body;
  console.log(info);
  res.json({ status: "success" });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
