const User = require("../models/User");
const { statusCode } = require("../utils/constants");
const { validatePassword, hashPassword } = require("../utils/utils");
const jwt = require("jsonwebtoken");

exports.signupUser = async (req, res) => {
  try {   
    let { phone, email, password } = req.body;
    let user = await User.findOne({
      $or: [
        { phone },
        { email }
      ]
    });

    if (user)
      return res.status(statusCode.Exists).json({
        error: true,
        message: "phone or email already exist!",
      });
    const hashedPass = await hashPassword(password);
    let customer = await User.create({
      phone,
      email,
      password: hashedPass,
      type: "USER",
    });

    customer = customer.toObject({
      versionKey: false,
    });

    const accessToken = jwt.sign(
      { userId: customer._id.toString(), type: "USER" },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    delete customer.password;

    res.set("x-access-token", accessToken);
    return res.status(statusCode.Success).json({
      error: false,
      data: customer,
    });
  } catch (error) {
    console.log(error);
    return res.status(statusCode.InternalError).json({
      error: true,
      message: "Error while signing up = " + error,
    });
  }
}
exports.loginUser = async (req, res) => {
  try {
    let { phone,password } = req.body;    
    let customer = await User.findOne({ phone });

    if (!customer)
      return res.status(statusCode.NotFound).json({
        error: true,
        message: "User does not exist",
      });

    const validPassword = await validatePassword(password, customer.password);
    if (!validPassword)
      return res.status(400).json({
        error: true,
        message: "Invalid password",
      });

    const accessToken = jwt.sign(
      { userId: customer._id.toString(), type: "CUSTOMER" },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );    
    customer = customer.toObject({
      versionKey: false,
    });  
    
    customer.token = accessToken
    delete customer.password;
    res.set("x-access-token", accessToken);
    res.set("Access-Control-Expose_Headers", "x-access-token")
    return res.status(statusCode.Success).json({
      error: false,
      data: customer,
    });
  } catch (error) {
    console.log(error);
    return res.status(statusCode.InternalError).json({
      error: true,
      message: "Error while login up = " + error,
    });
  }
}