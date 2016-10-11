// Imported request from npn request package installed in the terminal and stored in the variable
var request = require('request');
var key = require('./keys.js');
var arg1 = process.argv[2];
var arg2 = process.argv[3];

var movieName ="";

for(var i=2; i<arg1.length; i++){
  if( i>2 && i<arg1.length){
    movieName = movieName + '+' +arg1[i];
  }else{
    movieName = movieName + arg1[i];
  }
}

function omdbRequest(movieName){
  var queryUrl = 'http://www.omdbapi.com/?t=' + movieName +'&plot=short&tomatoes=true&r=json';
  // console.log(queryUrl);
  request(queryUrl,function(error,response,body){
    // console.log(movieName);
    // console.log(JSON.stringify(response, null, 2));
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
  });
}

switch(arg1){
  case "movie-this":
    omdbRequest(arg2);
    break;
  case "my-tweets":
    getMyTweets()
    break;
  case "spotify-this-song":
    getMySong()
    break;
  case "do-what-it-says":
    doIt()
    break;
} 
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
  }

});
}
function getMySong(arg2){
  var SpotifyWebApi = require('spotify-web-api-node');
  var spotifyCreds = key.spotifyKeys;
  var spotifyApi = new SpotifyWebApi(spotifyCreds);
      spotifyApi.searchTracks(arg2)
      .then(function(data) { 
        console.log('Artists Name: '+ JSON.stringify(data.tracks.items[0].artist[0].name, null, 2));
       },function(err) {
          console.error(err);

     });
  }

function getMyTweets(){
  var twitterCreds = key.twitterKeys;
// console.log(twitterCreds);
  var Twitter = require('twitter');

  var client = new Twitter(twitterCreds);
  var params = {screen_name: 'annieg119'};
  client.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (!error) {
      for(i = 0; i < tweets.length; i++){
        console.log(tweets[i].text+"\n");
      }
    }
  });
}