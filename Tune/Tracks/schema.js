import mongoose, {mongo} from "mongoose";

const trackSchema = new mongoose.Schema(
    {
      name: String,
      spotifyId: String,
      likedBy: [{
        ref: "Users",
        type: mongoose.Schema.Types.ObjectId,
      }],
      album: mongoose.Schema.Types.ObjectId,
    },
    { collection: "tracks" }
);
export default trackSchema;