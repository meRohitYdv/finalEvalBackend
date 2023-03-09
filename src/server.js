const express = require('express');
const content = require('./routes/content');
const validateJWT = require('./middlewares/validateJWT');
const cors = require('cors');

const app = express();
const port = 3001;
app.use(express.json());
app.use(validateJWT);

var corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200
}
app.use(cors(corsOptions));
app.use('/contents', content);

app.get('/', (req, res)=>{
  res.status(200).send('Hi there!!!');
});


app.listen(port, () =>
  console.log(`Backend server listening at http://localhost:${port}`)
);