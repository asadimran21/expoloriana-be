const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv').config();
const bodyParser = require('body-parser');
// const app = express();
const cors = require('cors');
const app = express();

//file imports
const { errorHandler } = require('./Middleware/ErrorMiddleware');
const connectDB = require('./Config/db');

//vars
// const port = process.env.PORT || 5000;
// connectDB();


const mongoose = require('mongoose');
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('connected to db');
  })
  .catch((err) => {
    console.log(err.message);
  });

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`serve at http://localhost:${port}`);
});


// app.use(bodyParser.urlencoded());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(cors('*'));

//routes
app.use('/api/posts', require('./Routes/PostRoutes'));
app.use('/api/treks', require('./Routes/TrekRoutes'));
app.use('/api/users', require('./routes/UserRoutes'));
app.use('/api/favorites', require('./routes/FavoriteRoutes'));

app.use(errorHandler);

app.listen(port, () => console.log(`Server started at port ${port}`));
