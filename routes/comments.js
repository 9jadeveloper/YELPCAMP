const express= require("express");
const router = express.Router({mergeParams: true});
const Campground = require("../models/campground");
const Comment = require("../models/comment");
const middleware = require("../middleware");
const { isLoggedIn, checkCommentAuth, isAdmin } = middleware;

// Comment New
router.get("/new", isLoggedIn, function(req, res){
    //find campground by id
    console.log(req.params.id);
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
        } else {
            res.render("comments/new", {campground: campground});
        }
    });
});

// Comment create
router.post("/", isLoggedIn, function(req, res){
    // look up campground by ID
    Campground.findById(req.params.id, function(err, campground) {
        if(err){
            console.log(err);
        } else {
             // create new comment
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    req.flash("error", "something went wrong");
                    console.log(err);
                } else {
                    // add username and id to comment and save
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    // save comment
                    comment.save();
                    // connect new comment to campground and redirect to show page
                    campground.comments.push(comment);
                    campground.save();
                    console.log(comment)
                    req.flash("success", "You've added a new comment!");
                    res.redirect("/campgrounds/" + campground._id);
                }
            });
        }
    });
});

// edit comment route
router.get("/:comment_id/edit", isLoggedIn, checkCommentAuth, function(req, res){
      res.render("comments/edit", {campground_id: req.params.id, comment: req.comment});
});

// UPDATE COMMENT ROUTE
router.put("/:comment_id", isAdmin, function(req, res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
        if(err){
            res.redirect("back");
        } else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

//COMMENT DELETE ROUTE
router.delete("/:comment_id", checkCommentAuth, function(req, res){
      // find campground, remove comment from comments array, delete comment in db
  Campground.findByIdAndUpdate(req.params.id, {
    $pull: {
      comments: req.comment.id
    }
  }, function(err) {
    if(err){ 
        console.log(err);
        req.flash('error', err.message);
        res.redirect('/');
    } else {
        req.comment.remove(function(err) {
          if(err) {
            req.flash('error', err.message);
            return res.redirect('/');
          }
          req.flash('error', 'Comment deleted!');
          res.redirect("/campgrounds/" + req.params.id);
        });
    }
  });
});
module.exports = router;