const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const Recipient = require("mailersend").Recipient;
const EmailParams = require("mailersend").EmailParams;
const Sender = require("mailersend").Sender;
const MailerSend = require("mailersend");


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
      const { email, password, username } = req.body;
      const user = await User.create({ email, password, username });
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

      const mailerSend = new MailerSend.MailerSend({
        apiKey: process.env.API_KEY
      });

      const sentFrom = new Sender(process.env.EMAIL, "HealthWealth Team");
      const recipients = [new Recipient(email, "HealthWealth User")];

      const emailParams = new EmailParams()
      emailParams.setFrom(sentFrom).setTo(recipients).setReplyTo(sentFrom).setSubject("Sign up").setHtml("Thanks for signing up for healthwealth").setText("Thanks for signing up for healthwealth");

      await mailerSend.email.send(emailParams).then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });


      res.status(200).json({email, username, token});
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

module.exports.changePassword = async (req, res, next) => {
  try {
    
    const { email, password, newPassword } = req.body.password_data;
    console.log("New Password::")
    console.log(newPassword)
    const user = await User.changePassword(email, password, newPassword);
    res.status(200).json({email})
    next();
  } catch (err) {
    console.log(err);
    const errors = handleErrors(err);
    res.status
    res.status(401).json({ errors, created: false });
    next();
  }
};
