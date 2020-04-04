## LIRI (Language Interpretation and Recognition Interface)

This is a language interpretation application for command line on node.  This appliation will:
* Find concerts using command  _concert-this_
* Spotify a song using command  _spotify-this-song_
* Find movie information using command  _movie-this_
* Call one of the commands above using command _do-what-it-says_


## Table of Contents
* [How it works](#how-it-works)
    * [Concert-this](#concert-this)
    * [Spotify-this-song](#spotify-this-song)
    * [Movie-this](#movie-this)
    * [Do-what-it-says](#do-what-it-says)
* [Technologies](#technologies)


## How it works:
1. Open terminal. (I am using Git Bash.)
2. Go into the folder with file liri.js.
3. Start with "node". Then input liri.js.
<pre><code>node liri.js </code></pre> 
4. On that same line, input the command and topic of interest 
<pre><code>node liri.js movie-this Cinderella </pre></code>
5. Results will then load. See examples below.


### Concerts 
Using _concert-this_
<p align="center"><b>An input of concert-this with artist or band name and the following results are loaded with Venue, Location and Date of Event</b>
<br>
<img src= "images/concertSearch2.png">
</p>

### Spotify a song
Using _spotify-this-song_
<p align="center"><b>An input of spotify-this-song with song name and the results are loaded with song Title, Artist, Album name, and link to preview the song</b>
<br>
<img src= "images/songSearch.png" width="700px">
</p>

<p align="center"><b>An input of spotify-this-song with NO song name, will default to search of "The Sign".</b>
<br>
<img src= "images/spotifyEmpty.png" width="700px">
</p>

### Movie
Using _movie-this_
<p align="center"><b>An input of movie-this with movie title and the results are loaded with movie Name, Year Made, Ratings from OMBD and Rotten Tomatoes, Production location, Language of movie, and Plot.</b>
<br>
<img src= "images/movieSearch.png">
</p>

<p align="center"><b>An input of movie-this with NO movie title will default search of "Mr. Nobody".</b>
<br>
<img src= "images/moviethisEmptyResults.png">
</p>


### Do What It Says aka "Hey Liri..."
Using _do-what-it-says_
<p align="center"><b>An input of do-what-it-says will read a text file containing command line. The results shown are based on what is in that text file. In this example, the text file contains spotifty-this-song "I Want it That Way".</b>
<br>
<img src= "images/dowhatitSaysSearch.png">
</p>

<p align="center"><b>Here, we have an input of do-what-it-says, however, this time, the text file contatins movie-this Mulan.</b>
<br>
<img src= "images/dowhatitSaysMovie.png">
</p>

## Technologies 
* Npm packages 
    * Axios
    * Moment
    * fs
    * dotenv 
    * spotify 
* Information on movies obtained from 
    * OMBD API
* Information on concert obtained from 
    * Bands in Town Artist Events API
* Song information obtained from 
    * Spotify API
* Javascript 
* Node.js