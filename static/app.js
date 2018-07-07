//A web socket connection to the server using socketio.
//I believe that socketio falls back to other technology if web sockets aren't available.
const socket = io.connect('http://' + document.domain + ':' + location.port);



/*
Fetches state from the server and draws it to the canvas.
And sends canvas click events to the server which in turn updates all the clients.
  */
function canvasController() {
    const canvas = document.getElementById("canvas");
    const context = canvas.getContext("2d");
    canvas.addEventListener("mousedown", mouseDown);
    canvas.addEventListener("mouseup", mouseUp);
    socket.on("update", update)

    


    function clearCanvas() {
        context.clearRect(0, 0, canvas.width, canvas.height);
    }

    /*
      The points of previous clicks on the canvas are drawn as squares to the canvas.
      */
    function drawSquares(points) {
        clearCanvas();
        points.forEach((point) =>
                       drawSquare(point[0], point[1]));
    }

    /*
      The points of previous clicks on the canvas are drawn as squares to the canvas.
    */
    function drawSquare(x, y) {
        context.fillStyle = "green";
        const dotSize = 10;
        context.fillRect(x - dotSize / 2, y - dotSize / 2, dotSize, dotSize);
    }

    /*
      This is called whenever a click event is fired on the canvas. 
      It sends the canvas coordinates of the click to the server.
      The server updates its state and sends the new state to all clients,
      who in turn call their update functions with the new state.
     */
    function clickEvent(event) {
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        socket.emit("save click", x, y);
    }

    /*
      On receiving an update notification from the server, draw the new state to the canvas.
    */
    function update(points) {
        clearCanvas();
        drawSquares(points);
    }

    /*
      When a mouse button is pressed draw to the shared canvas.
      Also, add an event handler so that drawing continues with movement of the mouse.
      */
    function mouseDown(event) {
        clickEvent(event);
        canvas.addEventListener("mousemove", clickEvent);
    }

    /*
      When a mouse button is released unregister the mousemove handler
      so that drawing to the communal canvas is stopped.
      */
    function mouseUp() {
        canvas.removeEventListener("mousemove", clickEvent);
    }
}

