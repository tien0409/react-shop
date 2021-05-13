const express = require("express");

const router = express.Router();
const {
  registerUser,
  getMyProfile,
  getAllUsers,
  updateUser,
  updateMyProfile,
  getUserById,
  deleteUser,
} = require("../controllers/userController");
const { authUser, authAdmin } = require("../middlewares/authMiddleware");

router
  .route("/profile")
  .get(authUser, getMyProfile)
  .put(authUser, updateMyProfile);
router.route("/").post(registerUser).get(authUser, authAdmin, getAllUsers);
router
  .route("/:id")
  .put(authUser, authAdmin, updateUser)
  .get(authUser, authAdmin, getUserById)
  .delete(authUser, authAdmin, deleteUser);

module.exports = router;
