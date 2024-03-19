const mongoose = require("mongoose");
const bcrypt = require("bcrypt")

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "email is required"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "password is required"],
    },
});

userSchema.pre("save", async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
  });

userSchema.statics.login = async function(email, password) {
    const user = await this.findOne({email});

    if (user) {
        const auth = await bcrypt.compare(password, user.password);
        if(auth) {
            return user
        }
        else {
            throw Error("incorrect password")
        }
    }
    else {
        throw Error("incorrect email")
    }
}


module.exports = mongoose.model("Users", userSchema);