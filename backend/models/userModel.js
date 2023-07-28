const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    photoURL: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Static Singup Methods
userSchema.statics.signup = async function (
  email,
  password,
  username,
  photoURL
) {
  if (!email || !password) {
    throw Error("All Fields must be filled");
  }
  if(!validator.isEmail(email)){
    throw Error("Email must be a valid email");
  }
  if(!validator.isStrongPassword(password)){
    throw Error("Password not strong enough");
  }
  const exsits = await this.findOne({ email: email });
  if (exsits) {
    throw Error("Email Already Exists");
  }
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ email, password: hash, username, photoURL });

  return user;
};

userSchema.statics.signin = async function(email , password) {
    if (!email || !password) {
        throw Error("All Fields must be filled");
    }
    const user = await this.findOne({ email: email });
    if (!user) {
      throw Error("Email doesn't exists");
    }
    const match = await bcrypt.compare(password, user.password);
    if(!match){
        throw Error("Incorrect password");
    }
    return user;
}

const User = mongoose.model("Users", userSchema);
module.exports = User;
