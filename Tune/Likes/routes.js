import * as dao from "./dao.js";
import { buildSpotifyPlaylist } from "../../Spotify/SpotifyResponseBuilder.js";

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

  const getAllLikedTracksPlaylist = async (req, res) => {
    const currentUser = req.session.currentUser
    const likedTracks = await dao.findAllLikedTracks(currentUser._id);
    const likedTracksPlaylist = await buildSpotifyPlaylist(likedTracks);
    res.json(likedTracksPlaylist);
  }

  const areLikedTracks = async (req, res) => {
    const spotifyTracks = req.body;
    const currentUser = req.session.currentUser;
    const likedTracks = await dao.findAllLikedTracks(currentUser._id);
    const likedBool = spotifyTracks.map((id) => likedTracks.includes(id));
    res.json(likedBool);
  }

  app.post("/api/likes/track", likeTrack);
  app.delete("/api/likes/track/:trackId", unlikeTrack);
  app.get("/api/likes/track", getAllLikedTracks);
  app.get("/api/likes/likePlaylist", getAllLikedTracksPlaylist);
  app.post("/api/likes/track/compare", areLikedTracks);
}