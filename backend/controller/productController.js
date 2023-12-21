const Product=require('../models/product')
const ErrorHandler=require('../utils/errorHandler')
const catchAsyncErrors=require('../middlewares/catchAsyncErrors')
const APIFeatures=require('../utils/apiFeatures')

// create new product /api/v1/admin/product/new
exports.newProduct=catchAsyncErrors(async (req,resp,next)=>{
    const product=await Product.create(req.body);
    resp.status(201).json({
        success:true,
        product
    })
})
// get product /api/v1/products
exports.getProducts=catchAsyncErrors(async(req,resp,next)=>{
    const resPerPage=4;
    const productCount=await Product.countDocuments();

    const apifeaturs=new APIFeatures(Product.find(),req.query).search().filter().pagination(resPerPage);
        const products=await apifeaturs.query;
    resp.status(200).json({
        success:true,
        count:products.length,
        productCount,
        products
    })
})
// create singleproduct details /api/v1/product/:id

exports.singleProduct=catchAsyncErrors(async(req,resp,next)=>{
       const product=await Product.findById(req.params.id);
       if(!product){
        return next(new ErrorHandler('product not Found',404))
       }
       resp.status(200).json({
        success:true,
         product
       })
})

// update product details /api/v1/admin/product/:id

exports.updateProduct=catchAsyncErrors(async(req,resp,next)=>{
    let product=await Product.findById(req.params.id);
    if(!product){
        return next(new ErrorHandler('product not Found',404))
    }
    product=await Product.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    })
    resp.status(200).json({
     success:true,
      product
    })
})


// delete product details /api/v1/admin/product/:id

exports.deleteProduct=catchAsyncErrors(async(req,resp,next)=>{
    let product=await Product.findById(req.params.id);
    if(!product){
        return next(new ErrorHandler('product not Found',404))
    }
    
    product=await Product.findByIdAndDelete(req.params.id)
   
    resp.status(200).json({
     success:true,
     message:"Product deleted..."
    })
})