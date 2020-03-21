const config = require("./config.json");
let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
let session = require('express-session');
let MongoStore = require('connect-mongo')(session);
let favicon = require('serve-favicon');
let User = require('./models/user');

app.use(favicon(__dirname + '/public/images/favicon.ico'));

mongoose.connect(config.mongourl, {useNewUrlParser: true, useUnifiedTopology: true});

let db = mongoose.connection;
mongoose.set('useCreateIndex', true);

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('Connected to MongoDB with no errors.');
});

app.use(session({
    secret: 'work hard',
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({
        mongooseConnection: db
    })
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

let routes = require('./routes/');

app.use(async (req, res, next) => {
    User.findById(req.session.userId, (err, user) => {
        req.user = user;
        app.locals.user = user;
        next();
    });
});

app.use('/', routes);

app.use((req, res, next) => {
  // /  next(404)
});

app.use((err, req, res) => {
    res.status(err.status || 500);
    res.send(err.message);
});

app.listen(config.port, function () {
    console.log('Express server started. Listing on port ' + config.port + '.');
});
