
import {Request, Response,NextFunction} from "express"

const notFound = (req:Request, res:Response, next:NextFunction) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
  };
 
  const errorHandler=(req:Request,res:Response,next:NextFunction,err:any,)=>{
 let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
 let message = err.message

 if(err.name === 'CastError' && err.kind === 'ObjectId'){
    message ='Resource not found'
    statusCode = 404;
 }
res.status(statusCode).json({
    message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack
})
 }


 export{errorHandler,notFound};

