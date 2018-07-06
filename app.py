from flask import Flask, render_template
from flask_socketio import SocketIO

app = Flask(__name__)
socketio = SocketIO(app)

@app.route("/")
def root():
    return render_template("root.html.jinja2")


@socketio.on('message')
def handle_message(message):
    print('received a message: ' + message)

click_list = list()

@socketio.on("save click")
def save_click(x, y):
    click_list.append((x,y))
    socketio.emit("update", click_list, broadcast=True)



@socketio.on("connect")
def connect():
    socketio.emit("update", click_list)
