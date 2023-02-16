
import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({

    categoryName :{
        type:String,
        required:true
    },
    description :{
        type:String,
        required: true        
    }, 
    imageUrl : {
        type:String,
        required: true
    }, 
    products : {
        type: Number,
        default : 0
    }

})

const  categoryModel = mongoose.model('Category',categorySchema)
export default categoryModel
