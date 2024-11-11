const mongoose=require("mongoose");

// id will be automatically generated by mongoose

const chatSchema= new mongoose.Schema({
    from:{
        type:String,
        required:true
    },
    to:{
        type:String,
        required:true
    },
    msg:{
        type:String,
        maxLength:100
    },
    created_at:{
        type:Date,
        required:true
    },
});

const Chat = mongoose.model("Chat",chatSchema);  // by default mongoose will give the collection name as chats

module.exports = Chat;