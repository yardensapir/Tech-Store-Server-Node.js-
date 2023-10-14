import connectDB from "../database/db";
import CategoryModel from "../models/categoryModel";
import CategoryData from "./category";
import productData from "../data/products";
import ProductModel from "../models/productModel";
import ReviewModel from "../models/reviwModel";
import ReviwsData from "../data/reviews";
import users from "./users";
import UserModel from "../models/userModel";
connectDB();

const importData = async () => {

  try {
    await CategoryModel.collection.deleteMany({});
    await CategoryModel.insertMany(CategoryData);

    await ProductModel.collection.deleteMany({});
    await ReviewModel.collection.deleteMany({});
    await UserModel.collection.deleteMany({});

    const reviews = await ReviewModel.insertMany(ReviwsData);
    const createdUsers = await UserModel.insertMany(users)
    const adminUser =  createdUsers[0]._id
    
    const sampleProduct = productData.map((product) => {
      reviews.map((review) => {
        //@ts-ignore
        product.reviews.push(review._id);
      });
      return { ...product, user:adminUser };
    });
    await ProductModel.insertMany(sampleProduct);



    console.log("Seeder data proceeded successfully !");
    process.exit();
  } catch (error) {
    console.error("Error while proccessing seeder data", error);
    process.exit(1);
  }
};

importData();
