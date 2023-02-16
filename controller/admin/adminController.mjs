import categoryModel from "../../model/admin/categoryModel.mjs";
import productModel from "../../model/user/productModel.mjs";


export const adminLogin = (req ,res) => {
    const {email,password} = req.body;

    let adminMail = 'admin@gmail.com'
    let adminPassword = "admin1234"

  
    
    if(email==adminMail){
       
        if(password == adminPassword){
            
            res.json({status:"success"})
        }else{
            res.status(400).send({ status:false, error:"Invalid Password" });
        }

    }else{
        res.status(400).send({ status:false, error:"Not a user" });
        
    }
}

export const addCategory = async (req ,res)=>{
     console.log(req.body);

     const {categoryName,description,imageUrl} = req.body

     try{
         const newCategory = categoryModel({
            categoryName,
            description,
            imageUrl
    
        });
    
        await newCategory
        .save()
        .then(()=>{
            res.json({status:"success"});
        })
     } catch(error){
        res.status(400).send({ status:false, error: "Server Issue"});
     }


}

export const getCategories = async(req ,res) =>{
    
 const catogories = await categoryModel.find()
 console.log(catogories) 
 
 res.status(200).send({ status: true , catogories });
 


}

export const addProduct= async (req,res)=>{
     console.log(req.body)
     const {name,brand,category, price,rentPrice, details,productStatus,imageUrl,description } = req.body

     try{
        const newProduct =  productModel({
            productName:name,
            brandName:brand,
            category:category,
            price: price,
            rentPrice:rentPrice,
            details:details,
            description :description ,
            productStatus:productStatus,
            imageUrl:imageUrl

        })
          await newProduct
        .save()
        .then(()=>{
            res.json({status:"success"});
        })

     }catch(error){
        res.status(400).send({ status:false, error: "Server Issue"});
     }
}