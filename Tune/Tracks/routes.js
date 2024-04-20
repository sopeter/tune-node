import * as dao from "./dao.js";

export default function TrackRoutes(app) {
  const createTrack = async (req, res) => {
    const track = await dao.createTrack(req.body);
    res.json(track);
  };

  const deleteTrack = async (req, res) => {
    const { trackId } = req.params;
    const status = await dao.deleteTrack(trackId);
    res.json(status);
  };

  const findAllTracks = async (req, res) => {
    const tracks = await dao.findAllTracks();
    res.json(tracks);
  };

  const findTrackById = async (req, res) => {
    const { trackId } = req.params;
    const track = await dao.findTrackById(trackId);
    res.json(track);
  };


  const findTrackBySpotifyId = async (req, res) => {
    const { spotifyId } = req.params;
    const track = await dao.findTrackBySpotifyId(spotifyId);
    res.json(track);
  };

  const updateTrack = async (req, res) => {
    const { trackId } = req.params;
    const status = await dao.updateTrack(trackId, req.body);
    res.json(status);
  };

  app.get("/api/tracks/:trackId", findTrackById);
  app.get("/api/tracks/spotify/:spotifyId", findTrackBySpotifyId);
  app.put("/api/tracks/:trackId", updateTrack);
  app.delete("/api/tracks/:trackId", deleteTrack);
  app.post("/api/tracks", createTrack);
  app.get("/api/tracks", findAllTracks);
}
