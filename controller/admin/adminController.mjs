import categoryModel from "../../model/admin/categoryModel.mjs";
import orderModel from "../../model/user/orderModel.mjs";
import productModel from "../../model/user/productModel.mjs";
import userModel from "../../model/user/userModel.mjs";

export const adminLogin = (req, res) => {
  const { email, password } = req.body;

  let adminMail = "admin@gmail.com";
  let adminPassword = "admin1234";

  try{

    if (email == adminMail) {
      if (password == adminPassword) {
        res.json({ status: "success" });
      } else {
        res.status(400).send({ status: false, error: "Invalid Password" });
      }
    } else {
      res.status(400).send({ status: false, error: "Not a user" });
    }
  }catch(error){
    res.status(400).send({ status: false, error: "Server Issue" });
  }

};

export const addCategory = async (req, res) => {
  
  const { categoryName, description, imageUrl, works } = req.body;

  try {
    const newCategory = categoryModel({
      categoryName,
      description,
      work: works,
      imageUrl,
    });

    await newCategory.save().then(() => {
      res.json({ status: "success" });
    });
  } catch (error) {
    res.status(400).send({ status: false, error: "Server Issue" });
  }
};

export const updateCategory = async (req, res) => {
  const categoryId = req.params.categoryId;

  const { categoryName, description, imageUrl, works } = req.body;

  try {
    await categoryModel
      .findByIdAndUpdate(
        { _id: categoryId },
        {
          categoryName: categoryName,
          description: description,
          work: works,
          imageUrl: imageUrl,
        }
      )

      .save()
      .then(() => {
        res.json({ status: "success" });
      });
  } catch (error) {
    res.status(400).send({ status: false, error: "Server Issue" });
  }
};

export const updateProduct = async (req, res) => {
  let productId = req.params.productId;

  const {
    name,
    brand,
    category,
    price,
    rentPrice,
    details,
    productStatus,
    imageUrl,
    description,
  } = req.body;

  try {
    let findProduct = productModel.findById({ _id: productId });

    if (findProduct) {
      productModel
        .findByIdAndUpdate(
          { _id: productId },
          {
            productName: name,
            brandName: brand,
            category: category,
            price: price,
            rentPrice: rentPrice,
            details: details,
            description: description,
            productStatus: productStatus,
            imageUrl: imageUrl,
          }
        )
        .then(() => {
          res.json({ status: "success" });
        });
    } else {
      res.status(400).send({ status: false, error: "No product found" });
    }
  } catch (error) {
    res.status(400).send({ status: false, error: "Server Issue" });
  }
};

export const addProduct = async (req, res) => {
 
  const {
    name,
    brand,
    category,
    price,
    rentPrice,
    details,
    productStatus,
    imageUrl,
    description,
  } = req.body;

  try {
    const newProduct = productModel({
      productName: name,
      brandName: brand,
      category: category,
      price: price,
      rentPrice: rentPrice,
      details: details,
      description: description,
      productStatus: productStatus,
      imageUrl: imageUrl,
    });
    await newProduct.save().then(async () => {
      await categoryModel
        .findOneAndUpdate({ categoryName: category }, { $inc: { products: 1 } })
        .then(() => {
          res.json({ status: "success" });
        });
    });
  } catch (error) {
    res.status(400).send({ status: false, error: "Server Issue" });
  }
};

export const getUsers = async (req, res) => {
  try{

    const allUsers = await userModel.find();
  
    res.status(200).send({ status: true, allUsers });
  }catch(error){
    res.status(400).send({ status: false, error: "Server Issue" });
  }
};

export const getUserData = async (req, res) => {
  const userId = req.params.userId;
  console.log(userId);
  const user = await userModel.findOne({ _id: userId });
  console.log(user);
  if (!user) {
    res.status(400).send({ status: false, error: "No user Found" });
  } else {
    res.status(200).send({ status: true, user });
  }
};

export const blockUser = async (req, res) => {
  const userId = req.params.userId;
  try{

    await userModel.findByIdAndUpdate(
      { _id: userId },
      { $set: { status: "Blocked" } }
    );
    res.status(200).send({ status: true });
  }catch(error){
    res.status(400).send({ status: false, error: "Server Issue" });
  }
};

export const unBlockUser = async (req, res) => {
  const userId = req.params.userId;
  try{
    await userModel.findByIdAndUpdate(
      { _id: userId },
      { $set: { status: "Unblocked" } }
    );
    res.status(200).send({ status: true });

  }catch(error){
    res.status(400).send({ status: false, error: "Server Issue" });
  }
};

export const listProduct = async (req, res) => {
  const productId = req.params.productId;
  try {
    await productModel.findByIdAndUpdate(
      { _id: productId },
      { $set: { listingStatus: "List" } }
    );
    res.status(200).send({ status: true });
  } catch (error) {
    res.status(400).send({ status: false, error });
  }
};

export const unlistProduct = async (req, res) => {
  const productId = req.params.productId;
  try {
    await productModel.findByIdAndUpdate(
      { _id: productId },
      { $set: { listingStatus: "Unlist" } }
    );
    res.status(200).send({ status: true });
  } catch (error) {
    res.status(400).send({ status: false, error });
  }
};

export const offlinePayment = async (req, res) => {
 
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

export const changeOrderStatus = async (req, res) => {
  let value = req.body.update;
  let orderId = req.body.orderId;
  const order = await orderModel.findById({ _id: orderId });
  const userId = order.userId;
  const productId = order.productId;
  try {
    if (value === "Canceled") {
      await orderModel
        .findByIdAndUpdate({ _id: orderId }, { $set: { orderStatus: value } })
        .then(() => {
          res.status(200).send({ status: true });
        });
    } else if (value === "Renting") {
      await orderModel.findByIdAndUpdate(
        { _id: orderId },
        { $set: { orderStatus: value } }
      );
      await productModel
        .findByIdAndUpdate(
          { _id: productId },
          { $set: { rentingStatus: value } }
        )
        .then(() => {
          res.status(200).send({ status: true });
        });
    } else if (value === "Pending") {
      await orderModel
        .findByIdAndUpdate({ _id: orderId }, { $set: { orderStatus: value } })
        .then(() => {
          res.status(200).send({ status: true });
        });
    } else if (value === "Completed") {
      await orderModel.findByIdAndUpdate(
        { _id: orderId },
        { $set: { orderStatus: value, paymentStatus: "Paid" } }
      );

      await productModel.findByIdAndUpdate(
        { _id: productId },
        {
          $inc: { totalRentings: 1, totalEarning: order.totalPrice },
          $set: { rentingStatus: "Store" },
        }
      );

      await userModel
        .findByIdAndUpdate({ _id: userId }, { $inc: { renting: 1 } })

        .then(() => {
          res.status(200).send({ status: true });
        });
    } else {
      res.status(400).send({ status: false, error: "Something went wrong" });
    }

    // switch (value) {
    //   case "Canceled":
    //     await orderModel.findByIdAndUpdate({_id:orderId},{$set:{orderStatus: value}}).then(()=>{
    //       res.status(200).send({status:true})
    //     })
    //    break;

    //   case "Renting":
    //     await orderModel.findByIdAndUpdate({_id:orderId},{$set:{orderStatus : value}})
    //       await productModel.findByIdAndUpdate({_id:productId},{$set : {rentingStatus : value}}).then(()=>{
    //         res.status(200).send({status:true})
    //       })

    //      break;

    //   case "Pending":
    //     await orderModel.findByIdAndUpdate({_id:orderId},{$set:{orderStatus: value}}).then(()=>{
    //       res.status(200).send({status:true})
    //
    //     break;

    //   case "Completed":
    //     await orderModel.findByIdAndUpdate({_id:orderId},{$set:{orderStatus: value}})

    //       await productModel.findByIdAndUpdate({_id:productId},{$inc:{totalRentings: 1 , totalEarning : order.totalPrice}, $set:{rentingStatus:"store"}})

    //         await userModel.findByIdAndUpdate({_id:userId},{$inc:{renting:1}})

    //       .then(() => {
    //         res.status(200).send({status:true})
    //       })

    //       break;

    //   default:
    //     res.status(400).send({status:false , error: "Something went wrong"})
    // }
  } catch (error) {
    res.status(400).send({ status: false, error: "Server Issue" });
  }
};

export const getMonthSales = async (req, res) => {
  try{

    const monthOrder = await orderModel.aggregate([
      {
        $match: {
          date: {
            $gte: new Date(new Date().getTime() - 20 * 24 * 60 * 60 * 1000), // Date 20 days ago
            $lte: new Date(), // Today's date
          },
        },
      },
      {
        $group: {
          _id: null,
          totalSales: { $sum: "$totalPrice" },
        },
      },
      {
        $project: {
          _id: 0,
          totalSales: 1,
        },
      },
    ]);
    const sales = monthOrder[0].totalSales;
  
    console.log(sales);
    res.status(200).send({ status: true, sales });
  }catch(error){
    res.status(400).send({ status: false, error: "Server Issue" });
  }
};

export const totalSales = async (req, res) => {
   try{

     let totalOrders = await orderModel.countDocuments();
     res.status(200).send({ status: true, totalOrders });
   }catch(error){
    res.status(400).send({ status: false, error: "Server Issue" });
   }
};

export const totalUsers = async (req, res) => {
  try{

    let totalUsers = await userModel.countDocuments();
    res.status(200).send({ status: true, totalUsers });
  }catch(errorr){
    res.status(400).send({ status: false, error: "Server Issue" });
  }
};

export const totalProducts = async (req, res) => {
  try{

    let totalProducts = await productModel.countDocuments();
    res.status(200).send({ status: true, totalProducts });
  }catch(error){
    res.status(400).send({ status: false, error: "Server Issue" });
  }
};

export const daySales = async (req, res) => {
  try{

    let sales = await orderModel.aggregate([
      {
        $match: {
          date: {
            $gte: new Date(new Date().getTime() - 10 * 24 * 60 * 60 * 1000),
          }, // Date 10 days ago
        },
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%m-%d", date: "$date" }, // Group by day
          },
          earnings: { $sum: "$totalPrice" }, // Calculate total earnings for each day
        },
      },
      {
        $sort: { _id: 1 }, // Sort by date ascending
      },
    ]);
    
    res.status(200).send({ status: true, sales });
  } catch(error){
    res.status(400).send({ status: false, error: "Server Issue" });
  }
};

export const getgrandOrder = async (req, res) => {
  try{

    const dateFrom = new Date();
    dateFrom.setDate(dateFrom.getDate() - 10);
    const lastBookings = await orderModel.aggregate([
      {
        $match: {
          date: {
            $gte: dateFrom,
            $lt: new Date(),
          },
        },
      },
      {
        $group: {
          _id: { $dateToString: { format: "%m-%d", date: "$date" } },
          count: { $sum: 1 },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);
  
 
  
    res.status(200).send({ status: true, lastBookings });
  }catch(error){
    res.status(400).send({ status: false, error: "Server Issue" });
  }
};
