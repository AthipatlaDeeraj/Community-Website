///controllers means just factorial values as such you are doing 

import session from "express-session";
import express from "express";
import bodyParser from "body-parser";
//THIS IS to send date to mongo db from here like email and pwd
import User from "../models/mongo.js";
//for req body or res body as we are looking into body before going to pages 


//this app is what server you are creating- use this for everything like get,post... app.listen and all to connect to server
const app = express();
const port = 3001;

app.use(session({
  secret: 'your_secret_key', // change this to a secure string in production
  resave: false,
  saveUninitialized: true,
}));


app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));//for any static files the express will look into public now
app.set("view engine","ejs");//this to make dynamic html which is set to ejs


const router = express.Router();
// const validCredentials = {
//   email: "test@exle.com",
//   password: "123",
// };


//A MINI ROUTER HAS BEEN CREATED HERE WE USE THIS AFTER -- APP.USE("/",ROUTER)
//USING ASYNC AND AWAIT INSTEAD OF PROMISE .THEN AND .CATCH --> only after completing await then only remaining executed
//MAKES FUNCTION PROMISE AUTOMATICALLY
router.post("/login-submit", async (req, res) => {
    const { email, password } = req.body;

    //you can keep try catch here not necessarily..
      const user = await User.findOne({ email: email, password: password });
  
      if (user) {
        // store user session
        req.session.user = user;
        console.log("User logged in:", user);
        res.redirect("/home"); 
      } else {
        res.redirect("/login");
      } 
  });


  router.post("/signup-submit",async (req,res)=>{
    const {email,password}=req.body;
    //check credentials exist else create one in the mongoose db in atlas ,,code located inside models in folder mongo.js
    //if not exist then create one new
    const user = await User.findOne({ email: email }); // ✅ only check by email
    if (!user) {
      await User.create({ email: email, password: password });
      console.log(email + password);
      res.render("login");
    } else {
      // maybe show message like "User already exists"
      res.render("login");
    }
})

  //just a function to use repeatedly
  function isAuthenticated(req, res, next) {
    if (req.session.user) {
      next();
    } else {
      res.redirect("/login");
    }
  }
  

 
app.get("/", (req, res) => {
  res.render("login"); // render refers to you can change anyways +/- click opposite
});

app.get("/login", (req, res) => { 
  res.render("login"); // see here there is no need to write the whole path
});

app.get("/community",isAuthenticated,(req,res)=>{
  res.render("community");
})

app.get("/home",isAuthenticated,(req,res)=>{
  res.render("home");
})

app.get("/chat",isAuthenticated,(req, res) => {
  res.render("chat"); // render refers to you can change anyways +/- click opposite
});

app.get("/home/chat",isAuthenticated,(req,res)=>{
  res.render("chat");
})

app.get("/community/chat",isAuthenticated,(req,res)=>{
  res.render("chat");
});

app.get("/profile",isAuthenticated,(req,res)=>{
  res.render("profile");
})

app.get("/signup",(req,res)=>{
  res.render("signup");
})


app.get("/sub-communities",(req,res)=>{
  res.render("sub-communities");
})

app.use("/", router);
app.listen(port,()=>{
    console.log(`listening to port ${port}`);
})

//EXECUTION IS ALSO HERE ONLY NOT IN THE ROOT FOLDER SO RUNNING THE WHOLE CODE FROM HERE ONLY
// AGAIN NOT REQUIRED TO RUN IN HOME.JS AS HERE ALREADY RUNNING IN THIS PORT----- BOTH SAME ANY ONE


//THIS IS IMPORTANT AS WE ARE IMPORTING ROUTES FROM THIS TO THE ROOT FOLDER
export default router;