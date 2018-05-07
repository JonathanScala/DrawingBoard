var app = require('http').createServer(handler)
var io = require('socket.io')(app);
var fs = require('fs');
var Users = require("./userManagement.js");
var users = new Users();

// Listen on port 3000
// Keep an array of all the previous lines drawn
app.listen(3000);
var line_history = [];

// Socket.io handler function for http create server 
function handler(req, res) {
    // Read Page.html file
    fs.readFile(__dirname + '/index.html',
        function (err, data) {
            if (err) {
                res.writeHead(500);
                return res.end('Error loading Page.html');
            }
            // Write the page if no errors
            res.writeHead(200);
            res.end(data);
        });
}

// When connected to the socket
io.on('connection', function (socket) {
    // (socket) -> None
    // Emit all the previous lines drawn to keep ...
    // ... all users up to date
    for (var i in line_history) {
        socket.emit('draw_line', { line: line_history[i] });
    }

    // Log when a client has left (counts changing name)
    socket.on('disconnect', function () {
        // () -> None
        console.log("A User has left");
    });

    socket.on('name', function (data) {
        // (String) -> None
        // Get the user entered in the popup
        // Log the name of the user connected
        var name = data.name;
        console.log(name + " has connected");
        // Use our module keeping track of user ...
        // ... to add the next user
        users.addUser(name);
        // Emit the array of users
        io.emit('name', { names: users.allUsers() });
    });

    socket.on('draw_line', function (data) {
        // ({line: {int, int}, color: String}) -> None
        // Log the x,y coordinates of lines drawn as well as color
        console.log(data);
        // Add the lines to the previous line array
        line_history.push(data.line);
        // Emit the coordinates
        io.emit('draw_line', { line: data.line, color: data.color });
    });
});
