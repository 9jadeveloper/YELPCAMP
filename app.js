var express          = require("express"),
    app              = express(),
    bodyParser       = require("body-parser"),
    cookieParser     = require("cookie-parser"),
    flash            = require("connect-flash"),
    mongoose         = require("mongoose"),
    Comment          = require("./models/comment"),
    passport         = require("passport"),
    methodOverride   = require("method-override"),
    localStrategy    = require("passport-local"),
    Campground       = require("./models/campground"),
    seedDB           = require("./seeds"),
    User             = require("./models/user");
    
// configure dotenv
require('dotenv').config();

// requiring routes    
var authRoute        = require("./routes/auth"),
    campgroundRoute  = require("./routes/campgrounds"),
    commentRoute     = require("./routes/comments");

// assign mongoose promise library and connect to the database
mongoose.Promise = global.Promise;

const databaseUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/yelp_camp';

mongoose.connect(databaseUri, { useNewUrlParser: true,  useUnifiedTopology: true, useFindAndModify: false})
      .then(() => console.log(`Database connected`))
      .catch(err => console.log(`Database connection error: ${err.message}`));


// mongoose.connect("mongodb://localhost:27017/yelp_camp",  {useNewUrlParser: true,  useUnifiedTopology: true, useFindAndModify: false});
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.use(flash());
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");
app.use(cookieParser('secret'));
//require moment
app.locals.moment = require('moment');
// seedDB();

// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "I love you",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());    
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// middleware
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
}); 

app.use('/', authRoute);
app.use('/campgrounds', campgroundRoute);
app.use('/campgrounds/:id/comments', commentRoute);

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The yelpcamp server has gbera!!");
});
