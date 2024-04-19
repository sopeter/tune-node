import "dotenv/config";
import axios from "axios";
import { fetchAccessToken } from "./SpotifyAuth.js";
import {
  playlistParser,
  searchTrackParser,
  trackParser
} from "./SpotifyResponseParser.js";

export default async function SpotifyRoutes(app) {
  let accessToken = await fetchAccessToken();

  const getTodaysTopHits = async (req, res) => {
    const authOptions = {
      url: 'https://api.spotify.com/v1/playlists/37i9dQZF1DXcBWIGoYBM5M',
      headers: {
        'Authorization': 'Bearer ' + accessToken.toString(),
      },
    };
    let response = null;
    try {
      response = await axios.get(authOptions.url, { headers: authOptions.headers});
    } catch (e) {
      console.error(e.message);
      res.status(400);
      return;
    }
    const simpleResponse = playlistParser(response.data)
    res.json(simpleResponse);
  }

  const searchTracks = async (req, res) => {
    const { query } = req.params;
    const authOptions = {
      url: 'https://api.spotify.com/v1/search?q=' + query.toString() + '&type=track',
      headers: {
        'Authorization': 'Bearer ' + accessToken.toString(),
      },
    };
    let response = null;
    try {
      response = await axios.get(authOptions.url, { headers: authOptions.headers});
    } catch (e) {
      console.error(e.message);
      res.status(400);
      return;
    }
    const simpleResponse = searchTrackParser(response.data);
    res.json(simpleResponse);
  }

  const getTrack = async (req, res) => {
    const { tid } = req.params;
    const authOptions = {
      url: 'https://api.spotify.com/v1/tracks/' + tid.toString(),
      headers: {
        'Authorization': 'Bearer ' + accessToken.toString(),
      },
    };
    let response = null;
    try {
      response = await axios.get(authOptions.url, { headers: authOptions.headers});
    } catch (e) {
      console.error(e.message);
      res.status(400);
      return;
    }
    const simpleResponse = trackParser(response.data);
    res.json(simpleResponse);
  }

  app.get("/api/spotify/todays-top-hits", getTodaysTopHits);
  app.get("/api/spotify/search/tracks/:query", searchTracks);
  app.get("/api/spotify/tracks/:tid", getTrack);

  setInterval(async () => {
        accessToken = await fetchAccessToken();
      },
      50 * 60 * 1000
  );
}