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

}
else if(action === "movie-this") {

}
else if(action ==="do-what-it-says"){

}
else {
    console.log("Sorry, did not get input. Please try again")
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
// spotify
// .search({type:'track', query: 'My search query'})
// .then(function(response){
// console.log(response);
// })
// .catch(function(error) {
// console.log(error)
// });
