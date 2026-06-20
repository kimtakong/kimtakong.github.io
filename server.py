import os
import json
import mimetypes
from urllib.parse import urlparse, parse_qs
from http.server import HTTPServer, BaseHTTPRequestHandler

PORT = 8000
ADMIN_PASSCODE = "7673"  # Default admin passcode to edit playlist
GUI_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "신청곡리스트")
DATA_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "data")

os.makedirs(DATA_DIR, exist_ok=True)

class MyRequestHandler(BaseHTTPRequestHandler):
    def end_headers(self):
        # Allow cross-origin requests for local testing if needed
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        super().end_headers()

    def do_OPTIONS(self):
        self.send_response(204)
        self.end_headers()

    def do_GET(self):
        parsed_path = urlparse(self.path)
        path = parsed_path.path

        # API Endpoints
        if path == "/api/songs":
            self.handle_get_songs()
        elif path == "/api/recommendations":
            self.handle_get_recommendations()
        elif path == "/api/playlist":
            self.handle_get_playlist()
        else:
            # Static file serving
            self.handle_static_file(parsed_path)

    def do_POST(self):
        parsed_path = urlparse(self.path)
        path = parsed_path.path

        if path == "/api/recommendations":
            self.handle_post_recommendations()
        elif path == "/api/recommendations/delete":
            self.handle_delete_recommendation()
        elif path == "/api/playlist":
            self.handle_post_playlist()
        else:
            self.send_error(404, "Not Found")

    def handle_get_songs(self):
        if not os.path.exists(GUI_DIR):
            self.send_json([])
            return

        songs = []
        try:
            for file in os.listdir(GUI_DIR):
                if file.lower().endswith(".pdf"):
                    # Strip the .pdf extension for the title display
                    title = os.path.splitext(file)[0]
                    songs.append({
                        "title": title,
                        "filename": file
                    })
            # Sort alphabetically by title
            songs.sort(key=lambda s: s["title"].lower())
            self.send_json(songs)
        except Exception as e:
            self.send_error(500, f"Error reading songs: {str(e)}")

    def handle_get_recommendations(self):
        filepath = os.path.join(DATA_DIR, "recommendations.json")
        data = []
        if os.path.exists(filepath):
            try:
                with open(filepath, "r", encoding="utf-8") as f:
                    data = json.load(f)
            except Exception:
                pass
        self.send_json(data)

    def handle_post_recommendations(self):
        content_length = int(self.headers.get('Content-Length', 0))
        post_data = self.rfile.read(content_length)
        
        try:
            req_data = json.loads(post_data.decode('utf-8'))
            title = req_data.get("title", "").strip()
            artist = req_data.get("artist", "").strip()
            reason = req_data.get("reason", "").strip()

            if not title or not artist:
                self.send_error(400, "Title and Artist are required.")
                return

            filepath = os.path.join(DATA_DIR, "recommendations.json")
            recommendations = []
            if os.path.exists(filepath):
                try:
                    with open(filepath, "r", encoding="utf-8") as f:
                        recommendations = json.load(f)
                except Exception:
                    pass

            recommendations.append({
                "title": title,
                "artist": artist,
                "reason": reason,
                "id": len(recommendations) + 1
            })

            with open(filepath, "w", encoding="utf-8") as f:
                json.dump(recommendations, f, ensure_ascii=False, indent=2)

            self.send_json({"success": True, "message": "Recommendation added successfully!"})
        except Exception as e:
            self.send_error(500, f"Server Error: {str(e)}")

    def handle_delete_recommendation(self):
        content_length = int(self.headers.get('Content-Length', 0))
        post_data = self.rfile.read(content_length)
        
        try:
            req_data = json.loads(post_data.decode('utf-8'))
            rec_id = req_data.get("id")
            passcode = req_data.get("passcode", "")

            if passcode != ADMIN_PASSCODE:
                self.send_response(401)
                self.send_header('Content-Type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps({"success": False, "message": "Invalid passcode"}).encode('utf-8'))
                return

            filepath = os.path.join(DATA_DIR, "recommendations.json")
            recommendations = []
            if os.path.exists(filepath):
                try:
                    with open(filepath, "r", encoding="utf-8") as f:
                        recommendations = json.load(f)
                except Exception:
                    pass

            new_recommendations = [r for r in recommendations if r.get("id") != rec_id]

            with open(filepath, "w", encoding="utf-8") as f:
                json.dump(new_recommendations, f, ensure_ascii=False, indent=2)

            self.send_json({"success": True, "message": "Recommendation deleted successfully!"})
        except Exception as e:
            self.send_error(500, f"Server Error: {str(e)}")

    def handle_get_playlist(self):
        filepath = os.path.join(os.path.dirname(os.path.abspath(__file__)), "playlist.json")
        data = []
        if os.path.exists(filepath):
            try:
                with open(filepath, "r", encoding="utf-8") as f:
                    data = json.load(f)
            except Exception:
                pass
        self.send_json(data)

    def handle_post_playlist(self):
        content_length = int(self.headers.get('Content-Length', 0))
        post_data = self.rfile.read(content_length)
        
        try:
            req_data = json.loads(post_data.decode('utf-8'))
            passcode = req_data.get("passcode", "")
            playlist = req_data.get("playlist", [])

            if passcode != ADMIN_PASSCODE:
                self.send_response(401)
                self.send_header('Content-Type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps({"success": False, "message": "Invalid passcode"}).encode('utf-8'))
                return

            filepath = os.path.join(os.path.dirname(os.path.abspath(__file__)), "playlist.json")
            with open(filepath, "w", encoding="utf-8") as f:
                json.dump(playlist, f, ensure_ascii=False, indent=2)

            self.send_json({"success": True, "message": "Playlist updated successfully!"})
        except Exception as e:
            self.send_error(500, f"Server Error: {str(e)}")

    def handle_static_file(self, parsed_path):
        path = parsed_path.path
        # Default route to index.html
        if path == "/":
            path = "/index.html"

        # Prevent directory traversal attacks
        base_dir = os.path.dirname(os.path.abspath(__file__))
        
        # Check if the requested file is a GUI PDF or a regular static asset
        if path.startswith("/gui/"):
            query_params = parse_qs(parsed_path.query)
            passcode = query_params.get("passcode", [""])[0]
            if passcode != ADMIN_PASSCODE:
                self.send_response(403)
                self.send_header('Content-Type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps({"success": False, "message": "Access Denied: Admin only"}).encode('utf-8'))
                return

            # Strip /gui/ prefix and locate file in gui directory
            file_relative = path[5:]
            filepath = os.path.join(GUI_DIR, file_relative)
        else:
            filepath = os.path.join(base_dir, path.lstrip("/"))

        # Verify the file is within allowed boundaries
        filepath = os.path.abspath(filepath)
        if not (filepath.startswith(base_dir) or filepath.startswith(GUI_DIR)):
            self.send_error(403, "Access Denied")
            return

        if not os.path.exists(filepath) or os.path.isdir(filepath):
            self.send_error(404, "File Not Found")
            return

        # Content-Type header
        mime_type, _ = mimetypes.guess_type(filepath)
        if mime_type is None:
            mime_type = "application/octet-stream"

        try:
            with open(filepath, "rb") as f:
                content = f.read()
            self.send_response(200)
            self.send_header("Content-Type", mime_type)
            self.send_header("Content-Length", str(len(content)))
            self.end_headers()
            self.wfile.write(content)
        except Exception as e:
            self.send_error(500, f"Internal Server Error: {str(e)}")

    def send_json(self, data):
        try:
            content = json.dumps(data, ensure_ascii=False).encode('utf-8')
            self.send_response(200)
            self.send_header("Content-Type", "application/json; charset=utf-8")
            self.send_header("Content-Length", str(len(content)))
            self.end_headers()
            self.wfile.write(content)
        except Exception as e:
            self.send_error(500, f"JSON Encoding Error: {str(e)}")

def run():
    print(f"Starting server on http://localhost:{PORT}")
    server_address = ('', PORT)
    httpd = HTTPServer(server_address, MyRequestHandler)
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nStopping server...")
        httpd.server_close()

if __name__ == '__main__':
    run()
