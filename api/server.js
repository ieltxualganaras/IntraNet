// ============================  BASE SETUP  ===================================

var express    = require('express');             // call express
    app        = express();                      // define our app using express
    bodyParser = require('body-parser'),
    http       = require('http'),
    mongoose   = require('mongoose'),
    bodyParser = require('body-parser'),
    cors       = require('./config/cors'),
    database   = require('./config/database'),
    expressJwt = require('express-jwt');

// ============================  CONFIGURATION  ================================

var port = process.env.PORT || 3000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cors.allowCrossDomain);

mongoose.connect(database.url, function(error) {
  if (error)
    throw error
  else
    console.log('mongo ok');
})

// ============================= ROUTES ========================================

var router = express.Router(),
    authenticate = express.Router();
require('./routes/routes')(router);
require('./routes/authenticate')(authenticate);

router.use(function(req, res, next) {
  console.log('Something is happening.');         // do logging
  next();
});

app.use('/auth',authenticate);                          //prefix routes with /api
app.use('/api', expressJwt({secret: 'sarabaram'}),router);
// ============================ START ==========================================
app.listen(port);
