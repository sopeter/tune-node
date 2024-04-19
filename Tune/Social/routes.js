import * as dao from "./dao.js"

export default function SocialRoutes(app) {

  const followUser = async (req, res) => {
    const { uid } = req.params;
    const currentUser = req.session.currentUser;

    await dao.userFollowsUser(currentUser._id, uid);
    res.sendStatus(200);
  }

  const unfollowUser = async (req, res) => {
    const { uid } = req.params;
    const currentUser = req.session.currentUser;

    await dao.userUnfollowsUser(currentUser._id, uid);
    res.sendStatus(200);
  }

  const getAllFollowing = async (req, res) => {
    const { uid } = req.params;
    const following = await dao.findAllFollowing(uid);
    res.json(following);
  }

  const getAllFollowers = async (req, res) => {
    const { uid } = req.params;
    const followers = await dao.findAllFollowers(uid);
    res.json(followers);
  }

  app.post("/api/social/follow/:uid", followUser);
  app.delete("/api/social/unfollow/:uid", unfollowUser);
  app.get("/api/social/following/:uid", getAllFollowing);
  app.get("/api/social/followers/:uid", getAllFollowers);
}