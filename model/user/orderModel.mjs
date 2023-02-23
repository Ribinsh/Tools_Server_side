import mongoose from "mongoose"

const ObjectId = mongoose.Schema.Types.ObjectId

const orderSchema = new mongoose.Schema ({
    userId : {
        type:ObjectId,
        required: true,
        ref: 'UserData'
    },
   
    productId: { 
      type:ObjectId, 
      ref: 'Product'
            },
    dates: {
        type: Array,
    },
    totalPrice : {
         type: Number,
         required:true
        } ,
    orderStatus : {
         type : String,
         default : 'Booked'
            },
    
    totalDays : {
        type: Number,
        required:true
    },
   
    paymentStatus : {
        type: String,
        default: "Not paid"
    },
    
    date : {
        type: Date ,
        default : Date.now()
    }
    

})
const  orderModel = mongoose.model('Order',orderSchema)
export default orderModel