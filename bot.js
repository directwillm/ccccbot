const tmi = require('tmi.js');
var Command = require('./commandTemplate');

// Define configuration options
const opts = require('./opts');
// Create a client with our options
const client = new tmi.client(opts);

// Register our event handlers (defined below)
client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);

// Connect to Twitch:
client.connect();

// Called every time a message comes in
function onMessageHandler (target, context, msg, self) {
	if (self) { return; } // Ignore messages from the bot
	console.log(target);
	console.log(context);
	console.log(msg);
	
	let user = context.username;
	// Remove whitespace from chat message
	const commandName = msg.trim();

  
	switch (commandName) {
		case '!cc hurt':
			currentCommands.push(new Command(user,'hurt 10'));
			break;
		case '!cc bomb':
			currentCommands.push(new Command(user,'bomb'));
			break;
		case '!cc overload':
			currentCommands.push(new Command(user,'overload'));
			break;
		case '!cc laser':
			currentCommands.push(new Command(user,'laser'));
			break;
	}
}

// Called every time the bot connects to Twitch chat
function onConnectedHandler (addr, port) {
  console.log(`* Connected to ${addr}:${port}`);
}