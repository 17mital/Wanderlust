const express=require("express");
const router=express.Router();
const User=require("../models/user");
const wrapAsync=require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware");
const usercontroller=require("../controllers/user");

router.route("/signup")
.get(usercontroller.redersignup)
.post(wrapAsync(usercontroller.signup));
router.route("/login")
.get(usercontroller.renderlogin)
.post(saveRedirectUrl,passport.authenticate("local",{failureRedirect:'/login' , failureFlash:true}) ,usercontroller.login);
router.get("/logout",saveRedirectUrl,usercontroller.logout);

module.exports=router;