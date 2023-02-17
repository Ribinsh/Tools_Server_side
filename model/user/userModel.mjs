
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required: true
    },

    email : {
        type :String,
        required : true,
        unique : true
    },
    profession : {
        type : String,
        required : true
    },

    phone : {
        type : Number ,
        required : true
    },

    password : {
        type : String,
        required : true
    },
    status : {
        type: String,
        default: 'Unblocked'

    }, 
    address : {

    type: String,
    default : 'Not added'
    },
    gender : {

        type: String,
        default : 'Not added'
        },

       joined : {
        type :Date,
        default : Date.now()
       },
       
       rentings: {
        type: Number,
        default: 0
       }


        
    
})
const userModel = mongoose.model('UserData',userSchema);

export default  userModel 