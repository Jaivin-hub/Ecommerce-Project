var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var db = require('./config/connection')
var fileUpload = require('express-fileupload');
var dotenv = require('dotenv');
var userRouter = require('./routes/users');

var jwt = require('jsonwebtoken')

var app = express();

dotenv.config()
app.use(cors()) 
// app.use((req, res, next)=> {
//   res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4000');
// });
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(fileUpload())
app.use(logger('dev'));
app.use(cookieParser());
app.use(cors())
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ limit: '50mb', extended: true }))



app.use(express.static(path.join(__dirname, 'public')));

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin,X-Requested-With,Content-Type,Accept')
  next()
})
db.connect((err) => {
  if (err) console.log('connection error' + err)
  else console.log('Database connected to port');
})


//app.use("/payment", require("./routes/payment"));

app.use('/users', userRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});



// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(5000);

module.exports = app;
