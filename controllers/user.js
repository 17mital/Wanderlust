const User=require("../models/user");
module.exports.redersignup=(req,res)=>{
    res.render("users/signup.ejs")
}
module.exports.signup=async(req,res)=>{
    try{
        let {username,email,password}=req.body;
        const newUser= new User({email,username});
        const registerdUser=  await User.register(newUser,password);
        console.log(registerdUser);
        req.login(registerdUser,(err)=>{
            if(err){
                return next(err);
            }
            req.flash("success","welcome to wanderlust!");
            res.redirect("/listings");
        })
    }catch(e){
        req.flash("error",e.message);
        res.redirect("/signup");
    }
};
module.exports.renderlogin=(req,res)=>{
    res.render("users/login.ejs");
};
module.exports.login=async(req,res)=>{
    req.flash("success","Welcome back to wanderlust ! ");
    let redirectUrl=res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
};
module.exports.logout=(req,res)=>{
    req.logout((err)=>{
        if(err){
           return next(err);
        }
        req.flash("sucess","you are Logged Out!");
        res.redirect("/listings");
    })
}
