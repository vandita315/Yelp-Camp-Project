var express = require("express");
var router = express.Router();
var Campground=require("../models/campgrounds");
var Comment =require("../models/comments");
var middleWare =require("../middleware");
//Comments
router.get("/campgrounds/:id/comments/new",middleWare.isLoggedIn,function(req,res){
	Campground.findById(req.params.id,function(err,campground){
		if(err)
			console.log(err);
		else
		{
			res.render("comments/new",{campground:campground});
		}
	});
});

router.post("/campgrounds/:id/comments",middleWare.isLoggedIn,function(req,res){
	Campground.findById(req.params.id,function(err,campground){
		if(err)
		{
			console.log(err);
			res.redirect("/campgrounds");
		}else
		{
			Comment.create(req.body.comment,function(err,comment){
				if(err)
					console.log(err);
				else
				{
					comment.author.id = req.user._id;
					comment.author.username = req.user.username;
					comment.save();
					campground.comments.push(comment);
					campground.save();
					res.redirect("/campgrounds/"+campground._id);
				}
			});
		}
	});
});


//Edit Comment
router.get("/campgrounds/:id/comments/:comment_id/edit",middleWare.checkCommentOwnership,function(req,res){
	Comment.findById(req.params.comment_id,function(err,foundComment){
		if(err)
			res.redirect("back");
		else
			res.render("comments/edit",{campground_id:req.params.id,comment:foundComment});
	})
});

router.put("/campgrounds/:id/comments/:comment_id",middleWare.checkCommentOwnership,function(req,res){
	Comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,function(err,updatedComment){
		if(err)
			res.redirect("back");
		else
			res.redirect("/campgrounds/"+req.params.id);
	});
});

//Delete Route
router.delete("/campgrounds/:id/comments/:comment_id",middleWare.checkCommentOwnership,function(req,res){
	Comment.findByIdAndDelete(req.params.comment_id,function(err){
		if(err)
			res.redirect("back");
		else
			res.redirect("/campgrounds/"+req.params.id);
	});
});

// function checkCommentOwnership(req,res,next){
// 	if(req.isAuthenticated()){
// 		Comment.findById(req.params.comment_id,function(err,foundComment){
// 		if(err)
// 			res.redirect("back");
// 		else{
// 			if(foundComment.author.id.equals(req.user._id))
// 				next();
// 			else
// 				res.redirect("back");	
// 		}
// 		});
// 	} else {
// 		res.redirect("back");
// 	}
// }


module.exports = router;