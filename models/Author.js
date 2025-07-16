const mongoose = require("mongoose");


const AuthorSchema = new mongoose.Schema({
  title: String,       
  author: String,     
  year: Number,        
  genre: String,      
  available: {
    type: Boolean,
    default: true      
  }
});


const Author = mongoose.model("Author", AuthorSchema);
module.exports = Author;
