var Twitter = require('twitter');
var keys = require('./keys.js');
var Spotify = require('node-spotify-api');
var fs = require('fs');
var request = require('request');

var select;
var selection = process.argv[2];
var query = process.argv[3];
var access_key = keys.twitterKeys.consumer_key;
var access_secret = keys.twitterKeys.consumer_secret;
var token_key = keys.twitterKeys.access_token_key;
var token_secret = keys.twitterKeys.access_token_secret;
var client_id = keys.spotifyKeys.client_ID;
var client_secret = keys.spotifyKeys.client_secret;

console.log(access_key);
console.log(access_secret);
console.log(token_key);
console.log(token_secret);
console.log(client_id);
console.log(client_secret);

var client = new Twitter({
	consumer_key: access_key,
	consumer_secret: access_secret,
	access_token_key: token_key,
	access_token_secret: token_secret
});
var params = {screen_name: 'aeyis047'};

var spotify = new Spotify({
	id: client_id,
	secret: client_secret
});

function runtime(){

if(selection == "my-tweets" || selection == 1){
	select = 1;
}
else if(selection == "spotify-this-song" || selection == 2){
	select = 2;
}
	
else if(selection == "movie-this" || selection == 3){
	select = 3;
}
	
else if(selection == "do-what-it-says" || selection == 4){
	select = 4;
}

switch(select){
	case 1: tweet();
		break;
	case 2: spot();
		break;
	case 3: movie();
		break;
	case 4: doit();
		break;
	default:
		return console.log("??");
	}
}
runtime();


function tweet(){
	client.get('statuses/user_timeline/', params, function(error, tweets, response){
		if(!error){
			for(var i = 0; i < tweets.length; i++){
				console.log(tweets[i].text);
				console.log("created at:" + tweets[i].created_at);
			}
		}
	});
}


function spot(){
	spotify.search({
		type:'track', query: query}, function(error, data){
		if(error){
			return console.log(error);
		}else{
			//console.log(data.tracks.items[0]);
			console.log("Name: " + data.tracks.items[0].name);
			console.log("Artist: " + data.tracks.items[0].artists.name);
			console.log("Album: " + data.tracks.items[0].album.name);
			console.log("Preview URL: " + data.tracks.items[0].preview_url);
		}
		
	})
}


function movie(){
	request('http://www.omdbapi.com/?apikey=40e9cece&s=' + query,  function(error,response, body){
		var thing = JSON.parse(body);
		console.log(thing.Search[0]);
	})
}
function doit(){
	var temp = [];
	fs.readFile('random.txt', 'utf8', function(err,data){
		if(err){
			console.log(err);
		}else{
			console.log(data);
			temp = data.split(',');
			console.log(temp[0], temp[1]);
			selection = temp[0];
			query = temp[1];	
			runtime();
		}
	});
}


