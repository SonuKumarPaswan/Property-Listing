const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello,Rainy!');
});
app.get("/users", (req, res) => {
  const users = [
    { id: 1, name:  'Rainy' },
    { id: 2, name: 'Sonu'}
  ]
  res.json(users);
});
app.post('/users', (req, res) => {
  const data = req.body;
  res.status(201).json({ message: 'User created successfully', user: data });
});

app.listen(3002, () => {
  console.log('Server is running on port 3002');
});