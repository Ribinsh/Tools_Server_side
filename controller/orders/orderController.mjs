import orderModel from "../../model/user/orderModel.mjs";
import datesModel from "../../model/admin/datesModel.mjs";

export const getBookings = async (req ,res) =>{
    const {userId} = req.userId
    try{

        let allOrders = await orderModel.find({userId}).populate("productId")
        
        if(allOrders === null){ 
            res.status(404).send({staus:false ,  error: " No orders yet"})}
        else{
           res.status(200).send({status:true , allOrders})
        }
    }catch(error){
        res.status(400).send({status: false, error:error})
    }
}

export const  getDates = async(req ,res) =>{
    const productId = req.params.productId

    try{

        const orders = await datesModel.findOne({productId}) 
       
                   if(orders){
                    console.log(orders);
                       let resultDates = orders.dates

                       const orderedDates  = resultDates.flat()
                     
                       res.status(200).send({ status: true  , orderedDates });
                      
                   } else{
                       let orderedDates = null
                       res.status(200).send({ status: true ,  orderedDates })
                      
                   }
    } catch(error){
        res.status(400).send({ status: false ,  error:" Server Issue" })
    }

} 