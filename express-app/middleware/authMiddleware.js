const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

module.exports.checkUser = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, "secret key", async (err, decodedToken) => {
            if(err) {
                res.json({status: false});
                next();
            }
            else {
                const user = await User.findById(decodedToken.id);
                if (user) {
                    console.log("called from middlware")
                    res.json({status: true, user: user.email});
                }
                else {
                    res.json({status: false});
                    next();    
                }
            }
        }) // change to env variable
    }
    else {
        res.json({status: false});
        next();
    }
}