var TWITTER_CONSUMER_KEY = 'aTpzXCBQZY5FwYqzi6zWxm7z9';
var TWITTER_CONSUMER_SECRET = 'FhZRh6BKWKfnqc3rXeEhxaZ2uLQTOvRzKtjUAHjgcOrxjGQ1xw';
var TWITTER_ACCESS_TOKEN = '743444373656977408-xQ3rTsqZsJe9FXk3Ty2SeuzwPpmHebs';
var TWITTER_ACCESS_TOKEN_SECRET = 'Qupbru3mL0InQodsfRT3xAQzmLQClZ9J5mIxM3vm7D59O';

var TWITTER_SEARCH_PHRASE = 'Elon Musk'//'#technology OR #design';

var Twit = require('twit');

var Bot = new Twit({
	consumer_key: TWITTER_CONSUMER_KEY,
	consumer_secret: TWITTER_CONSUMER_SECRET,
	access_token: TWITTER_ACCESS_TOKEN, 
	access_token_secret: TWITTER_ACCESS_TOKEN_SECRET
});

console.log('The bot is running...');

function BotRetweet() {

	var query = {
		q: TWITTER_SEARCH_PHRASE,
		result_type: "recent"
	}

	Bot.get('search/tweets', query, BotGotLatestTweet);

	function BotGotLatestTweet (error, data, response) {
		if (error) {
			console.log('Bot could not find latest tweet, : ' + error);
		}
		else {
			var id = {
				id : data.statuses[0].id_str
			}

			Bot.post('statuses/retweet/:id', id, BotRetweeted);
			
			function BotRetweeted(error, response) {
				if (error) {
					console.log('Bot could not retweet, : ' + error);
				}
				else {
					console.log('Bot retweeted : ' + id.id);
				}
			}
		}
	}
	setInterval(BotRetweet, 3*60*1000);
}

BotRetweet();