import { NextFunction,Request,Response } from "express";
import CategoryModel from "../models/categoryModel";



export const getCategories= async (req:Request,res:Response,next:NextFunction)=>{
    try {
        const categories = await CategoryModel.find({}).sort({name:"asc"}).orFail()
       res.json(categories)
    } catch (error) {
       next()
    }
}

export const createNewCategory = async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const {category} = req.body
        if(!category){
    res.status(400).send("Category input is required")
        }
     const categoryExist = await CategoryModel.findOne({name: category})
   if(categoryExist){
    res.status(400).send("Category alreasdy exist")
   }
   else{
    const categoryCreated = await CategoryModel.create({name:category})
    res.status(201).send({categoryCreated:categoryCreated})
   }

        
    } catch (error) {
        next()
    }
}

export const deleteCategory = async (req:Request,res:Response,next:NextFunction)=>{
    const categoryId = await CategoryModel.findById(req.params.id)
    if(!categoryId){
        res.status(401).send("Category do not exist")
    }
    try {
        const category = await CategoryModel.deleteOne({_id:categoryId?._id})
        res.status(201).send({categoryDeleted:category})
        
    } catch (error) {
        next()
    }
}