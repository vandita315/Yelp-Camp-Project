var mongoose = require("mongoose");
var Campground = require("./models/campgrounds");
var Comment = require("./models/comments");


//var comment = [];
var data = [
	{
	name:"a1",
 	image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTojcW7mENZWs0VSk3Z9BKAFjkMaC1Kam3cjqYL_vuw8LWdt9fj6A",
 	description:"qwejfdjcnjnkjsd jdbsckjkjsdb sdubckj kjd sbcks nkk"
 	},
 	{
	name:"a1",
 	image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTojcW7mENZWs0VSk3Z9BKAFjkMaC1Kam3cjqYL_vuw8LWdt9fj6A",
 	description:"qwejfdjcnjnkjsd jdbsckjkjsdb sdubckj kjd sbcks nkk"
 	},
 	{
	name:"a1",
 	image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTojcW7mENZWs0VSk3Z9BKAFjkMaC1Kam3cjqYL_vuw8LWdt9fj6A",
 	description:"qwejfdjcnjnkjsd jdbsckjkjsdb sdubckj kjd sbcks nkk"
 	}
 	]



function seedDB(){
	//Remove the campgrounds
	Campground.remove({},function(err){
		// if(err){
		// 	console.log(err);
		// }
		// console.log("Removed Data");
		// //Add a few campgrounds
		// data.forEach(function(seed){
		// 	Campground.create(seed,function(err,campground){
		// 		if(err)
		// 			console.log(err);
		// 		else{
		// 			console.log("added a new data");
		// 		//Adding a comment
		// 			Comment.create(
		// 			{  
		// 				text:"This is a good news",
		// 				author:"Utkarsh"
		// 			},function(err,comment){
		// 				if(err){
		// 					console.log(err);
		// 					console.log("Hi");
		// 				}
		// 				else
		// 				{
		// 					//console.log("ok");
		// 					campground.comments.push(comment);
		// 					campground.save();
		// 					console.log("added a new comment");
		// 				}
		// 			})
		// 	}
		// 	});
		// });
	});
	
}

module.exports = seedDB;