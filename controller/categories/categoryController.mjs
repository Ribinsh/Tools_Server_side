import categoryModel from "../../model/admin/categoryModel.mjs";

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
