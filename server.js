// npm modules imports
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookies = require('cookie-parser');
// npm modules imports - end

// import routes
const userAuthRoute = require('./routes/userAuthRoutes');
const cafeAuthRoute = require('./routes/cafeAuthRoutes');
const cafeOperations = require('./routes/cafeOperationsRoutes');
const userProfileRoute = require('./routes/userProfileRoutes');
const adminRoute = require('./routes/adminRoutes');
const mainRoute = require('./routes/mainRoutes');
// import routes - end

// import middlewares
const userAuthorization = require('./middlewares/userAuthorization');
const cafeAuthorization = require('./middlewares/cafeAuthorization');
// import routes - end

// start app
const app = express();
const db = require('./configs/database');
require('./models');

db.authenticate()
  .then(async () => console.log('connected successfully'))
  .catch(async (e) => console.log('connection failure'));

db.sync()
  .then(async (e) => console.log('Tables Synced.'))
  .catch(async (e) => console.log('Falied to Sync Tables'));

app.use(
  cors({
    origin: ['http://localhost:3001', 'http://localhost:3002'],
    credentials: true,
  })
);

app.use(cookies());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/uploads', express.static(__dirname + '/uploads'));
app.use('/api/user/profile', userAuthorization, userProfileRoute);
app.use('/api/admin', userAuthorization, adminAuthorization, adminRoute);
app.use('/api/cafes', userAuthorization, mainRoute);
app.use('/api/menu', cafeAuthorization, cafeOperations);
app.use('/api/user', userAuthRoute);
app.use('/api/cafe', cafeAuthRoute);

app.get('/', (req, res) => res.status(200).send('This is an api for cafeista'));

app.get('*', (req, res) => res.status(404).send('This page not found'));

const PORT = process.env.PORT || 3000;
app.listen(PORT || 3000, () => console.log(`Running on Port ${PORT}`));
