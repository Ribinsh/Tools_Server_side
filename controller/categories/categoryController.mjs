import categoryModel from "../../model/admin/categoryModel.mjs";
import orderModel from "../../model/user/orderModel.mjs";

export const getCategories = async (req, res) => {
  const categories = await categoryModel.find();

  try {
    if (categories) {
      res.status(200).send({ status: true, categories });
    }
  } catch (error) {
    res.status(400).send({ status: false, error: "server Issue" });
  }
};

export const getCategoryName = async (req, res) => {
  try {
    let names = await categoryModel.aggregate([
      {
        $project: {
          _id: 0,
          categoryName: 1,
        },
      },
      {
        $group: {
          _id: null,
          result: {
            $push: "$categoryName",
          },
        },
      },
      {
        $project: {
          result: 1,
          _id: 0,
        },
      },
    ]);

    const categoryNames = names[0].result;

    res.status(200).send({ status: true, categoryNames });
  } catch (error) {
    res.status(400).send({ status: false, error: "server Issue" });
  }
};

export const singleCategory = async (req, res) => {
  const categoryId = req.params.Id;

  try {
    const cat = await categoryModel.findOne({ _id: categoryId });

    res.status(200).send({ status: true, cat });
  } catch (error) {
    res.status(400).send({ status: false, error: error });
  }
};

export const getDaySaleReport = async(req,res) => {
    console.log(req.body);
    let selectedDay = req.body.date;
    console.log(selectedDay);
    try {
        const startOfDay = new Date(selectedDay);
        startOfDay.setHours(0,0,0,0);
        
        const endOfToday = new Date(selectedDay);
        endOfToday.setHours(23,59,59,999);
        
        const startOfLast24Hours = new Date(Date.now() - 86400000);
        
        const dayReport = await orderModel.aggregate([
          {
            $match: {
              date: { $gte: startOfDay, $lte: endOfToday }
            }
          },
        { $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
          total_sales: { $sum: "$totalPrice" },
          total_orders: { $sum: 1 },
          completed_orders: { $sum: { $cond: { if: { $eq: ["$orderStatus", "Completed"] }, then: 1, else: 0 } } },
          new_orders: { $sum: { $cond: { if: { $eq: ["$orderStatus", "Booked"] }, then: 1, else: 0 } } },
          onlinePayment: { $sum: { $cond: { if: { $eq: ["$paymentStatus", "Paid"] }, then: 1, else: 0 } } },
          notPaid: { $sum: { $cond: { if: { $eq: ["$paymentStatus", "Not paid"] }, then: 1, else: 0 } } },
          products_delivered: { $sum: { $cond: { if: { $eq: ["$orderStatus", "Renting"] }, then: 1, else: 0 } } }
        }}
      ]);
      const result = dayReport[0]
      console.log(result);
      res.status(200).send({ status: true, result });
    } catch (error) {
      res.status(400).send({ status: false, error: error });
    }
  }
  
