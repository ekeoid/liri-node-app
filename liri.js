require("dotenv").config();

var keys = require(".keys.js");

var spotify = new spotify(keys.spotify);

var command = process.argv[2];
var instruction = process.argv[3];


// liri commands
// concert-this
// spotify-this-song
// movie-this
// do-what-it-says

