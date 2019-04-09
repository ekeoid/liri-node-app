require("dotenv").config();

var keys = require("./keys.js");

var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);

var axios = require("axios");

var moment = require("moment");


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
            let track = {
                artist: response.tracks.items[0].artists[0].name,
                song: response.tracks.items[0].name,
                preview: response.tracks.items[0].preview_url,
                album: response.tracks.items[0].album.name
            }

            console.log("-".repeat(70));
            printFormat("Artist", track.artist);
            printFormat("Song ", track.song);
            printFormat("Preview ", track.preview);
            printFormat("Album ", track.album);
            console.log("-".repeat(70));
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

            console.log("-".repeat(70));
            printFormat("Movie Name", movie.title);
            printFormat("Release Year", movie.year);
            printFormat("IMDB Rating", movie.imdbRating);
            printFormat("Rotten Tomatoes Rating", movie.rtRating);
            printFormat("Country", movie.country);
            printFormat("Language(s)", movie.language);
            printFormat("Plot", movie.plot);
            printFormat("Actors", movie.actors);
            console.log("-".repeat(70));

        });
}

function queryBIT(string) {
    var artistName = "Imagine Dragons";
    var queryURL = "https://rest.bandsintown.com/artists/" + artistName + "/events?app_id=codingbootcamp";

    axios.get(queryURL).then(
        function (response) {
            let venue = {
                name: response.data[0].venue.name,
                location: response.data[0].venue.city + ", " + 
                          response.data[0].venue.region + ", " +
                          response.data[0].venue.country,
                //date: response.data[0].datetime
                date: moment(response.data[0].datetime, "YYYY-MM-DD HH:mm:ss").format("MM/DD/YYYY")
            }
              
            console.log("-".repeat(70));
            printFormat("Venue Name", venue.name);
            printFormat("Location", venue.location);
            printFormat("Date of Event", venue.date);
            console.log("-".repeat(70));            
        });
}

function printFormat(message, data) {
    var string = "";
    
    string += " ".repeat(2);
    string += message + " ".repeat(27 - message.length);

    if (data.length > 40) {
        var words = data.split(" ");
        var count = 0;
        
        if (words[0].length > 40) {
            string += data;
        }

        for (var i=1; i < words.length; i++ ) {
            string += words[i-1] + " ";
            count += words[i-1].length;
            count++;

            if (count + words[i].length > 40) {
                string += "\n";
                count = 0;
                string += " ".repeat(29);
            }
            
            if (i == words.length-1) {
                if (count + words[i].length > 40) {
                    string += "\n";
                    string += " ".repeat(29);
                }
                string += words[i];
            }
        }

    } else {
        string += data;
    }
    
    console.log (string);
}


querySpotify();
queryOMDB();
queryBIT();


var command = process.argv[2];
var instruction = process.argv[3];


// liri commands
// concert-this
// spotify-this-song
// movie-this
// do-what-it-says


// Improvements
// - format output text for spacing alignment
