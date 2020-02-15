require("dotenv").config();
var keys = require("./keys.js");
var axios = require("axios");
var moment = require("moment");
var Spotify = require("node-spotify-api");
var spotify  = new Spotify(keys.spotify);


var nodeArgs = process.argv;
var action = process.argv[2]; //ex: concert-this or movie-this goes in this index
var search = process.argv[3] //user input value

//to get user's input and know which category to start which funct
if(action === "concert-this") {
    concertSearch();
}
else if(action === "spotify-this-song"){
    spotifySearch();
}
else if(action === "movie-this") {

}
else if(action ==="do-what-it-says"){

}
else {
    console.log("Sorry. Please try again. Don't forget to include what category first. Ex: movie-this <name of movie>")
}

//get user's input
function userSearch () {
        search ="";
for (var i =3; i < nodeArgs.length; i++) {
    if(i > 3 && i < nodeArgs.length){
        search = search + "+" + nodeArgs[i]; 
    }
    else {
    search += nodeArgs[i];
    }
}
}


//concert-this <artist/band name here>
function concertSearch(){
    userSearch()

    var queryUrl= "https://rest.bandsintown.com/artists/" + search + "/events?app_id=codingbootcamp";

    axios
    .get(queryUrl).then(function(response) {
    console.log(response.data[1].datetime);
    for(var j = 0; j < response.data.length; j++) {

    var venue = response.data[j].venue.name;
    var concertCity = response.data[j].venue.city 
    var concertCountry = response.data[j].venue.country

    console.log("---------------Concert Location---------------");
    console.log("Name of Venue:" + venue + ", "  
    + "Name of city: " + concertCity + ", " 
    + "Name of county: " + concertCountry);
    console.log("---------------Concert Date--------------");
    var dateResponse = response.data[1].datetime
    var dateOnly= dateResponse.slice(0,10);
    var convertDate= moment(dateOnly).format("MM/DD/YYYY")
    console.log("Date of event:" + convertDate);
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
    userSearch();

if(search === undefined) {
    search = "The Sign by Ace of Base";
}
else{
spotify
.search({type:'track', query: search, limit: 1}, function(error, data){
    if (error) {
        return console.log('Error occurred: ' + error);
      }
    else{
        var artistName= data.tracks.items[0].album.artists[0].name
        // console.log("Artist Name is: " + artistName);
        var albumName=data.tracks.items[0].album.name;
       
        var songName =data.tracks.items[0].name
        console.log("Song: " + songName + "by " + 
        artistName + " from album titled " + albumName);
        var previewLink = data.tracks.items[0].preview_url;
        console.log("Listen preview here: " + previewLink);
    }

})}};
