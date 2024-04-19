import userModel from "../../Users/model.js"

export const userFollowsUser = async (userId, followingUserId) => {
  const user = await userModel.findById(userId);
  const following = await userModel.findById(followingUserId);

  await userModel.updateOne({_id: user._id}, {$addToSet : { following: following._id}});
  await userModel.updateOne({_id: following._id}, {$addToSet : { followers: user._id}});
}

export const userUnfollowsUser = async (userId, followingUserId) => {
  const user = await userModel.findById(userId);
  const following = await userModel.findById(followingUserId);

  await userModel.updateOne({_id: user._id}, {$pull : { following: following._id}});
  await userModel.updateOne({_id: following._id}, {$pull : { followers: user._id}});
}

export const findAllFollowing = async (userId) => {
  const user = await userModel.findById(userId).populate("following");
  return user.following;
}

export const findAllFollowers = async (userId) => {
  const user = await userModel.findById(userId).populate("followers");
  return user.followers;
}