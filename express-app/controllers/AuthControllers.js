const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const maxAge = 3*24*60*60; // 3 days

const createToken = (id) => {
    return jwt.sign({id}, "secret key", { // TODO: Change Secret KEY
      expiresIn: maxAge,
    });
  };

const handleErrors = (err) => {
    let errors = {email: "", password: ""};

    if (err.message == "Incorrect email") {
        err.email = 'That email is not registered'
    }

    if (err.message == "Incorrect password") {
        err.email = 'That password is incorrect'
    }

    if (err.code == 11000) {
        errors.email = "Email already registered";
        return errors;
    }

    if(err.message.includes("Users validation failed")) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message
        });
        return errors
    }
};


module.exports.register = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const user = await User.create({ email, password });
      const token = createToken(user._id);
  
      // res.cookie("jwt", token, {
      //   withCredentials: true,
      //   // path: '/',
      //   httpOnly: false,
      //   maxAge: maxAge * 1000,
      //   sameSite: "None"
      //   // secure: true
      // })
      
      // res.status(201).json({ user: user._id, created: true });
      res.status(200).json({email ,token})
    } catch (err) {
      console.log(err);
      const errors = handleErrors(err);
      res.json({ errors, created: false });
    }
  };

module.exports.log_in = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.login(email, password);
        const token = createToken(user._id);
        console.log(user)

        const test = res.cookie("jwt", token, {
          withCredentials: true,
          // path: '/',
          httpOnly: false,
          maxAge: maxAge * 1000,
          sameSite: 'None',
          // secure: true
        });
        // console.log(test)
        // console.log("pushing cookie")

        
        // res.status(200).json({ user: user._id, created: true });
        res.status(200).json({email ,token})
        next();
      } catch (err) {
        console.log(err);
        const errors = handleErrors(err);
        res.status
        res.status(401).json({ errors, created: false });
        next();
      }
};