const express=require('express')
const router=express.Router();
const {isAuthenticatedUser}=require('../middlewares/auth')

const {getProducts,newProduct,singleProduct,updateProduct,deleteProduct}=require('../controller/productController')

router.route('/products').get(isAuthenticatedUser,getProducts);
router.route('/product/:id').get(singleProduct);
router.route('/admin/product/new').post(newProduct);
router.route('/admin/product/:id').put(updateProduct);
router.route('/admin/product/:id').delete(deleteProduct);


module.exports=router;