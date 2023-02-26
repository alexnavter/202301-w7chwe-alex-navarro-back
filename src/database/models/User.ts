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
  },
  email: {
    type: String,
  },
  avatar: {
    type: String,
  },
  relationship: {
    type: Object,
    friends: { type: Array },
    enemies: { type: Array },
  },
});

const User = model("User", userSchema, "users");

export default User;
