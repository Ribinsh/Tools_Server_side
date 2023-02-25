import jwt from "jsonwebtoken"


export const authToken = (req,res,next)=>{
    const authHeader = req.headers['authorization']
    
   try{
       const token = authHeader && authHeader.split(" ")[1] 
       console.log("111"+token);
       if(!token) return  res.status(400).send({ status:false, error: "Please Login"});

       jwt.verify(JSON.parse(token),process.env.ACCESS_TOKEN_SECRET, (err,userId) =>{
        if(err) return  res.status(400).send({ status:false, error: "Unauthorized Token"});
        req.userId = userId
        next()
       })
      
   }catch (error){
        next(error)
   }

   } 