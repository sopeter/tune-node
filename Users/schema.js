import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
      username: { type: String, required: true, unique: true},
      password: { type: String, required: true},
      firstName: String,
      lastName: String,
      email: String,
      role: {
        type: String,
        enum: ["USER", "ADMIN", "ARTIST"],
        default: "USER"
      },
      following: [{
        ref: "Users",
        type: mongoose.Schema.Types.ObjectId,
      }],
      followers: [{
        ref: "Users",
        type: mongoose.Schema.Types.ObjectId,
      }],
      tracks: [],
      likedTracks: [],
    },
    {collection: "users"}
);

export default userSchema;