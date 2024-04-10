const mongoose = require("mongoose");
const bcrypt = require("bcrypt")

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "email is required"],
        unique: true
    },
    usernmae: {
        type: String,
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
        console.log(password)
        console.log(user.password)
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

userSchema.statics.changePassword = async function(email, password, newPassword) {
    // Find the user by email
    const user = await this.findOne({ email });

    if (!user) {
        throw new Error("User not found");
    }

    // Validate current password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new Error("Incorrect current password");
    }

    // Hash the new password
    // const salt = await bcrypt.genSalt();
    // const newPasswordHash = await bcrypt.hash(newPassword, salt);

    // Update the user's password
    user.password = newPassword;

    // Save the updated user
    await user.save();

    return user;
}




module.exports = mongoose.model("Users", userSchema);