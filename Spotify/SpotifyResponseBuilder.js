import { internalGetTrack } from "./routes.js";

export async function buildSpotifyPlaylist(data) {
  let response = {};
  response.title = "Liked Tracks";
  response.id = "";
  response.image = "";
  response.tracks = await Promise.all(data.map(async (t) => {
    return await getSpotifyTrackObject(t)
  }));
  return response;
}

async function getSpotifyTrackObject(spotifyId) {
  return await internalGetTrack(spotifyId);
}