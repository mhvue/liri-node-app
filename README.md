## LIRI (Language Interpretation and Recognition Interface)

This is a language interpretation applicaiton for command line on node.  This appliation will:
* Find concerts using command of _concert-this_
* Spotify a song using command of _spotify-this-song_
* Find movie information using command of _movie-this_
* Call one of the commands above using command of _do-what-it-says_

## How it works:
1. Open terminal. I am using Git Bash. 
2. Go into the folder with file liri.js.
3. Always start with "node". Then input liri.js. Stay on the same line then follow next steps.
4. Input the command and topic of interest (ex: movie-this Cinderella)
5. Information will then load. See examples below.

### Concerts 
Using _concert-this_
<p align="center"><b>An input of concert-this with artist or band name and following results loaded with name of venue, location and date of event</b>
<br>
<img src= "images/concertSearch2.png">
</p>

### Spotify a song
Using _spotify-this-song_
<p align="center"><b>An input of spotify-this-song with song name and the results loaded with song title, artist, Album name, and link to preview the song</b>
<br>
<img src= "images/songSearch.png" width="600px"/>
</p>

### Movie
Using _movie-this_
<p align="center"><b>An input of movie-this with movie title and the results loaded with movie name, year made, ratings from OMBD and Rotten Tomatoes, where producd, lanuage of movie, and plot.</b>
<br>
<img src= "images/movieSearch.png">
</p>

### Do What It Says aka "Hey Liri..."
Using _do-what-it-says_
<p align="center"><b>An input of do-what-it-says which will reach a text file via npm fs will show results based on the command in text file.</b>
<br>
<img src= "images/dowhatitSaysSearch.png">
</p>

## Technologies Used
This application uses npm packages of axios, moment, fs, dotenv and spotify. Information on movies obtained from OMBD API. Information on concert obtained from Bands in Town Artist Events API. Song information obtained from Spotify API. This application is build with javascript and node.js. 