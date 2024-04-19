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

  // THINK ABOUT URI
  const findTrackByName = async (req, res) => {
    const { name } = req.params;
    const track = await dao.findTrackByName(name);
    res.json(track);
  };

  const updateTrack = async (req, res) => {
    const { trackId } = req.params;
    const status = await dao.updateTrack(trackId, req.body);
    res.json(status);
  };


  app.post("/api/tracks", createTrack);
  app.get("/api/tracks", findAllTracks);
  app.get("/api/tracks/:trackId", findTrackById);
  app.put("/api/tracks/:trackId", updateTrack);
  app.delete("/api/tracks/:trackId", deleteTrack);
}
