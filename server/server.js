const express = require("express");
const bodyParser = require("body-parser");
// const mongoose = require("mongoose");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
// const User = require("./userSchema")
const bcrypt = require("bcrypt") 
 
const app = express();
app.use(cors());

app.use(bodyParser.json())
const port = 3000;

const uri = "mongodb+srv://<username>:<password>@practice.n903gft.mongodb.net/<Database>?retryWrites=true&w=majority";



const client = new MongoClient(uri,  {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    }
);
  
client.connect().then(()=>{
        console.log("connected successfully!!")
    }).catch((err)=>{
        console.log("unable to connect");
})

const myDB = client.db("user");
const myColl = myDB.collection("userData");


const cursor = myColl.find({});
cursor.forEach(doc => console.log(doc));



app.post("/api/login", async(req,res)=>{
    console.log("Received")
    const {username,password} = req.body;
    const user = await myColl.findOne({username})
    if(!user){
        res.status(401).send("Invalid user");
        return;
    }
    else{
        const passwordMatch = (password===user.password);
        console.log(password,user.password)

  if (!passwordMatch) {
    console.log("pasword")
    return res.status(401).send("Invalid")
  }

//   req.session.user = user;
  res.json({ message: 'Logged in successfully' });
    }
});

app.listen(port, ()=>{
    console.log(`Listening to port ${port}`)
})


 
// app.use(express.json());

// module.exports = dbConnect;

