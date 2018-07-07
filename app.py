'''The server stores the state of the canvas as a list of coordinates.
It updates the list on receiving messages from the clients, and in return sends
the updated state to all of the clients'''
from flask import Flask, render_template
from flask_socketio import SocketIO

app = Flask(__name__)
socketio = SocketIO(app)

@app.route("/")
def index():
    return render_template("index.html.jinja2")


'''A list of tuples containing canvas coordinates (x,y) for click events on the canvas.
These are drawn to the canvas of each of the clients.
The click events include mouse clicks and mouse movement with the button held down.'''
click_list = list()


@socketio.on("save click")
def save_click(x, y):
    '''On receiving a "save click" message from a client,
    Save the coordinates of the mouse click event, and update all clients.'''
    click_list.append((x,y))
    socketio.emit("update", click_list, broadcast=True)


@socketio.on("connect")
def connect():
    '''On connecting, update the client with the current state.'''
    socketio.emit("update", click_list)
