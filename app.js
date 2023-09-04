const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const path = require('path');
const mongoose = require('mongoose');
const mongoSanitize = require('express-mongo-sanitize');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const xss = require('xss-clean');
const hpp = require('hpp');
const connect = require('./db/connect');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const port = process.env.PORT || 8080;
const app = express();

//Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

//Safety net
process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION! Shutting down...');
  console.log(err.name, err.message, err);
  process.exit(1);
});

// serve static files
app.use(express.static(path.join(__dirname, './client/dist')));

//set certain security HTTP headers
app.use(helmet());
//limit requests from same ip to help prevent denial of service and brute force attacks
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, must wait 1 hour to try again.'
});
app.use('/', limiter);
// read data from body into req.body and limit body size
app.use(bodyParser.json({ limit: '10kb' }));
//parse data from cookie
app.use(cookieParser());
//Data sanitization. Protect against NoSQL query injection
app.use(mongoSanitize());
//Data sanitization. Protect against XSS
app.use(xss());
//Prevent parameter pollution
app.use(hpp());

app
  .use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    console.log(req.cookies);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
  })
  .use('', require('./routes'));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './client/dist', 'index.html'));
});

//Error handling to catch unhandled routes
app.all('*', (req, res, next) => {
  next(new AppError(`Cannot find ${req.originalUrl} on this server.`, 404));
});
// Global error handling middleware
app.use(globalErrorHandler);

connect.connectToMongo();

const server = app.listen(port);
console.log(`Listening on ${port}`);
module.exports = server;

process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION! Shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
