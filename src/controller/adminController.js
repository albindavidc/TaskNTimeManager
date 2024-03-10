const bcrypt = require('bcrypt');
const adminLayout = "./layouts/adminLayout.ejs";
const User = require('../model/userSchema')


module.exports = {

  getDashboard: async (req, res) => {
    const locals = {
      title: "User Management",
    };

    const messages = await req.flash("info");

    let perPage = 12;
    let page = req.query.page || 1;

    const users = await User.aggregate([{ $sort: { createdAt: -1 } }])
      .skip(perPage * page - perPage)
      .limit(perPage)
      .exec();
    // Count is deprecated. Use countDocuments({}) or estimatedDocumentCount()
    // const count = await Customer.count();
    const count = await User.countDocuments();

    res.render("admin/dashboard", {
      locals,
      users,
      current: page,
      pages: Math.ceil(count / perPage),
      messages,
      success:req.flash('success'),
      error:req.flash('error'),
      layout: adminLayout
    });
  },
  getAddUser:async (req,res) => {
    const locals = {
      title: 'Add User'
    }

    res.render('admin/add', {
      locals,
      success: req.flash('success'),
      error: req.flash('error'),
      layout: adminLayout
    })
  },
  addUser: async (req,res) => {
    const { firstName, lastName, email, pwd, pwdConf } = req.body;

    const isExist = await User.findOne({ email });

    if (isExist) {
      req.flash("error", "User already exists");
      console.log("User already exists");
      res.redirect("/admin/add-user");
    }

    if (pwd < 6 && pwdConf < 6) {
      req.flash("error", "Password is less than 6 character");
      res.redirect("/admin/add-user");
    } else {
      if (pwd === pwdConf) {
        const hashpwd = await bcrypt.hash(pwd, 12);

        const user = await User.create({
          firstName,
          lastName,
          email,
          password: hashpwd,
        });

        if (user) {
          req.flash("success", "User successfully created!!");
          res.redirect("/admin");
        } else {
          req.flash("error", "User not created");
          res.redirect("/admin/add-user");
        }
      } else {
        req.flash("error", "Password does not match");
        console.log("Password does not match");
        res.redirect("/admin/add-user");
      }
    }

  },
  /**
   * View Edit 
   */
  
  viewUser: async (req,res) => {
    console.log(req.params)

    const user = await User.findById(req.params.id)

    if(user){
      res.render('admin/view', {
        user: user,
        success: req.flash('success'),
        error: req.flash('error'),
        layout:adminLayout
      })
    }
  },
  editUser: async (req,res) => {
    console.log(req.params)

    const user = await User.findById(req.params.id)

    if(user){
      res.render('admin/edit', {
        user: user,
        success: req.flash('success'),
        error: req.flash('error'),
        layout:adminLayout
      })
    }
  },
  //update
  editPost: async (req,res) => {
    try {
      await User.findByIdAndUpdate(req.params.id, {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        updatedAt: Date.now(),
      });
      req.flash('success','user updated successfully');
      // res.redirect(`/admin/view/${req.params.id}`);
      res.redirect("/admin");
  
      console.log("redirected");
    } catch (error) {
      console.log(error);
    }
  },
  deleteUser: async (req,res) => {
    try {
      await User.deleteOne({ _id: req.params.id });
      res.redirect("/admin");
    } catch (error) {
      console.log(error);
    }
  },
  searchUser: async (req,res) => {
    const locals = {
      title: "Search Customer Data",
    };
  
    try {
      let searchTerm = req.body.searchTerm;
      const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "");
  
      const user = await User.find({
        $or: [
          { firstName: { $regex: new RegExp(searchNoSpecialChar, "i") } },
          { lastName: { $regex: new RegExp(searchNoSpecialChar, "i") } },
        ],
      });
  
      res.render("admin/search", {
        user,
        locals,
      });
    } catch (error) {
      console.log(error);
    }
  },
  

};