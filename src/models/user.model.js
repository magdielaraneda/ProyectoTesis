import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  rut: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  roles: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
    },
  ],
  notifications: [
    {
      reservacionId: { type: mongoose.Schema.Types.ObjectId, ref: "Reservacion" },
      mensaje: { type: String },
      fecha: { type: Date, default: Date.now },
      leida: { type: Boolean, default: false },
    },
  ],
});

userSchema.statics.comparePassword = async function (inputPassword, hashedPassword) {
  return await bcrypt.compare(inputPassword, hashedPassword);
};

userSchema.statics.encryptPassword = async function (password) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

export default mongoose.model("User", userSchema);
