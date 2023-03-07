import datesModel from "../../model/admin/datesModel.mjs";
import orderModel from "../../model/user/orderModel.mjs";
import productModel from "../../model/user/productModel.mjs";
import userModel from "../../model/user/userModel.mjs";

export const toBookProduct = (req, res) => {
  const productName = req.body.productName;
  res.json({ status: "success" });
};

export const singleView = async (req, res) => {
  const productId = req.params.productId;

  try {
    const product = await productModel.findOne({ _id: productId });

    res.status(200).send({ status: true, product });
  } catch (error) {
    res.status(400).send({ status: false, error: error });
  }
};

export const bookProduct = async (req, res) => {
  const { userId } = req.userId;
  const { productId, totalPrice, dates } = req.body;
 

  const totalDays = dates.length;
  try {
    const newOrder = new orderModel({
      userId,
      productId,
      totalPrice,
      dates,
      totalDays,
    });
    newOrder.save().then(async () => {
      let savedDate = await datesModel.findOne({ productId });

      if (savedDate) {
        await datesModel
          .updateOne({ productId }, { $push: { dates: dates } })
          .then(() => {
          
            res.send({ status: true });
          });
      } else {
       
        const date = new datesModel({
          productId,
          dates,
        });
        await date.save().then(() => {
          res.send({ status: true });
        });
      }
    });
  } catch (error) {
    res.status(400).send({ status: false, error: "Server Issue" });
  }
};

export const onlinePayment = async (req, res) => {
  try {
    const { orderId } = req.body;
    await orderModel
      .findByIdAndUpdate({ _id: orderId }, { $set: { paymentStatus: "Paid" } })
      .then(() => {
        res.status(200).send({ status: true });
      });
  } catch (error) {
    res.status(400).send({ status: false, error: "Server Issue" });
  }
};

export const userProfile = async (req, res) => {
  const { userId } = req.userId;
  try {
    await userModel.findById({ _id: userId }).then((response) => {
    
      let userData = response;
     
      res.status(200).send({ status: true, userData });
    });
  } catch (error) {
    res.status(400).send({ status: false, error: "server issue" });
  }
};

export const profileUpdate = async (req, res) => {
  let userId = req.params.Id;
  let { Name, Email, Profession, Phone, image, address, gender } = req.body;
  try {
    await userModel
      .findByIdAndUpdate(
        { _id: userId },
        {
          $set: {
            name: Name,
            email: Email,
            profession: Profession,
            phone: Phone,
            address: address,
            imageUrl: image,
            gender: gender,
          },
        }
      )
      .then(() => {
        res.status(200).send({ status: true });
      });
  } catch (error) {
    res.status(400).send({ status: false, error: "server issue" });
  }
};


export const updateProfile = async(req, res) => {
    let userId = req.params.userId;

    const {
        name,
        email,
        phone,
        address,
        gender,
        imageUrl,
    } = req.body;
  
    try {
      let findUser = userModel.findById({ _id: userId });
  
      if (findUser) {
        userModel
          .findByIdAndUpdate(
            { _id: userId },
            {
              name: name,
              email: email,
              phone: phone,
              address: address,
              gender: gender,
              imageUrl: imageUrl
             
            }
          )
          .then(() => {
            res.json({ status: "success" });
          });
      } else {
        res.status(400).send({ status: false, error: "No user Data found" });
      }
    } catch (error) {
      res.status(400).send({ status: false, error: "Server Issue" });
    }
}
