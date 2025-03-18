const express=require("express");
const router=express.Router();
const wrapAsync =require("../utils/wrapAsync.js");
const Listing =require("../models/listing.js");
const {isLoggedIn, isOwner,validateListing}=require("../middleware.js");
const listingController =require("../controllers/listings.js");
const multer  = require("multer");
const {storage}=require("../cloudConfig.js");
const upload = multer({ storage });

router.route("/")
.get(wrapAsync(listingController.index))
.post(isLoggedIn,upload.single('listing[image]'),validateListing,wrapAsync(listingController.createlistings));

router.get("/new" ,isLoggedIn,listingController.newform);
router.route("/:id")
.get(wrapAsync(listingController.showlistings))
.put(isLoggedIn,isOwner,upload.single('listing[image]'),validateListing,wrapAsync(listingController.updatelisting))
.delete(isLoggedIn,isOwner,wrapAsync(listingController.deletelisting));

router.get("/:id/edit" ,isLoggedIn,isOwner,wrapAsync(listingController.editform));

module.exports=router;