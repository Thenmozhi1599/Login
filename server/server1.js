const express = require('express');
const bodyparser=require("body-parser");
const mongoose= require('mongoose');
const jwt = require('jsonwebtoken');
const cors = require("cors");

var cookieParser = require('cookie-parser');
const port = process.env.PORT || 3000;
const app = express();
require('dotenv').config();
const bcrypt = require('bcrypt');
const salt = 10;
app.use(bodyparser.urlencoded({extended:true}));
app.use(express.json());
app.use(cookieParser());
app.use(express.static("public"));
app.use(cors());


// get our urls and secrets
const JWT_SECRET=process.env.jwt;
const MONGODB_URL=process.env.mongodb;
console.log(MONGODB_URL);
// making connnection with our database
mongoose.connect(MONGODB_URL, {useNewUrlParser: true, useUnifiedTopology: true}).then(()=>{
    console.log("Connected");
}).catch((err)=>{
    console.log("unable to connect");
});


const User = require("./userSchema")




// const newUser = new User ({username:"Dhana",password:"Then1234"})

// newUser.save().then((err,result)=>{
//     console.log(newUser);
// }).catch((err)=>{
//     if(err) console.log(err)
// })

app.post("/api/login",async(req,res)=>{
    const {email,password} =req.body;
    await User.findOne({email:email}).then(async(user)=>{
        if(user){
            const passCompare = await bcrypt.compare(password, user.password);
            console.log(password,user.password)
            // if res == true, password matched
            if(passCompare){
                res.send({message:"login sucess",user:user})
                res.redirect('http://localhost:3001/login')
            }
            // else wrong password
            else{
                res.send({message:"wrong credentials"})
            }
        }
        
    }).catch((err) => {
        res.status(500).json(err);
        
        res.redirect('http://localhost:3001/login')
        res.send("not register")
      });
});

app.post("/api/register",async(req,res) => {
    console.log("Register")
    const username = req.body.username;
    const password1 = req.body.password;
    await User.findOne({username:username})
        .then(async(err,user)=>{
        if(user){
            res.send({message:"user already exists"})
        }
        else{
            const password = await bcrypt.hash(password1,salt);
            const response = new User({
                username,
                password
            });
            response.save().then((err,result)=>{
                console.log(response);
                res.redirect('http://localhost:3001/login')
            }).catch((err)=>{
                if(err) console.log(err)
            })
        }
    })
    .catch((err) => {
        res.status(500).json({
          message: "There was an error adding a user to the database",
          err,
        });
    });
});



app.listen(port,()=>{
    console.log(`Running on port ${port}`);
})