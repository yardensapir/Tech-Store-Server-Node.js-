import { NextFunction, Request, Response } from "express";
import ProductModel from "../models/productModel";
import recordsPerPage from "../config/pagination";

export const getProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let query = {};
    let queryCondtion = false;
    let priceQueryCondtion = {};
    let ratingQueryCondtion = {};
    let categoryQueryCondition = {};
    let attrsQueryCondition = [];

    if (req.query.price) {
      queryCondtion = true;
      priceQueryCondtion = { price: { $lte: Number(req.query.price) } };
    }
    if (req.query.rating) {
      queryCondtion = true;
      //@ts-ignore
      ratingQueryCondtion = { rating: { $in: req.query.rating.split(",") } };
    }

    const categoryName = req.params.categoryName || "";
    if (categoryName) {
      queryCondtion = true;
      let a = categoryName.replaceAll(",", "/");
      let regEx = new RegExp("^" + a);
      categoryQueryCondition = { category: regEx };
    }

    if (req.query.category) {
      queryCondtion = true;
      //@ts-ignore
      let a = req.query.category.split(",").map((item: any) => {
        if (item) {
          return new RegExp("^" + item);
        }
      });
      categoryQueryCondition = { category: { $in: a } };
    }

    if (req.query.attrts) {
      attrsQueryCondition = req.query.attrts
        //@ts-ignore
        .split(",")
        .reduce((acc: any, item: any) => {
          if (item) {
            let a = item.split("-");
            let values = [...a];
            values.shift(); // removes first item
            let a1 = {
              attrts: { $elemMatch: { key: a[0], value: { $in: values } } },
            };
            acc.push(a1);
            return acc;
          } else return acc;
        }, []);

      queryCondtion = true;
    }

    // pagination
    const pageNumber = Number(req.query.pageNumber) || 1;

    // Sort by name,price etc.
    let sort = {};
    const sortOption: any = req.query.sort || "";

    if (sortOption) {
      let sortOpt = sortOption.split("_");
      sort = { [sortOpt[0]]: Number(sortOpt[1]) };
    }

    const searchQuery = req.params.searchQuery || "";
    let searchQueryCondtion = {};
    let select = {};
    if (searchQuery) {
      queryCondtion = true;
      searchQueryCondtion = { $text: { $search: searchQuery } };
      select = {
        score: { $meta: "textScore" },
      };
      sort = { score: { $meta: "textScore" } };
    }

    if (queryCondtion) {
      query = {
        $and: [
          priceQueryCondtion,
          ratingQueryCondtion,
          categoryQueryCondition,
          searchQueryCondtion,
          ...attrsQueryCondition,
        ],
      };
    }

    const totalProducts = await ProductModel.countDocuments(query);
    const products = await ProductModel.find(query)
      .select(select)
      .skip(recordsPerPage * (pageNumber - 1))
      .sort(sort)
      .limit(recordsPerPage);
    res.json({
      products,
      pageNumber,
      paginationLinksNumber: Math.ceil(totalProducts / recordsPerPage),
    });
  } catch (error) {
    next(error);
  }
};
export const getProductById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const product = await ProductModel.findById(req.params.id);
    if (!product) {
      throw new Error();
    }
    res.json(product);
  } catch (error) {
    next(error);
  }
};
