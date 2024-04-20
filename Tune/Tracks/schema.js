import mongoose, {mongo} from "mongoose";

const trackSchema = new mongoose.Schema(
    {
      name: String,
      id: String,
      likedBy: [{
        ref: "Users",
        type: mongoose.Schema.Types.ObjectId,
      }],
    },
    { collection: "tracks" }
);
export default trackSchema;