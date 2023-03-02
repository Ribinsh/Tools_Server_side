import categoryModel from "../../model/admin/categoryModel.mjs";
import orderModel from "../../model/user/orderModel.mjs";
import productModel from "../../model/user/productModel.mjs";
import userModel from "../../model/user/userModel.mjs";

export const adminLogin = (req, res) => {
  const { email, password } = req.body;

  let adminMail = "admin@gmail.com";
  let adminPassword = "admin1234";

  if (email == adminMail) {
    if (password == adminPassword) {
      res.json({ status: "success" });
    } else {
      res.status(400).send({ status: false, error: "Invalid Password" });
    }
  } else {
    res.status(400).send({ status: false, error: "Not a user" });
  }
};

export const addCategory = async (req, res) => {
  console.log(req.body);

  const { categoryName, description, imageUrl,works } = req.body;

  try {
    const newCategory = categoryModel({
      categoryName,
      description,
      work:works,
      imageUrl,
    });

    await newCategory.save().then(() => {
      res.json({ status: "success" });
    });
  } catch (error) {
    res.status(400).send({ status: false, error: "Server Issue" });
  }
};



export const addProduct = async (req, res) => {
  console.log(req.body);
  const {
    name,
    brand,
    category,
    price,
    rentPrice,
    details,
    productStatus,
    imageUrl,
    description,
  } = req.body;

  try {
    const newProduct = productModel({
      productName: name,
      brandName: brand,
      category: category,
      price: price,
      rentPrice: rentPrice,
      details: details,
      description: description,
      productStatus: productStatus,
      imageUrl: imageUrl,
    });
    await newProduct.save().then(async() => {
     await categoryModel.findOneAndUpdate({categoryName:category} , {$inc:{"products":1}}).then(()=>{

       res.json({ status: "success" });
     })
    });
  } catch (error) {
    res.status(400).send({ status: false, error: "Server Issue" });
  }
};

export const getUsers = async (req, res) => {
    const allUsers = await userModel.find()
  
  res.status(200).send({ status: true, allUsers });
};

export const getUserData = async (req, res) => {
    
    const userId = req.params.userId
    console.log(userId);
    const user = await userModel.findOne({_id:userId})
    console.log(user);
    if(!user) {
        res.status(400).send({ status: false, error: "No user Found" });
    }else{

        res.status(200).send({ status: true, user });
    }
     

};


export const blockUser =async (req,res)=>{
    const userId = req.params.userId
    await userModel.findByIdAndUpdate({_id:userId},{$set:{status:"Blocked"}})
    res.status(200).send({ status: true });


}

export const unBlockUser =async (req,res)=>{
    const userId = req.params.userId
    await userModel.findByIdAndUpdate({_id:userId},{$set:{status:"Unblocked"}})
    res.status(200).send({ status: true });


}

export const listProduct =async (req,res) => {
      const productId = req.params.productId
     try{
      await productModel.findByIdAndUpdate({_id:productId},{$set:{listingStatus: "List"}})
      res.status(200).send({ status: true });
     }catch(error){
      res.status(400).send({status:false, error})
     }
}

export const unlistProduct =async (req,res) => {
  const productId = req.params.productId
 try{
  await productModel.findByIdAndUpdate({_id:productId},{$set:{listingStatus: "Unlist"}})
  res.status(200).send({ status: true });
 }catch(error){
  res.status(400).send({status:false, error})
 }
}

export const offlinePayment = async (req ,res) => {
  console.log(req.body);
try{

    const {orderId} = req.body 
    console.log(orderId);
    
 await orderModel.findByIdAndUpdate({_id:orderId} , {$set:{paymentStatus: "Paid"}}).then(()=> {
     res.status(200).send({status:true })
 })
}catch(error){
  res.status(400).send({status:false , error: "Server Issue"})
 }


}

export const changeOrderStatus =async (req ,res) => {
      let value = req.body.update
      let orderId = req.body.orderId
      const order = await orderModel.findById({_id:orderId})
      const userId = order.userId
      const productId = order.productId
      try{

        if(value === "Canceled"){
          await orderModel.findByIdAndUpdate({_id:orderId},{$set:{orderStatus: value}}).then(()=>{
            res.status(200).send({status:true})
          
          })
        }else if(value ===  "Renting"){
          await orderModel.findByIdAndUpdate({_id:orderId},{$set:{orderStatus : value}})
          await productModel.findByIdAndUpdate({_id:productId},{$set : {rentingStatus : value}}).then(()=>{
            res.status(200).send({status:true})
          })
        }else if(value === "Pending"){
          await orderModel.findByIdAndUpdate({_id:orderId},{$set:{orderStatus: value}}).then(()=>{
            res.status(200).send({status:true})
          })
        }else if(value === "Completed"){
          await orderModel.findByIdAndUpdate({_id:orderId},{$set:{orderStatus: value , paymentStatus: "Paid"}}) 
            
          await productModel.findByIdAndUpdate({_id:productId},{$inc:{totalRentings: 1 , totalEarning : order.totalPrice}, $set:{rentingStatus:"Store"}})
         
            await userModel.findByIdAndUpdate({_id:userId},{$inc:{renting:1}})
    
          .then(() => {
            res.status(200).send({status:true})
          })
     
        }else{
          res.status(400).send({status:false , error: "Something went wrong"})
        }





        // switch (value) {
        //   case "Canceled":
        //     await orderModel.findByIdAndUpdate({_id:orderId},{$set:{orderStatus: value}}).then(()=>{
        //       res.status(200).send({status:true})
        //     })
        //    break;


        //   case "Renting":
        //     await orderModel.findByIdAndUpdate({_id:orderId},{$set:{orderStatus : value}})
        //       await productModel.findByIdAndUpdate({_id:productId},{$set : {rentingStatus : value}}).then(()=>{
        //         res.status(200).send({status:true})
        //       })
         
        //      break;


        //   case "Pending":
        //     await orderModel.findByIdAndUpdate({_id:orderId},{$set:{orderStatus: value}}).then(()=>{
        //       res.status(200).send({status:true})
        //     
        //     break;

        //   case "Completed":
        //     await orderModel.findByIdAndUpdate({_id:orderId},{$set:{orderStatus: value}}) 
            
        //       await productModel.findByIdAndUpdate({_id:productId},{$inc:{totalRentings: 1 , totalEarning : order.totalPrice}, $set:{rentingStatus:"store"}})
             
        //         await userModel.findByIdAndUpdate({_id:userId},{$inc:{renting:1}})
        
        //       .then(() => {
        //         res.status(200).send({status:true})
        //       })
         
        //       break;
  

        //   default:
        //     res.status(400).send({status:false , error: "Something went wrong"})
        // }
       
      }catch(error){
  res.status(400).send({status:false , error: "Server Issue"})
 }
}