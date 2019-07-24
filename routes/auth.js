var express = require("express");
var router = express.Router();
var passport=require("passport");
var User =require("../models/user");
//Auth ROUTES
router.get("/register",function(req,res){
	res.render("register");
});
router.post("/register",function(req,res){
	User.register(new User({username:req.body.username}),req.body.password,function(err,user){
		if(err)
		{
			console.log(err);
			return res.render("register");
		}
		passport.authenticate('local')(req,res,function(){
			res.redirect("/campgrounds");
		});
	});
});

 
// Login Route
router.get("/login",function(req,res){
	res.render("login",{message:req.flash("error")});
});


router.post("/login",passport.authenticate('local',{
	successRedirect:"/campgrounds",
	failureRedirect:"/login"
	}),function(req,res){

});


router.get("/logout",function(req,res){
	req.logout();
	req.flash("error","Logged You Out");
	res.redirect("/campgrounds")
});
// function isLoggedIn(req,res,next){
// 	if(req.isAuthenticated()){
// 		return next();
// 	}
// 	res.redirect("/login");
// }
module.exports = router ;