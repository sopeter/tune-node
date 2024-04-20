import userModel from "../../Users/model.js"
import trackModel from "../Tracks/model.js";

export const userLikesTrack = async (userId, track) => {
  const user = await userModel.findById(userId);
  let actualTrack = await trackModel.findOne({ id: track.id });
  if (!actualTrack) {
    actualTrack = await trackModel.create(track);
  }
  await userModel.updateOne({_id: user._id}, {$addToSet : { likedTracks: actualTrack.id}});
  await trackModel.updateOne({_id: actualTrack._id}, {$addToSet : { likedBy: user._id}});
}

export const userUnlikesTrack = async (userId, spotifyId) => {
  const user = await userModel.findById(userId);
  const track = await trackModel.findOne({ id: spotifyId });

  await userModel.updateOne({_id: user._id}, {$pull : { likedTracks: track.id}});
  await trackModel.updateOne({_id: track._id}, {$pull : { likedBy: user._id}});
}

export const findAllLikedTracks = async (userId) => {
  const user = await userModel.findById(userId).populate("likedTracks");
  return user.likedTracks;
}
