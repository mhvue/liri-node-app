require("dotenv").config();
// var keys = require("./keys.js");
// var spotify = new Spotify(keys.spotify); //this is just an example

//concert-this <artist/band name here>
var axios = require("axios");
// var moment = require("moment");


var nodeArgs = process.argv;
var artist = "";

for (var i =2; i < nodeArgs.length; i++) {
    if(i > 2 && i < nodeArgs.length){
        artist = artist + "+" + nodeArgs[i]; 
    }
    else {
    artist += nodeArgs[i];
    }
}

var queryUrl= "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

axios
.get(queryUrl).then(function(response) {

    for(var j = 0; j < response.data.length; j++) {
    console.log("Name of Venue:" + response.data[j].venue.name + " "
    + "Name of city: " + response.data[j].venue.city + " " 
    + "Name of county: " + response.data[j].venue.country );
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
});