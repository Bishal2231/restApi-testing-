import mongoose,{Schema} from "mongoose"

const rohitSchema=new Schema({
    name:{
        type:String,
        required:true

    },
    email:{
        type:String,
        required:true

      
      },
    message:{
        type:String,
        required:true


    }


},{timestamps:true})
export const Rohit=mongoose.model("Rohit",rohitSchema)


