const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { User } = require("../models/User.js");

const signupLogic = async (req, res) => {
    const { username, email, password } = req.body;

    //checking whether an already register user with the provided email
    let users = await User.find({ email });
    if (users.length) {
      return res.status(401).json({
        success: false,
        message: "An user with this email already exists in the database",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    let newuser = new User({
      username,
      email,
      password: hashedPassword,
    });

    let user = await newuser.save();
    let jwtToken = jwt.sign({ id: user._id }, process.env.JWTSECRET,{expiresIn:'24h'});

    res
      .status(200)
      .json({ success: true, message: "User has registered Successfully" ,jwtToken});
  }


const loginLogic = async (req, res) => {
    const { email, password } = req.body;
    let registeredUser = await User.find({ email });
    if (!registeredUser.length) {
      return res.status(404).json({
        success: false,
        message: "No User found with this Email ! Try sign up",
      });
    }
    let user = registeredUser[0];
    let iscorrectPassword = await bcrypt.compare( password,user.password);
    if (!iscorrectPassword) {
      return res
        .status(409)
        .json({ success: false, message: "Wrong credentials!" });
    }


    let jwtToken = jwt.sign({ id: user._id }, process.env.JWTSECRET,{expiresIn:'24h'});

    res.status(200).json({
      success: true,
      message: "Logged In successfully!",
      jwtToken,
    });
  }


  module.exports={signupLogic,loginLogic}