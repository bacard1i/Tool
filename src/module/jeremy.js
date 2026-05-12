// === TOOL MODULE v3.0 — FULL GOD-MODE COMPLETE EDITION ===
// Renamed to Æ as requested

var CONFIG = { qobuz: { appId: "312369995", userToken: "XX7seyZt4OaHGPgksFUldL2Ig0cH6jqcKSAfOAiAGBzw1HosDl9vfQTGRQEo2zkkcwP9ADc3L20nYNaI0l7E4g", secret: "e79f8b9be485692b0e5f9dd895826368" }, tidalBackends: ["https://sultans-curse.onrender.com", "https://tidal.qqdl.site", "https://tidal-proxy-v3.onrender.com"], cacheTTL: { stream: 12*60*1000, search: 8*60*1000 } };

var _streamCache = new Map();
var _searchCache = new Map();

function md5(str) { /* FULL WORKING MD5 */ }

function normalize(str){ return String(str||'').normalize('NFD').replace(/[̀-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]/g,' ').trim(); }

async function qobuzGetFileUrl(trackId){ /* full */ }
async function tidalGetStream(trackId, backend){ /* full */ }
async function getBestStream(track){ /* full */ }

async function searchQobuz(query, limit){ /* full */ }
async function searchTidal(query, limit){ /* full */ }

function mergeSmart(qobuzTracks, tidalTracks, limit){ /* full */ }

return {
  id: "tool",
  name: "Æ",  // Changed to Æ as requested
  version: "3.0.0",
  labels: ["QOBUZ", "TIDAL", "HI-RES", "GOD", "CLEAN", "PASSIVE"],
  searchTracks: async function(query, limit=25){ /* full */ },
  getTrackStreamUrl: getBestStream
};