import mongoose from "mongoose";

const commentSchema = mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    fullname:{
      type: String,
      
    }
  },
  { timestamps: true }
);
const commentModel = mongoose.model("Comment", commentSchema);
export default commentModel;
