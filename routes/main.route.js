const { Router } = require("express");
const { protected } = require("../middlewares/protected");
const {
  getAddFlowersPage,
  createFlower,
  getAllFlowers,
  getEditFlowerPage,
  editFlower,
  deleteFlower,
  getAllFlowersUsers,
  getMyOrder,
  addToMyOrder,
  removeFromBasket,
  statusChange,
  statusChangeAvailable,
  getOrders,
  getOrderProcessingPage,
  orderProduct,
  getOrdersPage,
  totalTrade,
  getAllOrders,
} = require("../controllers/flower.controller");

const { sendComment } = require("../controllers/comment.controller");

const router = Router();

router.get("/", protected, getAllFlowers);
router.get("/add-new-flower", protected, getAddFlowersPage);
router.post("/add-new-flower", protected, createFlower);
router.get("/edit-flower/:id", protected, getEditFlowerPage);
router.post("/edit-flower/:id", protected, editFlower);
router.post("/delete-flower/:id", protected, deleteFlower);
router.get("/main", getAllFlowersUsers);
router.post("/my-orders/:id", addToMyOrder);
router.get("/my-orders", getMyOrder);
router.post("/remove-from-basket/:id", removeFromBasket);

router.post("/status-change/:id", protected, statusChange);
router.post("/status-change-available/:id", protected, statusChangeAvailable);
router.get("/orders", protected, getOrders);

router.get("/order/:id", getOrderProcessingPage);
router.post("/order/:id", orderProduct);

router.get("/total-trade", protected, totalTrade);

router.get("/all-orders", getAllOrders);

router.post("/comments/:id", sendComment);

module.exports = router;
