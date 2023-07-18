const bodyParser = require('body-parser');
const express = require('express');
const morgan = require('morgan');
const app = express();
const cors = require('cors');
const Routes = require('./routes');
//middleware
// app.use(express.urlencoded());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'));

// var corsOptions = {
//   origin: 'http://localhost:3000',
//   credentials: true, //access-control-allow-credentials:true
//   optionSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
// };
app.use(cors());

//

//database
//read public
app.use('/public', express.static('public'));
//router
Routes(app);

//handle errors

module.exports = app;
