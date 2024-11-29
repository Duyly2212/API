var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose'); // Thêm mongoose

// Import các mô hình
var BoMon = require('./models/bomonModels');
var SinhVien = require('./models/sinhvienModels');
var Diem = require('./models/diemModels');
var MonHoc = require('./models/momhocModels');
var Khoa = require('./models/khoaModels');

// Import các router
var boMonRouter = require('./routes/boMonRouter');  // Import đúng router
var sinhVienRouter = require('./routes/sinhVienRouter'); 
var diemRouter = require('./routes/diemRouter');
var monHocRouter = require('./routes/monHocRouter');
var khoaRouter = require('./routes/khoaRouter');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Kết nối MongoDB
mongoose.connect('mongodb+srv://duylkps25738:zeow9bn4g1xMTrd7@cluster0.74ayr.mongodb.net/Assigment')
  .then(() => console.log('>>>>>>>>>> DB Connected!!!!!!'))
  .catch(err => console.log('>>>>>>>>> DB Error: ', err));

// Sử dụng các router
app.use('/boMon', boMonRouter);  // Đảm bảo rằng bạn đang sử dụng các router đúng cách
app.use('/sinhVien', sinhVienRouter); 
app.use('/diem', diemRouter);
app.use('/monHoc', monHocRouter);
app.use('/khoa', khoaRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
