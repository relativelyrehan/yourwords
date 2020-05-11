//jshint esversion:6

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");

const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));
app.set('view engine', 'ejs');
app.use(express.static("public"));


mongoose.connect("mongodb+srv://admin-amrehan:Rehan@123@cluster0-xc63c.mongodb.net/notesDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const noteSchema = new mongoose.Schema({
  name: String

});

const Note = mongoose.model("Note", noteSchema);

// let notes = ["This is a anonymous message/thought sharing web app", "you can share your thoughts or read others'. Just small thoughts 200 words", "feel free to add your thoughts, random little thoughts", "whoever reading this, have a nice day!!!"];

note1 = new Note({
  name: "This is for anyone reading this, this is just a message."
});

note2 = new Note({
  name: "You can leave this kind of message too in the box below."
});

note3 = new Note({
  name: "Front-end: Bootstrap Backend: NODE, MONGODB"
});


const notes = [];

Note.find({}, function(err, items){
  if (items.length == 0){
    notes.push(note1, note2, note3);

    Note.insertMany(notes, function (err) {
      if (!err) {
        console.log("Inserted Successfully");
      }
    });
  } else{
    console.log(err);
  }
});


app.get('/', function(req, res){
  let today = new Date();
  let options = { weekday: 'long', month: 'long', day: 'numeric' };
  let day = today.toLocaleDateString("en-US", options);

  Note.find({}, function(err, notes){
    if (!err){
       res.render('home', {
         notes: notes,
         day: "Message"
       });
    }
   
  });
  
  // console.log(req.body);
});

app.post('/', function(req, res){
  let note = new Note({
    name: req.body.note});
  note.save();
  res.redirect("/");
});

app.post("/delete", function(req, res){
  let myConst = req.body.button;
   Note.findByIdAndDelete({_id: myConst}, function(err){
     if(!err){
       console.log("deleted sucessfully");
       res.redirect("/");
     }
   });
   
});

app.listen(process.env.PORT || 3000, function(){
  console.log('App is runnig');
});
