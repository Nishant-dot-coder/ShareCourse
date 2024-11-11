const express=require("express");
const app=express();
const path=require("path");

const Chat=require("./models/chat.js");
const methodOverride=require("method-override");
app.use(methodOverride("_method"));

app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");

app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true})); //to accept through post request

const mongoose = require('mongoose');

main()
.then(()=>{
    console.log("Connection Successful!")
})
.catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

app.listen(8080,()=>{
    console.log("server is running on port 8080");
    
});
//end of basic setup
// Chat will have: id,from,to,message,created,at



// index route  GET /chats -> to show all chats
app.get("/chats", async (req,res)=>{
    let chats= await Chat.find(); //find() is an asynchornous function, therefore we are using async and await
    
    res.render("index.ejs",{chats});
})

// new route -> to create new route
app.get("/chats/new",(req,res)=>{
res.render("new.ejs");
});

//create route
app.post("/chats",(req,res)=>{
    let {from, to, msg}=req.body;
    let newChat = new Chat({
        from:from,
        to:to,
        msg:msg,
        created_at : new Date()
    });
    newChat
    .save()
    .then((res)=>{                 // jha 'then()' use karte h, wha 'await' likh ne ki need nhi
        console.log("Chat was saved.");
    })
    .catch((err)=>{
        console.log(err);
    });
    res.redirect("/chats");
});

// edit route -> edit the message
app.get("/chats/:id/edit",async (req,res)=>{
    let {id} =req.params;
    let chat=await Chat.findById(id);
    res.render("edit.ejs",{chat});
});

// UPDATE ROUTE -> to update the db when msg is edited
app.put("/chats/:id", async (req,res)=>{
let {id}=req.params;
let {msg : newMsg}=req.body;
let updatedChat = await Chat.findByIdAndUpdate(id,{msg:newMsg},{runValidators:true , new:true});
res.redirect("/chats");
});

//DESTROY ROUTE -> To delete a chat
app.delete("/chats/:id", async (req,res)=>{
    let {id}=req.params;
    let deletedChat = await Chat.findByIdAndDelete(id);
    res.redirect("/chats");
})

app.get("/",(req,res)=>{
    res.redirect("/chats");
});
