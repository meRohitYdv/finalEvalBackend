const express = require('express');
const content = require('./routes/content');
const collections = require('./routes/collection');
const validateJWT = require('./middlewares/validateJWT');
const cors = require('cors');

const app = express();
const port = 3001;

var corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200
}
app.use(cors(corsOptions));

app.use(express.json());
app.use(validateJWT);

app.use('/contents', content);
app.use('/collections', collections);



app.listen(port, () =>
  console.log(`Backend server listening at http://localhost:${port}`)
);