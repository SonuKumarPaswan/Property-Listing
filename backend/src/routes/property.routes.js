const express = require("express");
const router = express.Router();
const { upload } = require("../config/cloudinary");
const authMiddleware = require("../middlewares/auth.middleware");
const {
  getAllProperties,
  getPropertyById,
  createProperty,
  updateProperty,
  deleteProperty,
  searchProperties,
  getMyProperties,
} = require("../controllers/property.controller");
const validate = require("../middlewares/validate.middleware");
const {
  propertyValidationSchema,
} = require("../schemaValidation/property.validation");

router.get("/search", searchProperties);
router.get("/", getAllProperties);
router.get("/my", authMiddleware, getMyProperties);
router.get("/:id", getPropertyById);

router.post("/", authMiddleware, upload.array("images", 10), createProperty);
router.put("/:id", authMiddleware, upload.array("images", 10), updateProperty);
router.delete("/:id", authMiddleware, deleteProperty);

module.exports = router;