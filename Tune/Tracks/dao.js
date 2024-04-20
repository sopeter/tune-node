import model from "./model.js";

export const findAllTracks = () => model.find();
export const findTrackById = (id) => model.findById(id);
export const findTrackBySpotifyId = (spotifyId) => model.find({ id: spotifyId});
export const findTrackByName = (trackName) => model.find({ name: { $regex: trackName, $options: 'i'}});
export const createTrack = (track) => model.create(track);
export const updateTrack = (trackId, track) =>
    model.updateOne({ trackId }, { $set: track });
export const deleteTrack = (trackId) => model.deleteOne({ trackId });