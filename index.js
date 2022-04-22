const path = require('path')
const cors = require("cors");
const express = require("express");
const {STRIPE_SECRET_TEST} = require('./config/keys');
const stripe = require("stripe")(STRIPE_SECRET_TEST);

const app = express();
require("dotenv").config()

//middleware
app.use(express.urlencoded({extended:true}))
app.use(express.json());
app.use(cors());

app.post("/payment",cors(),async(req,res)=>{
    const {amount,id} = req.body;
    try{
        const payment = await stripe.paymentIntents.create({
            amount,
            currency:"INR",
            description:'Chromato',
            payment_method:id,
            confirm:true
        })
        res.json({
           message:"Payment Successfull",
            success:true
        })
    }
    catch(error) {
        console.log("error",error)
        res.json({
            message:"Payment failed",
            success:false
        })
    }
    
})


if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.resolve(__dirname,'Frontend','build')));
    app.get('*', (req, res)=>{
        res.sendFile(path.resolve(__dirname,'Frontend','build','index.html'));
        
})
}



// Listen
app.listen(process.env.PORT || 4000,()=>console.log("listening on port 4000"));
