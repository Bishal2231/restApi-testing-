import express from "express"
import path from 'path';
import { fileURLToPath } from 'url';
import ejsMate from 'ejs-mate';
import { DBCONNECT } from "./src/db/db.js";
import dotenv from "dotenv"

import cors from "cors"
import { digitalSakhaaHandleData } from "./src/controllers/user.controller.js";
import { digitalSakhaaQuestions } from "./src/controllers/user.controller.js";
import { rohitQuestions,rohitHandleData } from "./src/controllers/user.controller.js";

dotenv.config()


// Resolve __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Set ejs-mate as the rendering engine for EJS files
const allowedOrigins = [
    'https://sakhaadigital.onrender.com',
    'https://rohitsah.onrender.com',
];
app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true); // Allow the request
        } else {
            callback(new Error('Not allowed by CORS')); // Reject the request
        }
    },
}));

// app.use(cors())
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

app.get("/sakhaadigital/:name/:email/:message",digitalSakhaaHandleData)

app.get('/contacts',digitalSakhaaQuestions)




app.get("/rohit/:name/:email/:message",rohitHandleData)

app.get('/rohit-questions',rohitQuestions)





app.listen(PORT,()=>{
    console.log("server is running")
})



 