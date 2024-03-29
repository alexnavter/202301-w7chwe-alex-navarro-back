import { model, Schema } from "mongoose";

const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    minLength: 8,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  avatar: {
    type: String,
    unique: true,
    required: true,
  },
  relationship: {
    type: Object,
    friends: { type: Array },
    enemies: { type: Array },
  },
  backupImage: {
    // <-- Copia de seguridad
    type: String,
    required: true,
  },
});

const User = model("User", userSchema, "users");

export default User;
