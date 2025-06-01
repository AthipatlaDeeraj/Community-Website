  // home.js this is just to link the routes that are there inside the routes folder
  import express from 'express';
  import path from 'path';
  import { fileURLToPath } from 'url';
  import { dirname } from 'path';
  import mongoose from "mongoose";
  import dotenv from "dotenv";

  //no use actually as ntg to do with db here
  import User from './models/mongo.js';

  dotenv.config();
  const app=express();
  console.log("MONGO_URI is:", process.env.MONGO_URI);


//THIS IS TO CONNECT TO THE DB OF MONGO ATLAS YOU CAN ALSO USE THE URL(in b/w with pwd) PROVIDED
//mongoose.connect is a function fn(val).then(()=>{...}).catch(()=>{...})
  mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB Atlas");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
  //ABOVE - here we used promises when resolved(.then) if not reject(catch)


  // Convert __dirname for ES modules
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);

  // Middleware
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  // Set view engine
  app.set('view engine', 'ejs');
  app.set('views', path.join(__dirname, 'views'));

  // Static files
  app.use(express.static(path.join(__dirname, 'public')));

  // Import routes (ESM style)--JUST CHANGE THE FILE NAME TO THE FOLDER ROUTES FILE 
  import homeRoutes from './routes/justforroute.js';
  app.use('/', homeRoutes);
  