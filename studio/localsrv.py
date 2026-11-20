"""Local HTTP server for serving a mirror directory with correct MIME types.

Used by runtime verification (and available for manual preview). Games must be
served over http:// — file:// breaks fetch/XHR/WebAssembly on modern browsers.
"""
import functools
import http.server
import mimetypes
import os
import socket
import threading

# Register engine-relevant MIME types before handlers are created
for ext, mime in [
    (".wasm", "application/wasm"),
    (".unityweb", "application/octet-stream"),
    (".data", "application/octet-stream"),
    (".pck", "application/octet-stream"),
    (".pak", "application/octet-stream"),
    (".arcd", "application/octet-stream"),
    (".br", "application/octet-stream"),
    (".glb", "model/gltf-binary"),
    (".gltf", "model/gltf+json"),
    (".mjs", "text/javascript"),
    (".js", "text/javascript"),
    (".json", "application/json"),
    (".webmanifest", "application/manifest+json"),
    (".woff", "font/woff"),
    (".woff2", "font/woff2"),
]:
    mimetypes.add_type(mime, ext)


class QuietHandler(http.server.SimpleHTTPRequestHandler):
    def log_message(self, *args):  # silence request log
        pass


def _free_port():
    s = socket.socket()
    s.bind(("127.0.0.1", 0))
    port = s.getsockname()[1]
    s.close()
    return port


def serve(directory):
    """Serve `directory` on a random local port. Returns base URL. Daemon thread."""
    directory = os.path.abspath(str(directory))
    port = _free_port()
    handler = functools.partial(QuietHandler, directory=directory)
    httpd = http.server.ThreadingHTTPServer(("127.0.0.1", port), handler)
    t = threading.Thread(target=httpd.serve_forever, daemon=True)
    t.start()
    return f"http://127.0.0.1:{port}", httpd
