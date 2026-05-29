import os, http.server, socketserver

os.chdir(os.path.dirname(os.path.abspath(__file__)))
PORT = 4323
Handler = http.server.SimpleHTTPRequestHandler
Handler.extensions_map.update({'.html': 'text/html'})

class ThreadingTCPServer(socketserver.ThreadingTCPServer):
    allow_reuse_address = True

with ThreadingTCPServer(("", PORT), Handler) as httpd:
    print(f"Serving at http://localhost:{PORT}")
    httpd.serve_forever()
