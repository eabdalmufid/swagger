const express = require('express');
const morgan = require('morgan');
const path = require('path');
const db = require('./config/database');
const auth = require('./routes/auth');
const youtube = require('./routes/youtube');
const swagger = require('./swagger/swagger');
require('dotenv').config();

const app = express();
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

app.enable('trust proxy');
app.set('json spaces', 2);

app.use(express.static(path.join(__dirname, 'views')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.use('/api/auth', auth);
app.use('/api/youtube', youtube);

swagger(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});