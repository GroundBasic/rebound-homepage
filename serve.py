import os, http.server, socketserver

os.chdir(os.path.dirname(os.path.abspath(__file__)))
PORT = 4323


class Handler(http.server.SimpleHTTPRequestHandler):
    # 개발 중 브라우저 캐시로 옛 화면이 남는 문제 방지 — 항상 최신 파일 전송
    def end_headers(self):
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()


Handler.extensions_map.update({'.html': 'text/html'})


class ThreadingTCPServer(socketserver.ThreadingTCPServer):
    allow_reuse_address = True


with ThreadingTCPServer(("", PORT), Handler) as httpd:
    print(f"Serving at http://localhost:{PORT}")
    httpd.serve_forever()
