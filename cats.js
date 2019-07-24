var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/cats");

var catSchema = new mongoose.Schema({
	name:String,
	age:Number,
	breed:String
});

var cat = mongoose.model("cat",catSchema);
