import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import 'dotenv/config'

import {Transaction} from "./models/Transaction.js";

const app= express();
app.use(cors());
app.use(express.json());
const port = 5173

app.get('/api/test',(req,res)=>{
    res.json('test ok')
})

app.post("/api/transaction", async (req, res) => {
  try {
    console.log("Connecting to MongoDB database...");
    await mongoose.connect(import.meta.env.MONGO_URL);

    console.log("MongoDB database connected successfully!");

    // Check if all required fields are present in the request body
    if (
      !req.body.name ||
      !req.body.description ||
      !req.body.datetime ||
      !req.body.price
    ) {
      res.status(400).send("Missing required fields");
      return;
    }

    // Create a new transaction with the data from the request body
    const { name, description, datetime, price } = req.body;
    const transaction = await Transaction.create({
      name,
      description,
      datetime,
      price,
    });

    res.json(transaction);
  } catch (error) {
    console.error("Error connecting to MongoDB database:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.get('/api/transactions',async(req,res)=>{
    await mongoose.connect("import.meta.env.MONGO_URL");
    const transactions = await Transaction.find();
    res.json(transactions);
})

app.listen(port,()=>{
    console.log(`App listening on port ${port}`);
})