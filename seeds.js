    var mongoose = require("mongoose"),
    Campground = require("./models/campground"),
    Comment    = require("./models/comment");
var data = [
    {
     name: "cloud's rest",
     image: "https://images.unsplash.com/photo-1524007769096-2dad448565c9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
     description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Scelerisque felis imperdiet proin fermentum. Enim ut sem viverra aliquet eget sit. Enim nunc faucibus a pellentesque sit amet porttitor eget. Amet mattis vulputate enim nulla aliquet porttitor lacus luctus accumsan. Dolor sed viverra ipsum nunc aliquet bibendum. Id nibh tortor id aliquet lectus proin nibh nisl. Phasellus faucibus scelerisque eleifend donec pretium vulputate. Tortor posuere ac ut consequat semper viverra. Facilisis magna etiam tempor orci eu lobortis. Arcu dictum varius duis at consectetur lorem donec massa sapien. Magna ac placerat vestibulum lectus mauris ultrices eros in cursus. Orci phasellus egestas tellus rutrum tellus pellentesque. A diam maecenas sed enim ut. Quis lectus nulla at volutpat diam ut venenatis."
       },
        {
     name: "Heavens gate",
     image: "https://images.unsplash.com/photo-1523280988476-b7490bb036e1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
     description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Scelerisque felis imperdiet proin fermentum. Enim ut sem viverra aliquet eget sit. Enim nunc faucibus a pellentesque sit amet porttitor eget. Amet mattis vulputate enim nulla aliquet porttitor lacus luctus accumsan. Dolor sed viverra ipsum nunc aliquet bibendum. Id nibh tortor id aliquet lectus proin nibh nisl. Phasellus faucibus scelerisque eleifend donec pretium vulputate. Tortor posuere ac ut consequat semper viverra. Facilisis magna etiam tempor orci eu lobortis. Arcu dictum varius duis at consectetur lorem donec massa sapien. Magna ac placerat vestibulum lectus mauris ultrices eros in cursus. Orci phasellus egestas tellus rutrum tellus pellentesque. A diam maecenas sed enim ut. Quis lectus nulla at volutpat diam ut venenatis."
       },
        {
     name: "Bush mellows",
     image: "https://images.unsplash.com/photo-1536702280049-02b945c429e1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
     description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Scelerisque felis imperdiet proin fermentum. Enim ut sem viverra aliquet eget sit. Enim nunc faucibus a pellentesque sit amet porttitor eget. Amet mattis vulputate enim nulla aliquet porttitor lacus luctus accumsan. Dolor sed viverra ipsum nunc aliquet bibendum. Id nibh tortor id aliquet lectus proin nibh nisl. Phasellus faucibus scelerisque eleifend donec pretium vulputate. Tortor posuere ac ut consequat semper viverra. Facilisis magna etiam tempor orci eu lobortis. Arcu dictum varius duis at consectetur lorem donec massa sapien. Magna ac placerat vestibulum lectus mauris ultrices eros in cursus. Orci phasellus egestas tellus rutrum tellus pellentesque. A diam maecenas sed enim ut. Quis lectus nulla at volutpat diam ut venenatis."
       }
    ]    

function seedDB(){
    // remove all campgrounds
    Campground.remove({}, function(err){
    if(err){
        console.log(err);
    }
    console.log("campgrounds removed");
     // add some campgrounds
    data.forEach(function(seed){
        Campground.create(seed, function(err, data){
            if(err){
                console.log(err);
            } else {
                console.log("added some campgrounds");
                //add some comments
                Comment.create({
                    text: "this place is cool, but can be better",
                    author: "wale"
                }, function(err, comment){
                    if(err){
                        console.log(err);
                    } else {
                        data.comments.push(comment);
                        data.save();
                        console.log("created a new comment");
                    }
                });
            }
        });
    });
});

}    

module.exports = seedDB;