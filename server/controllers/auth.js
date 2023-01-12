import jwt from'jsonwebtoken'
import bcrypt from 'bcryptjs'
import users from '../models/auth.js'
export const signup= async (req,res)=>{
    const {name,email,password} = req.body;
    try{
        const existingUser= await users.findOne({email}); 
        if(existingUser)
        {
            return res.status(404).json({message:"user is already existed"})
        }
        const hashedPassword = await bcrypt.hash(password,12)
        const newUser= await users.create({name,email,password:hashedPassword})
        const token=jwt.sign({email:newUser.email,id:newUser._id},"test",{expiresIn:'1h'});
        res.status(200),json({result:newUser,token})

    }
    catch(err){
        res.status(500).json('something went wrong')

    }

}
 export const login= async (req,res)=>{
    const {email,password} = req.body;
    try{
        const existingUser= await users.findOne({email}); 
        if(!existingUser)
        {
            return res.status(404).json({message:"user don't exists"})
        }
        const isPasswordCorrect = await bcrypt.compare(password,existingUser.password)
        if(!isPasswordCorrect){
            return res.status(400).json({message:"invalid password"})
        }
        const token=jwt.login({email:existingUser.email,id:existingUser._id},"test",{expiresIn:'1h'});
        res.status(200),json({result:existingUser,token})
    }
    catch(err){
        res.status(500).json('something went wrong...')

    }

}
