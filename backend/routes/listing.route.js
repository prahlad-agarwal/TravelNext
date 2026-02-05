import express from "express";
import {
  addListing,
  deleteListing,
  findListing,
  getListing,
  ratingListing,
  search,
  updateListing,
} from "../controller/listing.controller.js";
import isAuth from "../middleware/isAuth.js";
import upload from "../middleware/multer.js";

const router = express.Router();

router.post(
  "/add",
  isAuth,
  upload.fields([{ name: "image1", maxCount: 1 }]),
  addListing
);

router.get("/get", getListing);
router.get("/findlistingbyid/:id", isAuth, findListing);
router.delete("/delete/:id", isAuth, deleteListing);
router.post("/ratings/:id", isAuth, ratingListing);
router.get("/search", search);

router.post(
  "/update/:id",
  isAuth,
  upload.fields([{ name: "image1", maxCount: 1 }]),
  updateListing
);
export default router;
