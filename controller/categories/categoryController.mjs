import categoryModel from "../../model/admin/categoryModel.mjs"


export const getCategories = async (req, res) => {

    const categories = await categoryModel.find();
    
    try{
        if(categories){
            res.status(200).send({ status: true, categories });

        }
    } catch(error){
        res.status(400).send({ status:false, error:"server Issue" });
    }
  
  }