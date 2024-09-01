const mongoose = require("mongoose");
const { Schema } = mongoose;


const BookSchema = new Schema({
    title: { type: String, required: true },
    comments: [String],
  });    
;


  const Book = mongoose.model("Book", BookSchema); //Assign book with json data

  exports.Book = Book;
  