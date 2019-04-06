require("dotenv").config();

var keys = require("./keys.js");

var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);

var axios = require("axios");


function querySpotify(string) {
    var trackName;
    if (string === undefined) {
        // if no song, default to "The Sign" by Ace of Base.
        //trackName = "Ace of Base The Sign";
        trackName = "The Final Countdown";
    } else {
        trackName = parameter;
    }

    spotify
        .search({
            type: "track",
            query: trackName
        })
        .then(function (response) {
            // console.log(response);
            let artist = response.tracks.items[0].artists[0].name;
            let song = response.tracks.items[0].name;
            let preview = response.tracks.items[0].preview_url;
            let album = response.tracks.items[0].album.name;

            console.log("\n---------------------------------------------------\n");
            console.log("Artist: " + artist);
            console.log("Song: " + song);
            console.log("Preview: " + preview);
            console.log("Album: " + album);
            console.log("\n---------------------------------------------------\n");
        })
        .catch(function (error) {
            console.log("Error occurred: " + error);
        });

}

function queryOMDB(string) {
    var movieName = "The Lion King";

    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

    axios.get(queryUrl).then(
        function (response) {
            let title = response.data.Title;
            let year = response.data.Year;
            let imdbRating = response.data.imdbRating;
            let rtRating = response.data.Ratings[1].Value;
            let country = response.data.Country;
            let language = response.data.Language;
            let plot = response.data.Plot;
            let actors = response.data.Actors;

            //console.log(response.data);
            console.log (title);
            console.log (year);
            console.log (imdbRating);
            console.log (rtRating);
            console.log (country);
            console.log (language);
            console.log (plot);
            console.log (actors);

        });
}

//querySpotify();
queryOMDB();

var command = process.argv[2];
var instruction = process.argv[3];


// liri commands
// concert-this
// spotify-this-song
// movie-this
// do-what-it-says


// Improvements
// - format output text for spacing alignment
