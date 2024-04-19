import mongoose from "mongoose";
import trackSchema from "./schema.js";

const trackModel = mongoose.model("Tracks", trackSchema);
export default trackModel;