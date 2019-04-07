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
    // default is MR Nobody
    var movieName = "The Lion King";
    var queryURL = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

    axios.get(queryURL).then(
        function (response) {
            //console.log(response.data);
            let movie = {
                title: response.data.Title,
                year: response.data.Year,
                imdbRating: response.data.imdbRating,
                rtRating: response.data.Ratings[1].Value,
                country: response.data.Country,
                language: response.data.Language,
                plot: response.data.Plot,
                actors: response.data.Actors
            }

            console.log (movie.title);
            console.log (movie.year);
            console.log (movie.imdbRating);
            console.log (movie.rtRating);
            console.log (movie.country);
            console.log (movie.language);
            console.log (movie.plot);
            console.log (movie.actors);

        });
}

function queryBIT(string) {
    var artistName = "Imagine Dragons";
    var queryURL = "https://rest.bandsintown.com/artists/" + artistName + "/events?app_id=codingbootcamp";

    axios.get(queryURL).then(
        function (response) {
            let name = response.data[0].venue.name;
            let location = response.data[0].venue.city; // .region .country
            console.log(response.data[0].datetime);
        });
}

//querySpotify();
queryOMDB();
//queryBIT();

var command = process.argv[2];
var instruction = process.argv[3];


// liri commands
// concert-this
// spotify-this-song
// movie-this
// do-what-it-says


// Improvements
// - format output text for spacing alignment
