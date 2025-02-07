// express-backend/server.js
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const oracledb = require("oracledb");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Oracle DB connection details
const dbConfig = {
  user: "system", // Replace with your Oracle DB username
  password: "1234", // Replace with your Oracle DB password
  connectString: "localhost:1521/XE" // Oracle DB connect string
};

// Route to handle form submission
app.post("/submit", async (req, res) => {
  const { name, email } = req.body;

  console.log("Received data:", name, email); // Log the received data

  try {
    // Connect to Oracle DB
    const connection = await oracledb.getConnection(dbConfig);

    // SQL query to insert data into Oracle DB
    const result = await connection.execute(
      `INSERT INTO users (name, email) VALUES (:name, :email)`,
      [name, email],
      { autoCommit: true }
    );

    // Close the connection
    await connection.close();

    res.json({ message: "Data submitted successfully!" });
  } catch (error) {
    console.error("Error interacting with the Oracle DB:", error);
    res.status(500).json({ error: "Failed to submit data" });
  }
});

// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
