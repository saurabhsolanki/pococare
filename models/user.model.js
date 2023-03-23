const { Schema, model } = require("mongoose");
const bcrypt=require('bcryptjs')
const jwt = require("jsonwebtoken");

const UserSchema = new Schema({
  name: { type: String, required: true},
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

UserSchema.pre("save", async function (next) {

  if (this.isModified("password")) {
      this.password = await bcrypt.hash(this.password, 12);
  }
  next()
});


const userModel = model("user", UserSchema);
module.exports = userModel;
