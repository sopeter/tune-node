export function playlistParser(data) {
  const playlist = {};
  playlist.title = data.name;
  playlist.id = data.id;
  playlist.image = data.images[0].url;
  playlist.tracks = data.tracks.items.map(playlistTracksParser);
  return playlist;
}

function playlistTracksParser(data) {
  const track = data.track
  return trackParser(track);
}

export function trackParser(data) {
  const track = {};
  track.album = albumParser(data.album);
  track.artists = data.artists.map(artistParser);
  track.id = data.id;
  track.name = data.name;
  track.popularity = data.popularity;
  track.preview = data.preview_url;
  track.length = data.duration_ms;
  return track;
}

function albumParser(data) {
  const album = {};
  album.type = data.album_type;
  album.numberOfTracks = data.total_tracks;
  album.id = data.id;
  album.image = data.images[0].url;
  album.name = data.name;
  album.release_date = data.release_date;
  album.artists = data.artists.map(simpleArtistParser);
  return album;
}

function simpleArtistParser(data) {
  const artist = {};
  artist.id = data.id;
  artist.name = data.name;
  return artist;
}

function artistParser(data) {
  const artist = {};
  artist.id = data.id;
  artist.name = data.name;
  // SAYS IT IS IN RESPONSE FROM DOC BUT ACTUALLY ISN'T :(
  // artist.followers = data.followers;
  // artist.genres = data.genres;
  // artist.image = data.images[0].url;
  // artist.popularity = data.popularity;
  return artist;
}

export function searchTrackParser(data) {
  const response = {};
  const tracks = data.tracks;
  response.total = tracks.total;
  response.tracks = tracks.items.map(trackParser)
  return response;
}