var express = require("express");
var app = express();
var bodyparser = require("body-parser");
var mongoose = require("mongoose");
var Campground=require("./models/campgrounds");
var methodOverride = require("method-override");
var Comment =require("./models/comments");
var User =require("./models/user");
var seedDB = require("./seed");
var passport=require("passport");
var passportLocal= require("passport-local");
var passportLocalMongoose=require("passport-local-mongoose");
var flash = require("connect-flash");


var commentRoutes = require('./routes/comment');
var campgroundRoutes = require('./routes/campground');
var authRoutes = require('./routes/auth');
app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static(__dirname+"/public"));
app.use(methodOverride("_method"));		
app.set("view engine","ejs");
app.use(flash());
mongoose.connect("mongodb://localhost/yelpcamp3", { useNewUrlParser: true });
// seedDB();
// Campground.create({
// 	name:"a1",
// 	image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTojcW7mENZWs0VSk3Z9BKAFjkMaC1Kam3cjqYL_vuw8LWdt9fj6A",
// 	description:"qwejfdjcnjnkjsd jdbsckjkjsdb sdubckj kjd sbcks nkk"
// })


//Passport Configuration
app.use(require("express-session")({
	secret:"Ab nhi ho rha",
	resave : false,
	saveUninitialized: false
})); 
app.use(passport.initialize());
app.use(passport.session());
passport.use(new passportLocal(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){
	res.locals.currentUser = req.user;
	res.locals.message = req.flash("error");
	next();
});

app.get("/",function(req,res){
	res.render("landing");
});

app.use(authRoutes);
app.use(commentRoutes);
app.use(campgroundRoutes);



app.listen(3000,function(){
	console.log("server has started");
});