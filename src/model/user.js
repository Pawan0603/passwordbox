import mongoose, { Schema } from "mongoose";

const pwDataSchema = new Schema({
    sideName: {
      type: String,
      required: true
    },
    identifyar: {
        type: String,
        required: [true, "Email name is required"],
    },
    password: {
        type: String,
        required: [true, "Password  is required"]
    },
    note: {
        type: String
    }
  })

const UserSchema = new Schema({
    name: {
        type: String,
        required: [true, "name is required"]
    },
    email: {
        type: String,
        required: [true, "Email name is required"],
        unique: true,
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "plese use a valid email address"]
    },
    password: {
        type: String,
        required: [true, "Password  is required"]
    },
    pwData: [pwDataSchema]
})

const UserModel = mongoose.models.User || mongoose.model("User", UserSchema)

export default UserModel