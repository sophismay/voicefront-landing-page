// BASE SETUP
//

var express = require('express');
var http = require('http').Server(app);
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');
var path = require('path');
var io = require('socket.io')(http);

// configure app to use bodyParser() for Post requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = 3233; // set our port

// ROUTES FOR API
var router = express.Router();

//Route to check if tweak server is running
router.get('/', function(req, res) {
    console.log('Connected with client...');
    res.json({ message: 'Tweak running.' });
});

//Save page
router.post('/save', function(req, res) {
    var html = req.body.page.html;
    var css = req.body.page.css;
    var cssFileName = req.body.page.cssFileName;
    //Save the index.html
    fs.writeFile(path.resolve("public/index.html"), html, function(err) {
        if (err) {
            return res.status(500).json(err); //error occured
        }
        //Check if tweak css file already exists.
        fs.readdir(path.resolve("public/css/"), (err, files) => {
            files.forEach(file => {
                if (file.indexOf('tweak_') != -1) { //If found remove it
                    fs.unlink(path.resolve('public/css/' + file), function() {})
                }
            });
            //Save the css file
            fs.writeFile(path.resolve('public/css/' + cssFileName), css, function(err) {
                if (err) {
                    return res.status(500).json(err); //error occured
                }

            });
            res.status(200).send('Page saved!');
        });
    });
});

//Register the routes
app.use('/tweak', router);


//Start the io server
http.listen(3234, function() {
    console.log('listening on *:3234');
});


//On Tweak editing start
io.on('connection', function(socket) {
    //START LISTENING FOR CHANGES ON THE CSS FILES
    fs.readdir(path.resolve("public/css/"), (err, files) => {
        files.forEach(file => {
            if (file.indexOf('css') != -1) {
                fs.watchFile(path.resolve("public/css/" + file), (curr, prev) => {
                    socket.send(file);
                });
            }
        });
    });
    //Whenever someone disconnects this piece of code executed
    socket.on('disconnect', function() {
        console.log('Tweak server disconnected...');
    });
});



// START THE SERVER
app.listen(port);
console.log('Tweak server running on port ' + port);