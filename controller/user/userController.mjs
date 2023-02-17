import productModel from "../../model/user/productModel.mjs"



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