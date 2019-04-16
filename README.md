# liri-node-app

### Overview 

With this assignment, a command line interface node app called LIRI is a *Language Interpretation and Recognition Interface.* This app will will take parameters from the command line and give you back a search result. Although it can provide a list of search results, it is currently limited to one result return. 

### Technologies Used
- [Node.JS](https://nodejs.org/en/docs/)
- [fs](https://nodejs.org/api/fs.html)
- [OMDb API](http://www.omdbapi.com/)
- [node-spotify-api](https://www.npmjs.com/package/node-spotify-api)
- [Bandsintown API](https://manager.bandsintown.com/support/bandsintown-api)
- [moment](https://www.npmjs.com/package/moment)
- [axios](https://www.npmjs.com/package/axios)
- [dotenv](https://www.npmjs.com/package/dotenv)


### Usage

A help flag can let you identify which commands are available for the liri.js app. Use `-h` flag to preview the available options.

A write flag is also available which will allow the console output to be appended to the `log.txt` file. Use `-w` flag to enable writing to the file.

![liri help](/readme/help.png "help")


### Exceptions

When incorrect commands are listed, the app will notify you of the unavailable command. 

![liri no command](/readme/no-command.png)

Also when the search results return no query, the app will notify you. 

![liri no result](/readme/no-result.png)


### `spotify-this-song`

`node liri.js spotify-this-song`

![liri spotify1](/readme/spotify-this-song-novalue.png)


![liri spotify2](/readme/spotify-this-song.png)


![liri spotify3](/readme/spotify-this-song-log.png)


### `concert-this`

`node liri.js concert-this`

![liri concert1](/readme/concert-this-novalue.png)

![liri concert2](/readme/concert-this.png)

![liri concert3](/readme/concert-this-log.png)


### `movie-this`

`node liri.js movie-this`

![liri movie1](/readme/movie-this-novalue.png)

![liri movie2](/readme/movie-this.png)

![liri movie3](/readme/movie-this-log.png)



