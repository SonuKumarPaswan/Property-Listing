const express = require("express");
const cors = require("cors");
const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173"],
  }),
);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello,Rainy!");
});

app.get("/users", (req, res) => {
  const users = [
    {id: 1, name: "Rainy"},
    {id: 2, name: "Sonu"},
  ];
  res.json(users);
});

app.post("/users", (req, res) => {
  const data = req.body;
  res.status(201).json({message: "User created successfully", user: data});
});

app.listen(8085, () => {
  console.log("Server is running on port 8085");
});
