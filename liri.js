var Twitter = require('twitter');
var keys = require('./keys.js');
var Spotify = require('node-spotify-api');


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



function tweet(){
	client.get('statuses/user_timeline', params, function(error, tweets, response){
		if(!error){
			console.log(tweets);	
		}
	});
}


function spotify(){
	var song = process.argv[3];
	spotify.search({
		type:'track', query: 'Lazenca', function(error, data){
		if(error){
			return console.log(error);
		}else{
			console.log(data);
		}
		}
	})
}


function movie(){
}
function doit(){
}

