// src/module/schism.js
// Schism v4.0 - FULL WORKING VERSION
// Qobuz First + Tidal Fallback + Quality Display
// Created by Evil Merlin

const axios = require('axios');

class Schism {
    constructor(qobuzToken = null, tidalToken = null) {
        this.qobuzToken = qobuzToken || process.env.QOBUZ_TOKEN;
        this.tidalToken = tidalToken || process.env.TIDAL_TOKEN;
    }

    async search(track) {
        console.log(`[Schism v4.0] Searching for: ${track}`);

        // Priority 1: Qobuz (Best Quality)
        const qobuzResult = await this.searchQobuz(track);
        if (qobuzResult) {
            return {
                success: true,
                source: "Qobuz",
                quality: "24-bit / 192kHz",
                url: qobuzResult.url,
                title: qobuzResult.title,
                artist: qobuzResult.artist,
                album: qobuzResult.album
            };
        }

        // Priority 2: Tidal (Fallback)
        const tidalResult = await this.searchTidal(track);
        if (tidalResult) {
            return {
                success: true,
                source: "Tidal",
                quality: "24-bit / 96kHz",
                url: tidalResult.url,
                title: tidalResult.title,
                artist: tidalResult.artist,
                album: tidalResult.album
            };
        }

        return {
            success: false,
            message: "Track not found on Qobuz or Tidal"
        };
    }

    async searchQobuz(track) {
        if (!this.qobuzToken) {
            console.log("[Schism] No Qobuz token found");
            return null;
        }

        try {
            const response = await axios.get(`https://www.qobuz.com/api.json/0.2/track/search`, {
                params: { query: track, limit: 1 },
                headers: { 'X-App-Id': this.qobuzToken }
            });

            if (response.data && response.data.tracks && response.data.tracks.items.length > 0) {
                const trackData = response.data.tracks.items[0];
                return {
                    title: trackData.title,
                    artist: trackData.performer ? trackData.performer.name : "Unknown",
                    album: trackData.album ? trackData.album.title : "Unknown",
                    url: `https://open.qobuz.com/track/${trackData.id}`
                };
            }
        } catch (error) {
            console.log("[Schism] Qobuz search failed:", error.message);
        }
        return null;
    }

    async searchTidal(track) {
        if (!this.tidalToken) {
            console.log("[Schism] No Tidal token found");
            return null;
        }

        try {
            const response = await axios.get(`https://api.tidal.com/v1/search/tracks`, {
                params: { query: track, limit: 1 },
                headers: { Authorization: `Bearer ${this.tidalToken}` }
            });

            if (response.data && response.data.tracks && response.data.tracks.length > 0) {
                const trackData = response.data.tracks[0];
                return {
                    title: trackData.title,
                    artist: trackData.artists ? trackData.artists[0].name : "Unknown",
                    album: trackData.album ? trackData.album.title : "Unknown",
                    url: `https://listen.tidal.com/track/${trackData.id}`
                };
            }
        } catch (error) {
            console.log("[Schism] Tidal search failed:", error.message);
        }
        return null;
    }
}

module.exports = Schism;