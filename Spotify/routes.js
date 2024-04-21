import "dotenv/config";
import axios from "axios";
import { fetchAccessToken } from "./SpotifyAuth.js";
import {
  playlistParser, searchTrackParser, trackParser
} from "./SpotifyResponseParser.js";

let accessToken = await fetchAccessToken();

setInterval(async () => {
  accessToken = await fetchAccessToken();
}, 50 * 60 * 1000);

export const internalGetTrack = async (tid) => {
  const authOptions = {
    url: 'https://api.spotify.com/v1/tracks/' + tid.toString(), headers: {
      'Authorization': 'Bearer ' + accessToken.toString(),
    },
  };
  try {
    const response = await axios.get(authOptions.url,
        { headers: authOptions.headers });
    return trackParser(response.data);
  } catch (e) {
    console.log('Could not find spotify track using internal spotify id')
    throw new Error('Error finding track on Spotify: ' + e);
  }
}

export default async function SpotifyRoutes(app) {

  const getTodaysTopHits = async (req, res) => {
    const authOptions = {
      url: 'https://api.spotify.com/v1/playlists/37i9dQZF1DXcBWIGoYBM5M',
      headers: {
        'Authorization': 'Bearer ' + accessToken.toString(),
      },
    };
    try {
      const response = await axios.get(authOptions.url,
          { headers: authOptions.headers });
      const simpleResponse = playlistParser(response.data)
      res.json(simpleResponse);
    } catch (e) {
      console.error(e.message);
      res.status(400);
    }
  }

  const getWeeklyNewReleases = async (req, res) => {
    const authOptions = {
      url: 'https://api.spotify.com/v1/playlists/37i9dQZF1DX4JAvHpjipBk',
      headers: {
        'Authorization': 'Bearer ' + accessToken.toString(),
      },
    };

    try {
      const response = await axios.get(authOptions.url,
          { headers: authOptions.headers });
      const simpleResponse = playlistParser(response.data)
      res.json(simpleResponse);
    } catch (e) {
      console.error(e.message);
      res.status(400);
    }
  }

  const searchTracks = async (req, res) => {
    const { query } = req.params;
    const authOptions = {
      url: 'https://api.spotify.com/v1/search?q=' + query.toString()
          + '&type=track', headers: {
        'Authorization': 'Bearer ' + accessToken.toString(),
      },
    };

    try {
      const response = await axios.get(authOptions.url,
          { headers: authOptions.headers });
      const simpleResponse = searchTrackParser(response.data);
      res.json(simpleResponse);
    } catch (e) {
      console.error(e.message);
      res.status(400);
    }
  }

  const getTrack = async (req, res) => {
    const { tid } = req.params;
    const authOptions = {
      url: 'https://api.spotify.com/v1/tracks/' + tid.toString(), headers: {
        'Authorization': 'Bearer ' + accessToken.toString(),
      },
    };

    try {
      const response = await axios.get(authOptions.url,
          { headers: authOptions.headers });
      const simpleResponse = trackParser(response.data);
      res.json(simpleResponse);
    } catch (e) {
      console.error(e.message);
      res.status(400);
    }
  }

  app.get("/api/spotify/todays-top-hits", getTodaysTopHits);
  app.get("/api/spotify/new-releases", getWeeklyNewReleases);
  app.get("/api/spotify/search/tracks/:query", searchTracks);
  app.get("/api/spotify/tracks/:tid", getTrack);
}