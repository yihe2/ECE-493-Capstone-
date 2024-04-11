const mongoose = require("mongoose");
const bcrypt = require("bcrypt")

// user for account creation
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

// hash password
// FR47
userSchema.pre("save", async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
  });


// FR5
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

// FR7, FR8, FR10 
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


    // Update the user's password
    user.password = newPassword;

    // Save the updated user
    await user.save();

    return user;
}

// FR7, FR8
userSchema.statics.changeEmail = async function(email, newEmail, password) {
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

    // Update the user's password
    user.email = newEmail;

    // Save the updated user
    await user.save();

    return user;
}



module.exports = mongoose.model("Users", userSchema);