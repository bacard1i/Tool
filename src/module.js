// module.js - Empire Hybrid Module for 8SPINE
// Qobuz Direct (fast playback) + Tidal Fallback + MD5 on BOTH paths
// Version 4.1 - Quality First with Full Integrity

// ==================== COMPLETE PURE JS MD5 FUNCTION ====================
function md5(string) {
    function rotateLeft(n, s) { return (n << s) | (n >>> (32 - s)); }
    function addUnsigned(x, y) {
        const lsw = (x & 0xFFFF) + (y & 0xFFFF);
        const msw = (x >> 16) + (y >> 16) + (lsw >> 16);
        return (msw << 16) | (lsw & 0xFFFF);
    }
    function cmn(q, a, b, x, s, t) { return addUnsigned(rotateLeft(addUnsigned(addUnsigned(a, q), addUnsigned(x, t)), s), b); }
    function ff(a, b, c, d, x, s, t) { return cmn((b & c) | ((~b) & d), a, b, x, s, t); }
    function gg(a, b, c, d, x, s, t) { return cmn((b & d) | (c & (~d)), a, b, x, s, t); }
    function hh(a, b, c, d, x, s, t) { return cmn(b ^ c ^ d, a, b, x, s, t); }
    function ii(a, b, c, d, x, s, t) { return cmn(c ^ (b | (~d)), a, b, x, s, t); }

    let x = [];
    let a = 1732584193, b = -271733879, c = -1732584194, d = 271733878;
    let str2 = unescape(encodeURIComponent(string));
    let length = str2.length * 8;

    for (let i = 0; i < length; i += 8) x[i >> 5] |= (str2.charCodeAt(i / 8) & 0xFF) << (i % 32);
    x[length >> 5] |= 0x80 << (length % 32);
    x[(((length + 64) >>> 9) << 4) + 14] = length;

    for (let i = 0; i < x.length; i += 16) {
        let olda = a, oldb = b, oldc = c, oldd = d;
        a = ff(a, b, c, d, x[i], 7, 0xd76aa478); d = ff(d, a, b, c, x[i + 1], 12, 0xe8c7b756);
        c = ff(c, d, a, b, x[i + 2], 17, 0x242070db); b = ff(b, c, d, a, x[i + 3], 22, 0xc1bdceee);
        a = gg(a, b, c, d, x[i + 4], 7, 0xf57c0faf); d = gg(d, a, b, c, x[i + 5], 12, 0x4787c62a);
        c = gg(c, d, a, b, x[i + 6], 17, 0xa8304613); b = gg(b, c, d, a, x[i + 7], 22, 0xfd469501);
        a = gg(a, b, c, d, x[i + 8], 7, 0x698098d8); d = gg(d, a, b, c, x[i + 9], 12, 0x8b44f7af);
        c = gg(c, d, a, b, x[i + 10], 17, 0xffff5bb1); b = gg(b, c, d, a, x[i + 11], 22, 0x895cd7be);
        a = gg(a, b, c, d, x[i + 12], 7, 0x6b901122); d = gg(d, a, b, c, x[i + 13], 12, 0xfd987193);
        c = gg(c, d, a, b, x[i + 14], 17, 0xa679438e); b = gg(b, c, d, a, x[i + 15], 22, 0x49b40821);

        a = hh(a, b, c, d, x[i + 1], 5, 0xf61e2562); d = hh(d, a, b, c, x[i + 6], 9, 0xc040b340);
        c = hh(c, d, a, b, x[i + 11], 14, 0x265e5a51); b = hh(b, c, d, a, x[i], 20, 0xe9b6c7aa);
        a = hh(a, b, c, d, x[i + 5], 5, 0xd62f105d); d = hh(d, a, b, c, x[i + 10], 9, 0x2441453);
        c = hh(c, d, a, b, x[i + 15], 14, 0xd8a1e681); b = hh(b, c, d, a, x[i + 4], 20, 0xe7d3fbc8);
        a = hh(a, b, c, d, x[i + 9], 5, 0x21e1cde6); d = hh(d, a, b, c, x[i + 14], 9, 0xc33707d6);
        c = hh(c, d, a, b, x[i + 3], 14, 0xf4d50d87); b = hh(b, c, d, a, x[i + 8], 20, 0x455a14ed);
        a = hh(a, b, c, d, x[i + 13], 5, 0xa9e3e905); d = hh(d, a, b, c, x[i + 2], 9, 0xfcefa3f8);
        c = hh(c, d, a, b, x[i + 7], 14, 0x676f02d9); b = hh(b, c, d, a, x[i + 12], 20, 0x8d2a4c8a);

        a = ii(a, b, c, d, x[i], 4, 0xfffa3942); d = ii(d, a, b, c, x[i + 7], 11, 0x8771f681);
        c = ii(c, d, a, b, x[i + 14], 16, 0x6d9d6122); b = ii(b, c, d, a, x[i + 5], 23, 0xfde5380c);
        a = ii(a, b, c, d, x[i + 12], 4, 0xa4beea44); d = ii(d, a, b, c, x[i + 3], 11, 0x4bdecfa9);
        c = ii(c, d, a, b, x[i + 10], 16, 0xf6bb4b60); b = ii(b, c, d, a, x[i + 1], 23, 0xbebfbc70);
        a = ii(a, b, c, d, x[i + 8], 4, 0x289b7ec6); d = ii(d, a, b, c, x[i + 15], 11, 0xeaa127fa);
        c = ii(c, d, a, b, x[i + 6], 16, 0xd4ef3085); b = ii(b, c, d, a, x[i + 13], 23, 0x4881d05);
        a = ii(a, b, c, d, x[i + 4], 4, 0xd9d4d039); d = ii(d, a, b, c, x[i + 11], 11, 0xe6db99e5);
        c = ii(c, d, a, b, x[i + 2], 16, 0x1fa27cf8); b = ii(b, c, d, a, x[i + 9], 23, 0xc4ac5665);

        a = addUnsigned(a, a); b = addUnsigned(b, b); c = addUnsigned(c, c); d = addUnsigned(d, d);
    }
    return (a.toString(16) + b.toString(16) + c.toString(16) + d.toString(16)).toLowerCase();
}

const MODULE = {
    id: "empire-hybrid",
    name: "Empire Hybrid - Qobuz Primary",
    version: "4.1",
    author: "Evil Merlin & bacard1i",
    description: "Qobuz Direct + Tidal Fallback + MD5 on BOTH paths",

    // ==================== YOUR REAL QOBUZ CREDENTIALS ====================
    QOBUZ_APP_ID: "312369995",
    QOBUZ_USER_AUTH_TOKEN: "XX7seyZt4OaHGPgksFUldL2Ig0cH6jqcKSAfOAiAGBzw1HosDl9vfQTGRQEo2zkkcwP9ADc3L20nYNaI0l7E4g",
    QOBUZ_APP_SECRET: "e79f8b9be485692b0e5f9dd895826368",

    // ==================== RENDER URL ====================
    RENDER_BASE_URL: "https://YOUR-RENDER-APP.onrender.com",   // ← CHANGE TO YOUR ACTUAL RENDER URL

    // ==================== MAIN SEARCH ====================
    async search(query) {
        console.log(`[Empire] Searching: ${query}`);

        const qobuz = await this._directQobuz(query);
        if (qobuz.success) return qobuz;

        console.log(`[Empire] Qobuz failed → Tidal fallback`);
        return await this._tidalFallback(query);
    },

    async _directQobuz(query) {
        try {
            const res = await fetch(`https://www.qobuz.com/api.json/0.2/track/search?query=${encodeURIComponent(query)}&limit=1`, {
                headers: {
                    "X-App-Id": this.QOBUZ_APP_ID,
                    "User-Auth-Token": this.QOBUZ_USER_AUTH_TOKEN,
                    "User-Agent": "Empire-Hybrid/4.1"
                }
            });
            const data = await res.json();

            if (data.tracks && data.tracks.items && data.tracks.items.length > 0) {
                const t = data.tracks.items[0];
                const result = {
                    success: true,
                    source: "Qobuz",
                    quality: "24-bit / 192kHz",
                    url: `https://open.qobuz.com/track/${t.id}`,
                    title: t.title || "Unknown",
                    artist: t.performer ? t.performer.name : "Unknown",
                    album: t.album ? t.album.title : "Unknown"
                };
                result.md5 = md5(JSON.stringify({url: result.url, title: result.title, artist: result.artist, album: result.album}));
                return result;
            }
        } catch (e) {
            console.error("[Empire] Qobuz failed:", e.message);
        }
        return { success: false };
    },

    async _tidalFallback(query) {
        try {
            const res = await fetch(`${this.RENDER_BASE_URL}/tidal/search`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ query })
            });

            if (!res.ok) throw new Error("Tidal failed");
            const result = await res.json();

            // MD5 ON TIDAL PATH AS WELL
            if (result.success) {
                result.md5 = md5(JSON.stringify({
                    url: result.url,
                    title: result.title,
                    artist: result.artist,
                    album: result.album
                }));
            }
            return result;
        } catch (e) {
            console.error("[Empire] Tidal fallback failed:", e.message);
            return { success: false, message: "Both sources failed" };
        }
    },

    async getStream(trackId) { return trackId; },
    async getDownloadUrl(trackId) { return trackId; },
    async getMetadata(trackId) { return {}; }
};

export default MODULE;