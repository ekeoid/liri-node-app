require("dotenv").config();

var keys = require("./keys.js");

var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);

var axios = require("axios");


function querySpotify(string) {
    var searchTrack;
    if (string === undefined) {
        // if no song, default to "The Sign" by Ace of Base.
        //searchTrack = "Ace of Base The Sign";
        searchTrack = "The Final Countdown";
    } else {
        searchTrack = parameter;
    }

    spotify
        .search({
            type: "track",
            query: searchTrack
        })
        .then( function (response) {
            // console.log(response);
            let artist =  response.tracks.items[0].artists[0].name;
            let song =    response.tracks.items[0].name;
            let preview = response.tracks.items[0].preview_url;
            let album =   response.tracks.items[0].album.name;

            console.log("\n---------------------------------------------------\n");
            console.log("Artist: " + artist);
            console.log("Song: " + song);
            console.log("Preview: " + preview);
            console.log("Album: " + album);
            console.log("\n---------------------------------------------------\n");
        }) 
        .catch( function (error) {
            console.log("Error occurred: " + error);
        });

}


querySpotify();

var command = process.argv[2];
var instruction = process.argv[3];


// liri commands
// concert-this
// spotify-this-song
// movie-this
// do-what-it-says

