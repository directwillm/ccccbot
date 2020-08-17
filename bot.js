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

  // If the command is known, let's execute it
  /*
  if (commandName === '!dice') {
    const num = rollDice();
    client.say(target, `You rolled a ${num}`);
    console.log(`* Executed ${commandName} command`);
  } else if (commandName === '!cc hurt') {
	var cmd = new Command('popsiclejokes','hurt 10');
	currentCommands.push(cmd);
  } else {
    console.log(`* Unknown command ${commandName}`);
  }
  */
  
  switch (commandName) {
		case '!dice':
			client.say(target, 'You rolled a '+rollDice());
			break;
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
// Function called when the "dice" command is issued
function rollDice () {
  const sides = 6;
  return Math.floor(Math.random() * sides) + 1;
}
// Called every time the bot connects to Twitch chat
function onConnectedHandler (addr, port) {
  console.log(`* Connected to ${addr}:${port}`);
}