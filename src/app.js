var createError = require('http-errors');
var express = require('express');
var path = require('path');
const cors = require('cors')
var cookieParser = require('cookie-parser');
var logger = require('morgan');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const productsRouter = require("./routes/products")
const cartRouter = require("./routes/cart")
const productsApisRoutes = require('./routes/apisRoutes/productsApisRoutes')
const usersApisRoutes = require('./routes/apisRoutes/usersApisRoutes')
const methodOverride = require("method-override");
const session = require("express-session")
const checkSessionErrorRegister = require("./middlewares/checkSessionErrorRegister");
const checkSessionErrorLogin = require("./middlewares/checkSessionErrorLogin");
const cookieCheck = require('./middlewares/cookieCheck');
const localsCheck = require('./middlewares/localsCheck');
const paginate = require('express-paginate')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));
app.use(methodOverride('_method'));
app.use(session({
  secret: 'fullgaming',
  resave: false,
  saveUninitialized: true
}))
app.use(cookieCheck);// antes de que haya una session levantada
app.use(localsCheck);

app.use(checkSessionErrorRegister);
app.use(checkSessionErrorLogin);

app.use(paginate.middleware(5,50))//middleware de la paginacion. El primer num(funciona como el limit de sql) es la cantidad minima por pagina, la segunda es el maximo

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter);
app.use('/cart', cartRouter);
app.use('/api/products',productsApisRoutes);
app.use('/api/users',usersApisRoutes)



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
