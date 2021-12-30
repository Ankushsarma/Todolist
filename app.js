const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/todolistDB");


const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


const itemSchema = {
  item:String
};

const Item = mongoose.model("Item" , itemSchema);

const item1 = new Item({
  item:"Buy food"
});

const item2 = new Item({
  item:"Cook food"
});

const item3 = new Item({
  item:"Eat food"
});

const defultItems= [item1 , item2, item3];



app.get("/", function(req, res) {

  Item.find({} , function(err , items){

    if (items.length === 0){
       Item.insertMany(defultItems, function(err){
      if (err) {
        console.log(err);
      }else{
        console.log("succefully saved 3 data");
      }
    })
    res.redirect("/")
    }else{

      res.render("list", {listTitle: "today", newListItems: items});

    };
   
  });

  

});

app.post("/", function(req, res){

  const item = req.body.newItem;

  const newItem = new Item ({
    item:item
  })

  newItem.save()

  res.redirect("/")

});

app.post("/delete" , function(req, res) {
  const vlaue = req.body.checkbox;
  Item.findByIdAndRemove(vlaue , function(err){
    if (!err) {
      console.log("succefully deleted");
      res.redirect("/")
    }
   
  });
})

app.get("/work", function(req,res){
  res.render("list", {listTitle: "Work List", newListItems: workItems});
});

app.get("/about", function(req, res){
  res.render("about");
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
