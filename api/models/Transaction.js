import mongoose from "mongoose";


const TransactionSchema = new mongoose.Schema({
    name:{type:String, requires:true},
    price:{type:Number, requires:true},
    description:{type:String, required:true},
    datetime:{type:Date, required:true},
});

export const Transaction= mongoose.model('Transaction',TransactionSchema);

