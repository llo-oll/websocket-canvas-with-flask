const socket = io.connect('http://' + document.domain + ':' + location.port);



function canvasController() {
    const canvas = document.getElementById("canvas");
    const context = canvas.getContext("2d");
    canvas.addEventListener("mousedown", mouseDown);
    canvas.addEventListener("mouseup", mouseUp);

    socket.on("update", (points) => {
        clearCanvas();
        drawSquares(points);
    });


    function clearCanvas() {
        context.clearRect(0, 0, canvas.width, canvas.height);
    }

    function drawSquares(points) {
        clearCanvas();
        points.forEach((point) =>
                       drawSquare(point[0], point[1])); 
    }

    function drawSquare(x, y) {
        context.fillStyle = "green";
        const dotSize = 10;
        context.fillRect(x - dotSize / 2, y - dotSize / 2, dotSize, dotSize);
    }

    function clickEvent(event) {
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        socket.emit("save click", x, y);
    }

    function mouseDown(event) {
        clickEvent(event);
        canvas.addEventListener("mousemove", clickEvent);
    }

    function mouseUp() {
        canvas.removeEventListener("mousemove", clickEvent); 
    }
}

