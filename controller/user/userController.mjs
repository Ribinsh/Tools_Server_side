import datesModel from "../../model/admin/datesModel.mjs"
import orderModel from "../../model/user/orderModel.mjs"
import productModel from "../../model/user/productModel.mjs"
import userModel from "../../model/user/userModel.mjs"



export const toBookProduct = (req , res) => {
    const productName = req.body.productName
    res.json({status:"success"})
}





export const singleView = async(req , res)=>{
        const productId = req.params.productId
      
        try{

            const product = await productModel.findOne({_id:productId})
           
            res.status(200).send({ status: true , product ,  })
           
        }catch(error){
            res.status(400).send({status:false , error: error})
        }

}



export const bookProduct = async (req, res) => {
 
    const {userId} = req.userId
       const {productId , totalPrice , dates} = req.body
       console.log(dates);
      
      const totalDays = dates.length;
           try{
        const newOrder =  new orderModel ({
            userId,
            productId,
            totalPrice,
            dates,
            totalDays,
            
          })
         newOrder.save().then(async()=>{
         let savedDate = await  datesModel.findOne({productId})

         if(savedDate){
            await datesModel.updateOne({productId} , {$push: { "dates":  dates   }}).then(() =>{
                console.log("old addeed");
                res.send({status:true })
            })
         }else{
              console.log("new created");
            const date = new datesModel({
                productId,
                dates
            })
            await date.save(). then(() => {
                res.send({status:true })
            })
         }
          })
       }catch(error){
        res.status(400).send({status:false , error: "Server Issue"})
       }

}



export const onlinePayment = async (req ,res) => {

       const {orderId} = req.body 
    await orderModel.findByIdAndUpdate({_id:orderId} , {$set:{paymentStatus: "Paid"}}).then(()=> {
        res.status(200).send({status:true })
    })

}