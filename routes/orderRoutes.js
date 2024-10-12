const express = require("express");
const { protect, admin } = require('../middlewares/authMiddleware');
const router = express.Router();
const { createOrder, getAllOrders } = require("../controllers/orderController");

router.post('/' ,protect , createOrder);
router.get('/' ,protect ,admin, getAllOrders);

module.exports = router;