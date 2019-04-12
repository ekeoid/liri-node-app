require("dotenv").config();

var keys = require("./keys.js");

var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);

var axios = require("axios");

var moment = require("moment");

var fs = require("fs");

var action = process.argv[2];
var value = process.argv.slice(3).join("+");

// console.log(action);
// console.log(value);

goLIRI (action, value);


function goLIRI (action, value) {
    switch (action) {
        case "concert-this":
            queryBIT(value);
            break;
        
        case "spotify-this-song":
            querySpotify(value);
            break;
        
        case "movie-this":
            queryOMDB(value);
            break;
        
        case "do-what-it-says":
            readFile("random.txt");
            break;
    }
}

function readFile(filename) {
    fs.readFile(filename, "utf8", function (err, data) {
        if (err) {
            return console.log(err);
        }

        data = data.split(",");
      
        goLIRI(data[0], data[1]);
    });
}

function writeFile(filename, output) {
    fs.appendFile(filename, output, function(err) {
        if (err) {
          return console.log(err);
        }

        console.log(output);
      });    
}

function querySpotify(string) {
    var trackName;
    if (string === undefined || string === "") {
        // if no song, default to "The Sign" by Ace of Base.
        trackName = "Ace of Base The Sign";        
    } else {
        trackName = string;
    }

    spotify
        .search({
            type: "track",
            query: trackName
        })
        .then(function (response) {
            // console.log(response);
            
            //let results = response.tracks.items.length;
            let results = 1;
            let output = "";
            //console.log(response.tracks.items[0]);
            if (response.tracks.items.length > 0) {
                for (let i = 0; i < results; i++) {

                    let track = {
                        artist: response.tracks.items[i].artists[0].name,
                        song: response.tracks.items[i].name,
                        preview: response.tracks.items[i].preview_url,
                        album: response.tracks.items[i].album.name
                    }
    
                    output += printFormat("Artist", track.artist) + "\n";
                    output += printFormat("Song ", track.song) + "\n";
                    output += printFormat("Preview ", track.preview == null ? "" : track.preview) + "\n";
                    output += printFormat("Album ", track.album) + "\n";
                    output += "-".repeat(70) + "\n";
                }
                
                let prepend = "-----  " + action + "  " + "-".repeat(70 - action.length - 9) + "\n";
                writeFile("log.txt", prepend.concat("", output));
            } else {
                console.log ("No Results");
            }
            
            
        })
        .catch(function (error) {
            console.log("Error occurred: " + error);
        });

}

function queryOMDB(string) {
    var movieName;
    if (string === undefined || string === "") {
        // if no movie, default to "Mr. Nobody"
        movieName = "Mr.+Nobody";        
    } else {
        movieName = string;
    }

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

            let output = "";

            output += printFormat("Movie Name", movie.title) + "\n";
            output += printFormat("Release Year", movie.year) + "\n";
            output += printFormat("IMDB Rating", movie.imdbRating) + "\n";
            output += printFormat("Rotten Tomatoes Rating", movie.rtRating) + "\n";
            output += printFormat("Country", movie.country) + "\n";
            output += printFormat("Language(s)", movie.language) + "\n";
            output += printFormat("Plot", movie.plot) + "\n";
            output += printFormat("Actors", movie.actors) + "\n";
            output += "-".repeat(70) + "\n";

            let prepend = "-----  " + action + "  " + "-".repeat(70 - action.length - 9) + "\n";
            writeFile("log.txt", prepend.concat("", output));

        });
}

function queryBIT(string) {
    var artistName;
    if (string === undefined || string === "") {
        artistName = "Imagine+Dragons";       
    } else {
        artistName = string;
    }
    
    var queryURL = "https://rest.bandsintown.com/artists/" + artistName + "/events?app_id=codingbootcamp";

    axios.get(queryURL).then(
        function (response) {

            //let results = response.data.length;
            let results = 1;
            let output = "";

            for (let i = 0; i < results; i++) {

                let venue = {
                    name: response.data[i].venue.name,
                    location: response.data[i].venue.city + ", " +
                        response.data[i].venue.region + ", " +
                        response.data[i].venue.country,
                    //date: response.data[0].datetime
                    date: moment(response.data[i].datetime, "YYYY-MM-DD HH:mm:ss").format("MM/DD/YYYY")
                }

                output += printFormat("Venue Name", venue.name) + "\n";
                output += printFormat("Location", venue.location) + "\n";
                output += printFormat("Date of Event", venue.date) + "\n";
                output += "-".repeat(70) + "\n";
            }
            let prepend = "-----  " + action + "  " + "-".repeat(70 - action.length - 9) + "\n";
            writeFile("log.txt", prepend.concat("", output));
        });
}

function printFormat(message, data) {
    let format = {
        columnWidth: 20,
        breakPoint: 40
    };

    let string = "";
    
    string += " ".repeat(2);
    string += message + " ".repeat(format.columnWidth - 2 - message.length);

    if (data.length > format.breakPoint) {
        let words = data.split(" ");
        let count = 0;
        
        if (words[0].length > format.breakPoint) {
            string += data;
        }

        for (let i=1; i < words.length; i++ ) {
            string += words[i-1] + " ";
            count += words[i-1].length;
            count++;

            if (count + words[i].length > format.breakPoint) {
                string += "\n";
                count = 0;
                string += " ".repeat(format.columnWidth);
            }
            
            if (i == words.length-1) {
                if (count + words[i].length > format.breakPoint) {
                    string += "\n";
                    string += " ".repeat(format.columnWidth);
                }
                string += words[i];
            }
        }

    } else {
        string += data;
    }
    
    //console.log (string);
    return string;
}
