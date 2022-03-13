const express = require('express');
const db = require('./db');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set('trust proxy', true);
app.use('/', require('./routes/index'));

app.get('*', (req, res) => {
  res.statusCode = 404;
  res.send("Resource does not exist");
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT} ...`);
});