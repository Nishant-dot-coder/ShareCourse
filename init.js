const mongoose = require('mongoose');
main()
.then(()=>{
    console.log("Connection Successful!")
})
.catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

const Chat=require("./models/chat.js");

let allChats=[
    {
        from:"Nishant",
        to:"8340130016",
        msg:"Apna College Web Development Course",
        created_at: new Date()
    },
    {
        from:"Anjalu",
        to:"anjali@gmail.com",
        msg:"PW Gate course",
        created_at: new Date()
    },
    {
        from:"Ravi",
        to:"9865731546",
        msg:"MySirg C++ Course",
        created_at: new Date()
    },
    {
        from:"Pooja",
        to:"9632587461",
        msg:"TCS Interview Preperation Course",
        created_at: new Date()
    },
    {
        from:"Karan",
        to:"9865743251",
        msg:"Talent Battle Apptitude Xourse",
        created_at: new Date()
    },
];

Chat.insertMany(allChats);