
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