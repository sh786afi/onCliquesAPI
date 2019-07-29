import mongoose from "mongoose";
import validator from "validator";
const Admin = new mongoose.Schema({
  AdminName: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  Occupation: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email is invalid");
      }
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 7,
    trim: true,
    validate(value) {
      if (value.toLowerCase().includes("password")) {
        throw new Error('Password cannot contain "password"');
      }
    }
  }
});
export default Admin;
