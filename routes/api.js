/*
*
*
*       Complete the API routing below
*       
*       
*/
'use strict';
const mongoose = require('mongoose');
const Book = require("../models.js").Book;

module.exports = function (app) {

  app.route('/api/books')
    .get(async (_req, res) => {
      try {
        const books = await Book.find({});
        if (!books) {
          res.send([]);
          return;
        }
        const formatData = books.map((book) => {
          return {
            _id: book._id,
            title: book.title,
            comment: book.comments,
            commentcount: book.comments.length,
          };
        });
        res.json(formatData);
        return;
      } catch (err) {
        res.send([]);
        return;
      }
    })
    
    .post(async (req, res) => {
      let title = req.body.title;
      if(!title) {
        res.send("missing required field title");
        return;
      }
      const newBook = new Book({title, comments: [] });
      try {
        const book = await newBook.save();
        res.json({ _id: book._id, title: book.title });
      } catch (err) {
        res.send("there was an error saving");
        return;
      }
    })
    
    .delete(async (req, res) => {
      try {
        const deleted = await Book.deleteMany({});
        console.log("deleted: >>", deleted);
        res.send("complete delete successful");
        } catch (err) {
        res.send(err.message);
      }
    });

  app.route('/api/books/:id')
    .get(async (req, res) => {
      let bookid = req.params.id;
      try {
        const book = await Book.findById(bookid);
        res.json({
          comments: book.comments,
          _id: book._id,
          title: book.title,
          commentcount: book.comments.length,
        });
      } catch (err) {
        res.send("no book exists");
      }
    })
    
    .post(async (req, res) => {
      let bookid = req.params.id;
      let comment = req.body.comment
      if (!comment) {
        res.send("missing required field comment");
        return;
      }
      try {
        let book = await Book.findById(bookid);
        book.comments.push(comment);
        book = await book.save();
        res.json({
          comments: book.comments,
          _id: book._id,
          title: book.title,
          commentcount: book.comments.length,
        });
      } catch (err) {
        res.send("no book exists");
      }
    })
    
    .delete(async (req, res) => {
      let bookid = req.params.id;
      ///if works response will be "delete successful"

      try {
        const deleted = await Book.findByIdAndDelete(bookid);
        console.log("deleted: >>", deleted);
        if (!deleted) throw new Error("no book exists");
        res.send("delete successful");
      } catch (err) {
        res.send("no book exists");
        return;
      }
    });
};
