const express = require('express');
const app = express();
const cors = require('cors')
const user = require('./routes/user');

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({limit: "100mb", extended: true }));

app.use('/api/v1', user);



module.exports = app