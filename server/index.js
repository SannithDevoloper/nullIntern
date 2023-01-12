import express from 'express';
import mongoose from 'mongoose'
import cors from 'cors'
import userRoutes from './routes/Users.js'
const app=express();
app.use(express.json({limit:'30mb',extended:true}));
app.use(express.urlencoded({limit:'30mb',extended:true}));
app.use(cors());
app.get('/',(req,res)=>{
    res.send('This is stack clone')
})
app.use('/user',userRoutes)
const Port=process.env.PORT ||5000
 const connection_url="mongodb+srv://admin:admin@cluster0.fwd6n2y.mongodb.net/?retryWrites=true&w=majority";
 mongoose.connect(connection_url,{useNewUrlParser:true,useUnifiedTopology:true})
 .then(()=>app.listen(Port,()=>{console.log(`server listening on port ${Port}`)}))
 .catch((err)=>console.log(err.message))