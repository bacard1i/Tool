# main.py - Tidal Backend for Empire Audio System (Render) - FIXED BY EVIL MERLIN
from flask import Flask, request, jsonify
import os
import requests
from functools import wraps

app = Flask(__name__)

# Environment Variables (set these in Render Dashboard → Environment)
TIDAL_TOKEN = os.environ.get('TIDAL_TOKEN')
API_KEY = os.environ.get('API_KEY')  # Optional extra security

def require_auth(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get('X-Auth-Token')
        if token != TIDAL_TOKEN:
            return jsonify({"success": False, "message": "Unauthorized"}), 401
        return f(*args, **kwargs)
    return decorated

@app.route('/health', methods=['GET'])
def health():
    return jsonify({
        "status": "alive",
        "version": "4.1-hybrid",
        "service": "Tidal Backend"
    })

@app.route('/tidal/search', methods=['POST'])
@require_auth
def tidal_search():
    data = request.get_json()
    query = data.get('query')
    
    if not query:
        return jsonify({"success": False, "message": "No query provided"}), 400

    try:
        headers = {
            "Authorization": f"Bearer {TIDAL_TOKEN}",
            "Content-Type": "application/json"
        }
        
        response = requests.get(
            "https://api.tidal.com/v1/search/tracks",
            params={"query": query, "limit": 1},
            headers=headers,
            timeout=10
        )
        
        if response.status_code == 200:
            tracks = response.json().get('tracks', [])
            if tracks:
                track = tracks[0]
                return jsonify({
                    "success": True,
                    "source": "Tidal",
                    "quality": "24-bit / 96kHz",
                    "url": f"https://listen.tidal.com/track/{track.get('id')}",
                    "title": track.get('title'),
                    "artist": track.get('artists', [{}])[0].get('name', 'Unknown'),
                    "album": track.get('album', {}).get('title', 'Unknown')
                })
        
        # FIXED: Proper closing of the failure case - no more syntax error
        return jsonify({
            "success": False,
            "message": "Track not found"
        })
        
    except Exception as e:
        return jsonify({
            "success": False,
            "message": f"Error: {str(e)}"
        }), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=int(os.environ.get('PORT', 8080)))