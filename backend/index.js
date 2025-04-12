const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const candidateRoutes = require('./routes/candidates');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api/candidates', candidateRoutes);

app.listen(5000, () => {
  console.log("Backend running on http://localhost:5000");
});
