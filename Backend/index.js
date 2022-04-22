const path = require('path')
const cors = require("cors");
const express = require("express");
const {STRIPE_SECRET_TEST} = require('./config/keys');
// const STRIPE_SECRET_TEST = "sk_test_51Io5JmSDMSglJRRmShLjg4Es92RrtZyACzzmaAsUOBWj4v48HEcVgjmD09WLWnWUBCawRSRcjpEHYuMbG1YYo5qU000ull7obi"
const stripe = require("stripe")(STRIPE_SECRET_TEST);
// const bodyParser = require("body-parser");
// const { v4: uuidv4 } = require('uuid');

const app = express();
require("dotenv").config()

//middleware
app.use(express.urlencoded({extended:true}))
app.use(express.json());
app.use(cors());

// Routes
// app.get("/",(req,res)=>{
//     res.send("yeah yeah");
// })



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
        // console.log("payment",payment)
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

// if(process.env.NODE_ENV === 'production'){
//     const path = require('path')
//     app.get('/', (req, res)=>{
//         app.use(express.static(path.resolve(__dirname,'Frontend','build')));
//         res.sendFile(path.resolve(__dirname,'Frontend','build','index.html'));
        
//     })
// }



// app.post("/payment",(req,res)=>{
//     const {product,token} = req.body;
//     const idempontencyKey = uuidv4();
//     console.log(token,idempontencyKey)
//     return stripe.customers.create({
//         email:token.email,
//         source:token.id
//     }).then(customer => {
//         stripe.charges.create({
//             amount:10*100,
//             currency:'inr',
//             customer:customer.id
//         },{idempontencyKey})
//     })
//     .then(result=>res.status(200).json(result))
//     .catch(err=>console.log(err))
// })


// Listen
app.listen(process.env.PORT || 4000,()=>console.log("listening on port 4000"));




