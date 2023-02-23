import datesModel from "../../model/admin/datesModel.mjs"
import orderModel from "../../model/user/orderModel.mjs"
import productModel from "../../model/user/productModel.mjs"
import userModel from "../../model/user/userModel.mjs"



export const toBookProduct = (req , res) => {
    const productName = req.body.productName
    res.json({status:"success"})
}

export const featuredProduct = async(req, res) =>{
    try{

        const product =await productModel.find({productStatus:"featured"})
        res.status(200).send({ status: true , product });
    }catch(error){
        res.status(400).send({ status: false ,data:"Server Issue" });
    }
}

export const premiumProduct = async(req, res) =>{
    const product =await productModel.find({productStatus:"premium"})
    res.status(200).send({ status: true , product });
}

export const getAllProduct = async(req, res) =>{
    const product =await productModel.find()
    res.status(200).send({ status: true , product });
}

export const singleView = async(req , res)=>{
        const productId = req.params.productId
         const product = await productModel.findOne({_id:productId})
         res.status(200).send({ status: true , product });

}

export const bookProduct = async (req, res) => {
 
    const {userId} = req.userId
       const {productId , totalPrice , dates} = req.body
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
            await datesModel.updateOne({productId} , {$push: { "dates": { "$each": ["$dates"] }}}).then(() =>{
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

export const getBooking = async (req ,res) =>{
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