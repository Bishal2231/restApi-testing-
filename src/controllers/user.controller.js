
import { User } from "..//models/user.model.js";
import { Rohit } from "../models/rohit.model.js";
import { asynchandler } from "../utils/asynchandler.js";



export const digitalSakhaaHandleData=asynchandler(async(req,res)=>{
    const name=req.params.name;
    const email=req.params.email;
    const message  =req.params.message
   const post=await User.create({ 
    name:name,
    email:email,
    message:message
   })
if(post){
    return res.status(200).json({name,email,message})
}else{
    return res.status(400).json({name:null,email:null,message:null})

}
})
export const digitalSakhaaQuestions=asynchandler(async(req,res)=>{

    const allpost=await User.find().sort({createdAt:-1});
    return res.render("questions.ejs",{allpost})
    })




export const rohitHandleData=asynchandler(async(req,res)=>{
        const name=req.params.name;
        const email=req.params.email;
        const message  =req.params.message
       const post=await Rohit.create({ 
        name:name,
        email:email,
        message:message
       })
    if(post){
        console.log(post)
        return res.status(200).json({name,email,message})
    }else{
        return res.status(400).json({name:null,email:null,message:null})
    
    }
    })
 export const rohitQuestions=asynchandler(async(req,res)=>{

        const allpost=await Rohit.find().sort({createdAt:-1});
        return res.render("rohit.ejs",{allpost})
        })