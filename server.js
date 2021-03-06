const express = require('express');
const connectDB = require('./config/db');
const app = express();

app.get('/', (req, res) => {
  res.send('API Running');
});
//Connect Database
connectDB();
//Init milddleWare
app.use(express.json({ extended: false }));

// Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  `Server started on port ${PORT}`;
});
