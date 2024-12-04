import mongoose,{Schema} from "mongoose"

const userSchema=new Schema({
    name:{
        type:String
    },
    email:{
        type:String
      
      },
    message:{
        type:String

    }


},{timestamps:true})
export const User=mongoose.model("User",userSchema)


