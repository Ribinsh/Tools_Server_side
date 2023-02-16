
import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    category:{
        type:String,
        required:true
    },
    
    productName :{
        type:String,
        required:true
    },
    brandName : {
        type: String,
        required: true
    },
    description :{
        type:String,
        required: true        
    },
    price :{
        type:Number,
        required:true
    },
    rentPrice :{
        type:Number,
        required: true
    },
    imageUrl : {
        type:String,
        required: true
    },
    listingStatus : {
        type:String,
        default: "Unlist"
    },
    rentingStatus :{
        type : String,
        default : "Store"
    },

    date : {
        type : Date,
        default : Date.now
    },
     booking : {
        type : Array
        
     },

     mode : {
        type : String,
        default : "Working"
     },
     productStatus : {
        type : String,
        required : true
     },

     totalRentings : {
        type : Number,
        default : 0
     },

     totalEarning : {
        type : Number,
        default :0
     },

     details :{
        type:String,
        required:true
     }


   

    

})

const  productModel = mongoose.model('Product',productSchema)

export default productModel;