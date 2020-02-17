require("dotenv").config();
var keys = require("./keys.js");
var axios = require("axios");
var moment = require("moment");
var Spotify = require("node-spotify-api");
var spotify  = new Spotify(keys.spotify);
var fs = require("fs");

//gather input 
var nodeArgs = process.argv;
var action = process.argv[2]; //ex: concert-this or movie-this goes in this index
var search = "";

for (var i = 3; i < nodeArgs.length; i++) {
    if(i > 3 && i < nodeArgs.length){
        search = search + " " + nodeArgs[i]; 
    }
    else {
    search += nodeArgs[i];
    }
}
// }

//to get user's input and know which category to start which funct
if(action === "concert-this") {
    concertSearch();
}
else if(action === "spotify-this-song"){
    spotifySearch();
}
else if(action === "movie-this") {
    movieSearch();
}
else if(action ==="do-what-it-says"){
    heyLiri();
}
else {
    console.log("Please try again. Don't forget to include category first. Ex: movie-this <input name of movie>")
}


//concert-this <artist/band name here>
function concertSearch(){
    var queryUrl= "https://rest.bandsintown.com/artists/" + search + "/events?app_id=codingbootcamp";
    axios
    .get(queryUrl).then(function(response) {
    for(var j = 0; j < 5; j++) {

        var concertInfo = {
            venue: response.data[j].venue.name,
            city: response.data[j].venue.city,
            country: response.data[j].venue.country
        }
        var dateResponse = response.data[1].datetime;
        var dateOnly= dateResponse.slice(0,10);
        var convertDate= moment(dateOnly).format("MM/DD/YYYY");

        console.log("---------------Concert Information---------------");
        console.log("Name of Venue: " + concertInfo.venue
        + "\nName of city and county: " + concertInfo.city +", "+  concertInfo.country
        + "\nDate of event: " + convertDate);
        
    }
    })
    .catch(function(error) {
        if(error.response) {
        console.log(error.response.data);
        } 
        else if(error.request) {
        console.log(error.request);
        }
        else {
        console.log("Error", error.message);
        }
})};

//spotify-this-song '<song name here>'`
function spotifySearch() {
    spotify
    .search({type:'track', query: search, limit: 5}, function(error, data){

        for (var k = 0; k < data.tracks.items.length; k++) {
            var songInfo = {
                artistName: data.tracks.items[k].album.artists[0].name,
                albumName: data.tracks.items[k].album.name,
                songName: data.tracks.items[k].name,
                previewLink: data.tracks.items[k].preview_url
            }
    
        if (error) {
            return console.log('Error occurred: ' + error);
        }
        
        if(search = "") {
            search = "The Sign";
            
            console.log("\nSong: " + songInfo.songName + "." + "\nBy: " + 
            songInfo.artistName + "." + "\nFrom album titled: " + songInfo.albumName);;
            console.log("Listen preview here: " + songInfo.previewLink);
        
    }
        else{
            console.log("\nSong: " + songInfo.songName + "." + "\nBy: " + 
            songInfo.artistName + "." + "\nFrom album titled: " + songInfo.albumName);
            if (songInfo.previewLink === null) {
                console.log("Listen preview here: ***Sorry no link at this time.***")
            }
            else{
                console.log("Listen preview here: " + songInfo.previewLink);
            }
            
        }
    }

})};

function movieSearch() {
    
    var ombdQueryURL= "http://www.omdbapi.com/?t=" + search + "&apikey=trilogy";

    axios
    .get(ombdQueryURL).then(function(response) {
        // console.log(response.data);
        var movieInfo = {
            title: response.data.Title,
            year: response.data.Year,
            countryProd: response.data.Country,
            language: response.data.Language,
            plot: response.data.Plot,
            actors: response.data.Actors
        }

        var ratings = {
           ombd: response.data.Ratings[0].Source,
           ombdVal: response.data.Ratings[0].Value,
           rottonT: response.data.Ratings[1].Source,
           rottonTVal: response.data.Ratings[1].Value
        } 

        if(search = null) {
            search = "Mr. Nobody";

            console.log("\nMovie Name: " + movieInfo.title
            + "\nYear Made: " + movieInfo.year
            + "\nOMBD Ratings: " + ratings.ombd + " = " + ratings.ombdVal
            + "\nRotten Tomatoes Ratings: " + ratings.rottonT + " = " + ratings.rottonTVal
            + "\nProduced in: " + movieInfo.countryProd
            + "\nLanguage of movie: " + movieInfo.language 
            + "\nPlot: " + movieInfo.plot
            + "\nActors: " + movieInfo.actors);
        }
        else {
        console.log("\nMovie Name: " + movieInfo.title
        + "\nYear Made: " + movieInfo.year
        + "\nOMBD Ratings: " + ratings.ombd + " = " + ratings.ombdVal
        + "\nRotten Tomatoes Ratings: " + ratings.rottonT + " = " + ratings.rottonTVal
        + "\nProduced in: " + movieInfo.countryProd
        + "\nLanguage of movie: " + movieInfo.language 
        + "\nPlot: " + movieInfo.plot
        + "\nActors: " + movieInfo.actors);
        }
    })
    .catch(function(error) {
        if(error.response) {
        console.log(error.response.data);
        } 
        else if(error.request) {
        console.log(error.request);
        }
        else {
        console.log("Error", error.message);
        }
})
};

function heyLiri() {
    fs.readFile("random.txt", "utf8", function(error, data) {
        var dataNew = data.split(",")
        action = dataNew[0]
        search = dataNew[1];
        
        if(action === "spotify-this-song") {
            spotifySearch();
        }

        // if(action === "movie-this"){ //testing this out 
        //     movieSearch();
        // }
        // console.log(action,search)
        // if(action === "concert-this") {
        //     concertSearch();
        // }
        if(error) { 
            console.log(error)
        }
        
    });
}
