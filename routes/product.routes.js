const express = require('express');
const router = express.Router();
const multer = require('multer');
const {protect ,admin} = require('../middlewares/authMiddleware');
const upload = require('../middlewares/UploadMiddleware');
const productController = require('../controllers/product.controller');

// get all products route 


router.get('/' , productController.findAll);

// get single product with id route 

router.get('/:id' , productController.findOne);

//get product with price 
router.get('/search/price',protect, productController.findByPrice);
//get product with price 
router.get('/search/name' ,protect, productController.findByName);

// add new product 

router.post('/' ,protect , admin,upload.upload.single('image'), productController.create)

// update product 

router.put('/:id' ,protect , admin,upload.upload.single('image'),productController.update)

// delete product 

router.delete('/:id' ,protect , admin, productController.delete)

// delete all products 

router.delete('/' ,protect , admin, productController.deleteAll)

module.exports = router
