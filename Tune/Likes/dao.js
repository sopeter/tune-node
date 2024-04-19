import userModel from "../../Users/model.js"
import trackModel from "../Tracks/model.js";

export const userLikesTrack = async (userId, track) => {
  const user = await userModel.findById(userId);
  let actualTrack = await trackModel.findOne({ spotifyId: track.spotifyId });
  if (!actualTrack) {
    actualTrack = await trackModel.create(track);
  }
  await userModel.updateOne({_id: user._id}, {$addToSet : { likedTracks: actualTrack._id}});
  await trackModel.updateOne({_id: actualTrack._id}, {$addToSet : { likedBy: user._id}});
}

export const userUnlikesTrack = async (userId, trackId) => {
  const user = await userModel.findById(userId);
  const track = await trackModel.findById(trackId);

  await userModel.updateOne({_id: user._id}, {$pull : { likedTracks: track._id}});
  await trackModel.updateOne({_id: track._id}, {$pull : { likedBy: user._id}});
}

export const findAllLikedTracks = async (userId) => {
  const user = await userModel.findById(userId).populate("likedTracks");
  return user.likedTracks;
}