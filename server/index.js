const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
// const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
const User = require("./userSchema")
 
const app = express();

app.use(bodyParser.json())
const port = 3000;

//Using mongoose
const uri = "mongodb+srv://thenmozhi01599:Thenmozhi1@practice.n903gft.mongodb.net/?retryWrites=true&w=majority";


// mongoose.connect(uri, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     dbName: 'user'
//   })
//     .then(() => console.log('MongoDB Atlas connected'))
//     .catch((err) => console.log('MongoDB Atlas connection error: ' + err));
//Using MongoClient

// Replace the placeholder with your Atlas connection string

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri,  {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    }
);
  
    // Connect the client to the server (optional starting in v4.7)
// client.connect().then(()=>{
//     console.log("connected successfully!!")
// }).catch((err)=>{
//     console.log("unable to connect");
// })
client.connect(() => {
    const coll = client.db("user").collection("userData");
}).then(()=>{
        console.log("connected successfully!!")
    }).catch((err)=>{
        console.log("unable to connect");
})
    

    // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");

//     const myDB = client.db("user");
// const myColl = myDB.collection("userData");

// const doc = { username: "Vennila", password: "Venni1234" };
// const result = await myColl.insertOne(doc);
// console.log(
//    `A document was inserted with the _id: ${result.insertedId}`,
// );

// const cursor = myColl.find({});
// await cursor.forEach(doc => console.log(doc));

app.post("/api/login", (req,res)=>{
    const username = req.body.username;
    const password = req.body.password;
    coll.findOne({username:username},(err,user)=>{
        if(err){
            res.status(500).send("Error");
            return;
        }
        if(!user){
            res.status(401).send("Invalid user");
            return;
        }
        user.comparePassword(password , (err,isMatch)=>{
            if(isMatch && !err){
                res.status(200).send("Login Successful");
            }
            else{
                res.status(401).send("Password mismatch");
            }
        });
    });
});

app.listen(port, ()=>{
    console.log(`Listening to port ${port}`)
})


 
// app.use(express.json());

// module.exports = dbConnect;

