import * as dao from "./dao.js"
import {ObjectId} from "mongodb";

export default function SocialRoutes(app) {

  const followUser = async (req, res) => {
    const { uid } = req.params;
    const currentUser = {
      _id: new ObjectId('6621b1a49e8035a19dd04a2e'),
      username: 'test',
      password: 'password',
      role: 'USER',
      following: [],
      followers: [],
      tracks: [],
      likedTracks: [],
      __v: 0
    };

    await dao.userFollowsUser(currentUser._id, uid);
    res.sendStatus(200);
  }

  const unFollowUser = async (req, res) => {
    const { uid } = req.params;
    const currentUser = req.session.currentUser;
    await dao.userUnfollowsUser(currentUser._id, uid);
    res.sendStatus(200).send("Unfollowed");
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
  app.post("/api/social/unfollow/:uid", unFollowUser);
  app.get("/api/social/following/:uid", getAllFollowing);
  app.get("/api/social/followers/:uid", getAllFollowers);
}