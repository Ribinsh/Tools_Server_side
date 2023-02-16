import userModel from "../../model/user/userModel.mjs";
import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"

var otp = Math.random();
otp = otp * 1000000;
otp = parseInt(otp);
console.log(otp);

let Name;
let Email;
let Profession;
let Phone;
let Password;

let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  service: "Gmail",

  auth: {
    user: "shopetoool@gmail.com",
    pass: "lusswnstvgriwhky",
  },
});

export const sendOtp = async (req, res) => {
  Email = req.body.email;
  Name = req.body.name;
  Phone = req.body.phone;
  Profession = req.body.profession;
  Password = req.body.password;

  console.log(Name);
  const user = await userModel.findOne({ email: Email });

  // send mail with defined transport object
  if (!user) {
    var mailOptions = {
      to: req.body.email,
      subject: "Otp for toool registration is: ",
      html:
        "<h3>OTP for toool account verification is </h3>" +
        "<h1 style='font-weight:bold;'>" +
        otp +
        "</h1>", // html body
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log("Message sent: %s", info.messageId);
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

      res.json({
        status: "success",
      });
    });
  } else {
    res.json({
      status: "failed",
    });
  }
};


export const verifyOtp = async (req,res)=>{

    let userOtp = req.body.otpvalue
    console.log(userOtp);

    if(userOtp==otp){
                const newUser = userModel({
                    name : Name,
                    email : Email,
                    profession : Profession,
                    phone : Phone,
                    password :Password
                  });
                  bcrypt.genSalt(10,(err, salt)=>{
                    bcrypt.hash(newUser.password, salt,(err, hash) =>{
                        if (err) throw err;
                        newUser.password = hash;
                        newUser
                        .save()
                        .then(()=> {
        
                            res.json({status:"success"});
                        })
                        .catch((err)=>{
                            console.log(err);
                            res.json({status:failed})
                        })
                    })
                  })
        
            }


   
}




export const doLogin = async(req , res) => {
    console.log(req.body);
    const {email, password} =req.body.values;
    try {
        const user = await userModel.findOne({$and:[{email :email} , {status: "Unblocked"}]});
        console.log(user);
       
                                                                        
            
        if(!user) {
            res.status(400).send({ status:false, error:"Not a user" });
            console.log("No Email");
        } else{
            const isMatch = await bcrypt.compare(password,user.password);
    
            if(!isMatch){
                res.status(400).send({ status:false, error: "Incorrect password"});
                console.log("incorrect password");
            }else{
                
                const userName = user.name;     
                  const token = jwt.sign({userName:userName},process.env.ACCESS_TOKEN_SECRET,{expiresIn: "24h"})
                res.status(200).send({ status: true , userName, token });
            }
        }
    } catch(error){
        res.status(400).send({ status:false, error: "Server Issue"});
    }


    

    
}


    export const authToken = (req,res,next)=>{
        const authHeader = req.headers['authorization']
        
       try{
        console.log(req.headers.authorization);
           const token = authHeader && authHeader.split(" ")[1] 
           console.log("111"+token);
           if(!token) return  res.status(400).send({ status:false, error: "No token"});

           jwt.verify(token,process.env.ACCESS_TOKEN_SECRET, (err,userName) =>{
            if(err) return  res.status(400).send({ status:false, error: "Token not Match"});
            req.user = userName
            next()
           })
          
       }catch (error){
            next(error)
       }

       } 


  export const tokenCheck = (req ,res) =>{
    let name = req.user

    res.json({data:name})
  }     



 export  const resendOtp = (req , res) => {
    var mailOptions={
        to: Email,
       subject: "Otp for registration is: ",
       html: "<h3>OTP for account verification is </h3>"  + "<h1 style='font-weight:bold;'>" + otp +"</h1>" // html body
     };

     transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            res.status(400).send({ status:false, error: "Server Issue"});
        }
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        res.json({status:"success"})
    });

}

