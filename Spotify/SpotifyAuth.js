import axios from "axios";

export async function fetchAccessToken() {
  const client_id = process.env.SPOTIFY_CLIENT_ID || null;
  const client_secret = process.env.SPOTIFY_CLIENT_SECRET || null;
  const authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: {
      'Authorization': 'Basic ' + Buffer.from(client_id + ':' + client_secret).toString('base64'),
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: 'grant_type=client_credentials'
  };
  try {
    const response = await axios.post(authOptions.url, authOptions.data, { headers: authOptions.headers });
    if (response.status === 200) {
      return response.data.access_token;
    } else {
      throw new Error('Failed to get Spotify Token');
    }
  } catch (error) {
    throw new Error('Error fetching Spotify token: ' + error.message);
  }
}