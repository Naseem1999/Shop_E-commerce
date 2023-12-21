const express=require('express')
const router=express.Router();
const {isAuthenticatedUser}=require('../middlewares/auth')

const {getProducts,newProduct,singleProduct,updateProduct,deleteProduct}=require('../controller/productController')

router.route('/products').get(getProducts);
router.route('/product/:id').get(singleProduct);
router.route('/admin/product/new').post(isAuthenticatedUser,newProduct);
router.route('/admin/product/:id').put(isAuthenticatedUser,updateProduct);
router.route('/admin/product/:id').delete(isAuthenticatedUser,deleteProduct);


module.exports=router;