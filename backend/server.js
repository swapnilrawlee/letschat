require("dotenv").config();
const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const cors = require("cors");
const bcrypt = require("bcrypt");
const mysql = require("mysql2");
const app = express();
const server = http.createServer(app);
const io = socketio(server);

// MySQL connection setup
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    process.exit(1);
  }
  console.log("Connected to MySQL");
});

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN,
    credentials: true,
  })
);

app.get("/data", (req, res) => {
  res.send("hello from server");
});

app.post("/api/register", (req, res) => {
  const { email, name, password } = req.body;

  // Check if all fields are present
  if (!email || !name || !password)
    return res.status(400).send("Please enter all fields");

  // Check if user already exists
  db.query("SELECT * FROM users WHERE email = ?", [email], (err, results) => {
    if (err) return res.status(500).send("Server error");
    if (results.length > 0) return res.status(400).send("User already exists");

    // Hash password
    const hashedPassword = bcrypt.hashSync(password, 10);

    // Create user
    db.query(
      "INSERT INTO users (email, name, password) VALUES (?, ?, ?)",
      [email, name, hashedPassword],
      (err) => {
        if (err) return res.status(500).send("Server error");
        res.status(201).send("User registered successfully");
      }
    );
  });
});
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;
    console.log(email);
    console.log(password);

  // Check if all fields are present
  if (!email || !password)
    return res.status(400).send("Please enter all fields");

  // Check if user exists
  db.query("SELECT * FROM users WHERE email = ?", [email], (err, results) => {
    if (err) return res.status(500).send("Server error");
    
    // If no user found
    if (results.length === 0)
        return res.status(400).send("Invalid email or password");
    
    const user = results[0];
    
    // Compare password
    const isMatch = bcrypt.compareSync(password, user.Password);

    if (!isMatch) return res.status(400).send("Invalid email or password");

    // Authentication successful
    res.status(200).send("Login successful");
  });
});

// Socket.io connection
io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("message", (data) => {
    console.log("Message received:", data);
    io.emit("message", data);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

// Start server
const PORT = process.env.PORT || 3030;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
