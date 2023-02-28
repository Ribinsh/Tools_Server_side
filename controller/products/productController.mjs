import productModel from "../../model/user/productModel.mjs";

export const getAllProducts = async(req, res) =>{
    try{

        const product =await productModel.find({listingStatus: "List"})
        res.status(200).send({ status: true , product });
    }catch(error){
        res.status(400).send({ status: false , error:"server issue" });
    }
}

export const premiumProducts = async(req, res) =>{

    try{

        const product =await productModel.find({productStatus:"premium"})
        res.status(200).send({ status: true , product });
    }catch (error){
        res.status(400).send({ status: false , error:"server issue" });
    }
}

export const featuredProducts = async(req, res) =>{
    try{

        const product =await productModel.find({productStatus:"featured"})
        res.status(200).send({ status: true , product });
    }catch(error){
        res.status(400).send({ status: false ,data:"Server Issue" });
    }
}