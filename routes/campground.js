var express = require("express");
var router = express.Router({mregeParams:true});
var Campground=require("../models/campgrounds");
var middleWare =require("../middleware");

router.get("/campgrounds",middleWare.isLoggedIn,function(req,res){
	//console.log(req.user);
	Campground.find({},function(err,allCampgrounds){
		if(err)
			console.log(err);
		else
			res.render("campgrounds/campgrounds",{campgrounds:allCampgrounds});
	})
});

router.post("/campgrounds",middleWare.isLoggedIn,function(req,res){
	var name = req.body.name;
	var image = req.body.image;
	var desc= req.body.description;
	var author = {
		id:req.user._id,
		username:req.user.username 
	}
	var newObject = {name:name,image:image,description:desc,author:author};
	Campground.create(newObject,function(err,newlyCreated){
		if(err)
			console.log(err);
		else
			res.redirect("/campgrounds");
	})
});

router.get("/campgrounds/new",function(req,res){
	res.render("campgrounds/new");
});	

router.get("/campgrounds/:id",function(req,res){
	Campground.findById(req.params.id).populate("comments").exec(function(err,found){
		if(err)
			console.log(err);
		else{
			console.log(found);
			res.render("campgrounds/show",{camp:found});
		}
	});
	
});


//Edit Campground 
router.get("/campgrounds/:id/edit",middleWare. checkCampgroundOwnership, function(req,res){
	Campground.findById(req.params.id,function(err,foundCampground){
		res.render("campgrounds/edit",{campground:foundCampground});
	});
});
//Update Campground
router.put("/campgrounds/:id",middleWare.checkCampgroundOwnership,function(req,res){
	//res.send("HI");
	Campground.findByIdAndUpdate(req.params.id,req.body.campground,function(err,updatedCampground){
		if(err)
			res.redirect("/campgrounds");
		else
			res.redirect("/campgrounds/"+req.params.id);
	});
});

//Delete Route
router.delete("/campgrounds/:id",middleWare.checkCampgroundOwnership,function(req,res){
	Campground.findByIdAndDelete(req.params.id,function(err){
		if(err)
			res.redirect("/campgrounds");
		else
			res.redirect("/campgrounds");
	});
});

// function checkCampgroundOwnership(req,res,next){
// 	if(req.isAuthenticated()){
// 		Campground.findById(req.params.id,function(err,foundCampground){
// 		if(err)
// 			res.redirect("back");
// 		else{
// 			if(foundCampground.author.id.equals(req.user._id))
// 				next();
// 			else
// 				res.redirect("back");	
// 		}
// 		});
// 	} else {
// 		res.redirect("back");
// 	}
// }

// function isLoggedIn(req,res,next){
// 	if(req.isAuthenticated()){
// 		return next();
// 	}
// 	res.redirect("/login");
// }

module.exports = router;

