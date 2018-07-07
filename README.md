# Shared Canvas using WebsocketIO and Flask
This is a quick experiment to create a canvas which can be drawn on simultaneously by different users. 
It is intended to be a kick off point for other interactive projects using websockets. 

The project uses [http://flask.pocoo.org/](Python Flask) as a web framework, [https://flask-socketio.readthedocs.io/en/latest/](Flask-SocketIO) to handle websockets on the server, and a [https://socket.io/get-started/chat/]( SocketIO ) client.

## How to run
With Python Flask and Flask SocketIO on your system you can run the project on localhost:5000 using the .runflask.sh script, which is in the root directory.
To run on your local network uncomment the ip address in the script. 
