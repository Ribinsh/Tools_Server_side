import userModel from "../../model/user/userModel.mjs";
import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";

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
    const {email, password} =req.body;
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
            // res.json({status:"success"})
            res.status(200).send({ status: true });
        }
    }


    

    
}

// resendOtp : () => {
//     var mailOptions={
//         to: Email,
//        subject: "Otp for registration is: ",
//        html: "<h3>OTP for account verification is </h3>"  + "<h1 style='font-weight:bold;'>" + otp +"</h1>" // html body
//      };

//      transporter.sendMail(mailOptions, (error, info) => {
//         if (error) {
//             return console.log(error);
//         }
//         console.log('Message sent: %s', info.messageId);
//         console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
//         res.render('otp',{msg:"otp has been sent"});
//     });

// },

