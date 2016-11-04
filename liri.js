// Imported request from npm request package installed in the terminal and stored in the variable
var request = require('request');
// Imported file keys.js and stored it in a variable.
var key = require('./keys.js');
var prettyjson = require('prettyjson');
// set argument 2 in a variable
var arg1 = process.argv[2];
// set argument 3 in a variable
var arg2 = process.argv[3];
// variable for movie name and storing it as an empty array
var movieName ="";
// calling function to request the query from OMDB api
function omdbRequest(movieName){
  var queryUrl = 'http://www.omdbapi.com/?t=' + movieName +'&plot=short&tomatoes=true&r=json';
  // console.log(queryUrl);
  // to use rquest npm package to get the query and response to the respective api.
  request(queryUrl,function(error,response,body){
        // console.log(body)
        var obj= JSON.parse(body)
        console.log(prettyjson.render(obj, {
          keysColor: 'rainbow',
          dashColor: 'magenta',
          stringColor: 'red'
        }));
    // console.log(movieName);
    // console.log(JSON.stringify(response, null, 2));
    // if movie name is not equal to null it console.logs the asked movie info.
    if (movieName != null && !error && response.statusCode == 200) {
      console.log("The Title of the movie  : " + JSON.parse(body)["Title"] +("."));
      console.log("The Artist Name  : " + JSON.parse(body)["Actors"]+("."));
      console.log("The Year  : " + JSON.parse(body)["Year"]+("."));
      console.log("Released On : " + JSON.parse(body)["Released"]+("."));
      console.log(" IMDB Rating : " + JSON.parse(body)["imdbRating"]+("."));
      console.log("Language of the movie.  : " + JSON.parse(body)["Language"]+("."));
      console.log(" Country where the movie was produced  : " + JSON.parse(body)["Country"]+("."));
      console.log("The plot of the Movie  : " + JSON.parse(body)["Plot"]+("."));
      console.log("Rotten Tomatoes Rating.  : " + JSON.parse(body)["tomatoRating"]+("."));
      console.log(" Rotten Tomatoes URL : " + JSON.parse(body)["Website"]+("."));
    }
    // if the user does'nt type the movie name then, it console.logs the following message.
    if(movieName == null){
      console.log(' Watch Mr.Nobody.');
      console.log('If you '+'have not' + ' watched' + " Mr. Nobody," + 'then you should!');
      console.log('Its on Netflix!'); 
    }
  });
}
// Using switch to switch our case scenarios from one to another.
 function liriBot(arg1, arg2){
  switch(arg1){
  case "movie-this":
    omdbRequest(arg2);
    break;
  case "my-tweets":
    getMyTweets();
    break;
  case "spotify-this-song":
    getMySong(arg2);
    
    break;
  case "do-what-it-says":
    doIt();
    break;
  } 
 }
// inital invokation of liribot
liriBot(arg1, arg2);
// calling a function  which captures and reads file random.txt to current file
// and returns the text of that file in the terminal.
function doIt(){
var fs = require('fs');
// Running the readFile module that's inside of fs.
// Stores the read information into the variable "data"
  fs.readFile("random.txt", "utf8", function(err,data){
  // Break the string down by comma separation and store the contents into the output array.
    var output = data.split(',');
  // Loop Through the newly created output array 
    for (var i=0; i<output.length; i++){
    // Print each element (item) of the array/ 
     console.log(output[i]);
     //replace any linbreaks or whitespace and reassign arg1
     arg1 = output[0].replace(/(\r\n|\n|\r)/gm,"").trim();
    // //replace any linbreaks or whitespace and reassign arg2
     arg2 = output[1].replace(/(\r\n|\n|\r)/gm,"").trim();
     // invoke liri bot with function from text
     liriBot(arg1, arg2);
    }
  });
}
// This function captures the import of spotify keys and returns the data asked.
function getMySong(){
  // import of spotify keys thru 'spotify-web-api-node'npm package  installed in  the terminal and storing it in a variable
  var SpotifyWebApi = require('spotify-web-api-node');
  // picking up keys stored in keys.js file and storing it in a variable.
  var spotifyCreds = key.spotifyKeys;
   // console.log(spotifyCreds);
   // console.log(arg2);
   // Creating a new variable which stores the keys plus the import from the npm package
  var spotifyApi = new SpotifyWebApi(spotifyCreds);
  // we search the track to get using spotify and by using user input
       spotifyApi.searchTracks(arg2)
       // This function takes the data and parse it into the asked properties of that oject 
       // the object  is a song name as input given by the user in the form of arg2 
        .then(function(data){
          console.log('Song Name:'+ arg2);
          console.log('Artist Name:'+ JSON.stringify(data.body.tracks.items[0].artists[0].name,null,2));
          console.log('Album Name:'+ JSON.stringify(data.body.tracks.items[0].album.name,null,2));
          console.log('Preview Link:'+ JSON.stringify(data.body.tracks.items[0].preview_url,null,2));
          console.log('Popularity Is:'+ JSON.stringify(data.body.tracks.items[0].popularity,null,2));
        // If error occurs then it gives the following message.
        }, function(err) {
              console.error('Something is Wrong',err.message);
        });  
      }   
// this function captures the twitter api and returns the user tweets.
function getMyTweets(){
  // import of twitter keys thru 'twitter'npm package  installed in  the terminal and storing it in a variable
  var Twitter = require('twitter');
  // picking up keys stored in keys.js file and storing it in a variable.
  var twitterCreds = key.twitterKeys;
  // console.log(twitterCreds);
  // Creating a new variable which stores the keys plus the import from the npm package
  var client = new Twitter(twitterCreds);
  // this variable stores the screen name of the person whoose tweets we need to get.
  var params = {screen_name: 'annieg119'};
  // this function iterates thru the tweets and returns it back.
  client.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (!error) {
      for(i = 0; i < tweets.length; i++){
        console.log(tweets[i].text+"\n");
      }
    }
  });
}
