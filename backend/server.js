
require("dotenv").config();
const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const cors = require("cors");
const bcrypt = require("bcrypt");
const mysql = require("mysql2");
const jwt = require("jsonwebtoken");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// MySQL connection pooling setup
const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

pool.getConnection((err) => {
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

// JWT secret key
const JWT_SECRET = process.env.JWT_SECRET 
;

// Helper function to generate JWT
const generateToken = (user) => {
  return jwt.sign(user, JWT_SECRET, { expiresIn: '1h' });
};

// Routes
app.get("/data", (req, res) => {
  res.send("hello from server");
});

app.post("/api/register", (req, res) => {
  const { email, name, password } = req.body;

  if (!email || !name || !password)
    return res.status(400).send("Please enter all fields");

  pool.query("SELECT * FROM users WHERE email = ?", [email], (err, results) => {
    if (err) return res.status(500).send("Server error");
    if (results.length > 0) return res.status(400).send("User already exists");

    const hashedPassword = bcrypt.hashSync(password, 10);

    pool.query(
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

  if (!email || !password)
    return res.status(400).send("Please enter all fields");

  pool.query("SELECT * FROM users WHERE email = ?", [email], (err, results) => {
    if (err) return res.status(500).send("Server error");
    if (results.length === 0)
        return res.status(400).send("Invalid email or password");

    const user = results[0];
    const isMatch = bcrypt.compareSync(password, user.Password);

    if (!isMatch) return res.status(400).send("Invalid email or password");

    // // Generate JWT
    // const token = generateToken({ id: user.id, email: user.email });
    // console.log(token);
    
    // res.status(200).json({ token });
    res.status(200).send({ user});
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
