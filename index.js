import express from "express"
import path from 'path';
import { fileURLToPath } from 'url';
import ejsMate from 'ejs-mate';
import { DBCONNECT } from "./src/db/db.js";
import dotenv from "dotenv"
import { asynchandler } from "./src/utils/asynchandler.js";
import { User } from "./src/models/user.model.js";
import cors from "cors"

dotenv.config()


// Resolve __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Set ejs-mate as the rendering engine for EJS files
app.use(cors({
    origin:'https://sakhaadigital.onrender.com'
}))  
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'src/public')));
app.use(express.urlencoded({extended:true}))


DBCONNECT()
.then(()=>{    console.log(`mongo db is connected sucessfuly on http://localhost:${process.env.PORT}`)
})
.catch((err)=>{
    console.log(err)
})


app.get('/',(req,res)=>{
    res.send("hello world")
})

app.get("/sakhaadigital/:name/:email/:message",asynchandler(async(req,res)=>{
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
}))

app.get('/contacts',asynchandler(async(req,res)=>{

const allpost=await User.find().sort({createdAt:-1});
return res.render("questions.ejs",{allpost})
}))
app.listen(PORT,()=>{
    console.log("server is running")
})



 