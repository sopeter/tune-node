import * as dao from "./dao.js";

export default function LikeRoutes(app) {
  const likeTrack = async (req, res) => {
    const track = req.body;
    const currentUser = req.session.currentUser

    await dao.userLikesTrack(currentUser._id, track);
    res.sendStatus(200);
  }

  const unlikeTrack = async (req, res) => {
    const { trackId } = req.params;
    const currentUser = req.session.currentUser

    await dao.userUnlikesTrack(currentUser._id, trackId);
    res.sendStatus(200);
  }

  const getAllLikedTracks = async (req, res) => {
    const currentUser = req.session.currentUser
    const likedTracks = await dao.findAllLikedTracks(currentUser._id);
    res.json(likedTracks);
  }

  app.post("/api/likes/track", likeTrack);
  app.delete("/api/likes/track/:trackId", unlikeTrack);
  app.get("/api/likes/track", getAllLikedTracks);
}