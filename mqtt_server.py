from flask import Flask, send_file
from flask_socketio import SocketIO
import io
from PIL import Image
import socket
import threading

# UDP server info 
udp_host = "192.168.4.1"  # AP address
udp_port = 1111           # UDP port 
 
# Image stored in memory
latest_image = None

# Initialize Flask app and SocketIO
app = Flask(__name__)
socketio = SocketIO(app)

# UDP server function
def udp_server():
    global latest_image
    # Tạo socket UDP
    sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    sock.bind((udp_host, udp_port))
    print(f"UDP server listening on {udp_host}:{udp_port}")

    while True:
        # receive data from client (maximum 64 bytes data)
        data, addr = sock.recvfrom(65535)  
        print(f"Received {len(data)} bytes from {addr}")

        # send data to client WebSocket
        socketio.emit('new_image', {'image': data.decode('latin1')})
        print("Emitted new image to clients.")

# Flask web server route
@app.route('/')
def index():
    return send_file('index.html')

# Function to start the Flask web server
def start_flask_server():
    socketio.run(app, host=udp_host, port=8000, debug=False)

# Start Flask server in a separate thread
flask_thread = threading.Thread(target=start_flask_server)
flask_thread.start()

# Start UDP server in a separate thread
udp_thread = threading.Thread(target=udp_server)
udp_thread.start()

# Wait for images
try:
    while True:
        pass
except KeyboardInterrupt:
    print("Shutting down...")