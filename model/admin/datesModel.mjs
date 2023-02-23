import mongoose from "mongoose"

const ObjectId = mongoose.Schema.Types.ObjectId

const datesSchema = new mongoose.Schema ({
   
    productId: { 
      type:ObjectId, 
      ref: 'Product'
            },
    dates: {
        type: Array,
        required:true
    },
   
    date : {
        type: Date ,
        default : Date.now()
    }
    

})
const  datesModel = mongoose.model('Dates',datesSchema)
export default datesModel