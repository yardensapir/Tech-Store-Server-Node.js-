import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import { User } from "../types/types";

const userSchema = new Schema<User>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, required: true, default: false },
  },
  { timestamps: true }
);

userSchema.methods.matchPassword = async function (enterPassword: any) {
  return bcrypt.compare(enterPassword, this.password);
};

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.set("password", await bcrypt.hash(this.get("password"), salt));
  next();
});

const UserModel = mongoose.model("User", userSchema);

export default UserModel;
