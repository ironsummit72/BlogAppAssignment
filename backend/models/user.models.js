import mongoose from "mongoose";
import { generateHash } from "../utils/HashGen.utill.js";
const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    blogs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Blog",
      },
    ],
  },
  {
    timestamps: true,
  }
);
userSchema.pre("save", function (next) {
  try {
    if (!this.isModified("password")) {
      return next();
    } else {
      const { hash, salt } = generateHash(this.password);
      this.password = `${hash}.${salt}`;
      next();
    }
  } catch (error) {
    return next(error);
  }
});
const usermodel = mongoose.model("User", userSchema);
export default usermodel;
