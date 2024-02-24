import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minlength: 3,
      maxlength: 30,
      required: true,
    },
    password: {
      type: String,
      minlength: 4,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    pic:{
      data:Buffer,
      contentType:String,
    }
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("user", UserSchema);
