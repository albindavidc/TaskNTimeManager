// const User = require('../model/userSchema');

module.exports={
    userHome:(req,res)=>{
        const locals={
            title:"Home Page",
        }
        try {
            res.render('index',{
                locals,
                success: req.flash("success"),
                error: req.flash("error"),
                user: req.session.user,
            })
            
        } catch (error) {
            console.log(error);
        }
    }
}