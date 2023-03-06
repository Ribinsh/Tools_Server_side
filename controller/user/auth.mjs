import userModel from "../../model/user/userModel.mjs";
import { authToken } from "../../middlewares/authMiddleware.mjs";
import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

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

export const verifyOtp = async (req, res) => {
  let userOtp = req.body.otpvalue;

  if (userOtp == otp) {
    const newUser = userModel({
      name: Name,
      email: Email,
      profession: Profession,
      phone: Phone,
      password: Password,
    });
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser
          .save()
          .then(() => {
            res.json({ status: "success" });
          })
          .catch((err) => {
            console.log(err);
            res.json({ status: failed });
          });
      });
    });
  }
};

export const doLogin = async (req, res) => {
  const { email, password } = req.body.values;
  try {
    const user = await userModel.findOne({ email: email });

    if (!user) {
      res.status(400).send({ status: false, error: "Not a user" });
    } else {
      const blocked = await userModel.findOne({
        $and: [{ email: email }, { status: "Blocked" }],
      });
      if (blocked) {
        res.status(400).send({ status: false, error: "User is Blocked!" });
      } else {
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
          res.status(400).send({ status: false, error: "Incorrect password" });
        } else {
          const userName = user.name;
          const userId = user._id;
          const token = jwt.sign(
            { userId: userId },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "24h" }
          );
          res.status(200).send({ status: true, userName, token });
        }
      }
    }
  } catch (error) {
    res.status(400).send({ status: false, error: "Server Issue" });
  }
};

export const checkUser = async (req, res) => {
  let { userId } = req.userId;

  try {
    const user = await userModel.findOne({ _id: userId });
    res.status(200).send({ status: true, user });
  } catch (error) {
    console.log(error);
  }
};

export const resendOtp = (req, res) => {
  try {
    var mailOptions = {
      to: Email,
      subject: "Otp for registration is: ",
      html:
        "<h3>OTP for account verification is </h3>" +
        "<h1 style='font-weight:bold;'>" +
        otp +
        "</h1>", // html body
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        res.status(400).send({ status: false, error: "Server Issue" });
      }
      console.log("Message sent: %s", info.messageId);
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
      res.json({ status: "success" });
    });
  } catch (error) {
    res.status(400).send({ status: false, error: "Server Issue" });
  }
};

export const changePassword = async (req, res) => {
  try {
    const { newPassword, email } = req.body;

    const user = await userModel.findOne({ email: email });

    if (!user) {
      res.status(400).send({ status: false, error: "Not a user" });
    } else {
      const blocked = await userModel.findOne({
        $and: [{ email: email }, { status: "Blocked" }],
      });
      if (blocked) {
        res.status(400).send({ status: false, error: "User is Blocked!" });
      } else {
        const password = await bcrypt.hash(newPassword, 10);

        await userModel
          .findOneAndUpdate({ email }, { $set: { password: password } })
          .then((result) => {
            if (!result) return res.sendStatus(404);
            res.sendStatus(202);
          });
      }
    }
  } catch (error) {
    res.status(400).send({ status: false, error: "Server issue" });
  }
};

export const forgotPassword = async (req, res) => {
  let email = req.body.email;

  try {
    const user = await userModel.findOne({ email: email });

    if (!user) {
      res.status(400).send({ status: false, error: "Not a user" });
    } else {
      const blocked = await userModel.findOne({
        $and: [{ email: email }, { status: "Blocked" }],
      });
      if (blocked) {
        res.status(400).send({ status: false, error: "User is Blocked!" });
      } else {
        res.status(200).send({ status: "success" });
      }
    }
  } catch (error) {
    res.status(400).send({ status: false, error: "Server issue" });
  }
};
