const tmi = require('tmi.js');
var Command = require('./commandTemplate');
console.log("1");
var d = new Date();
var curTime = d.getTime();
var users = [{name:'@@test',lastTime:curTime}];
console.log("2");


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

	console.log("Target: \n"+target);
	console.log("Context: \n"+context);
	console.log("MSG: \n"+msg);
	
	let user = context.username;
	let userIndex = null;
	//check if user exists in users, if not add them
	for(var i = 0;i < users.length;i++) {
		if(users[i].name == user) {
			userIndex = i;
		}
	}
	if(!userIndex){
		users.push({name: user,lastTime:0});
		userIndex = users.length-1;
	}
	console.log(users.toString());
	
	// Remove whitespace from chat message
	const commandName = msg.trim();
	
	let newCmd = null;
	switch (commandName) {
		case '!cc hurt':
			newCmd = new Command(user,'hurt 10');
			break;
		case '!cc bomb':
			newCmd = new Command(user,'bomb');
			break;
		case '!cc overload':
			newCmd = new Command(user,'overload');
			break;
		case '!cc laser':
			newCmd = new Command(user,'laser');
			break;
		case '!cc ice':
			newCmd = new Command(user,'ice');
			break;
		case '!cc hiGrav':
			newCmd = new Command(user,'hiGrav');
			break;
		case '!cc lowGrav':
			newCmd = new Command(user,'lowgrav');
			break;
		case '!cc sandwich':
			newCmd = new Command(user,'sandwich');
			break;
	}
	if(newCmd) {
		
		var d = new Date();
		var curTime = d.getTime();
		var timeDif = curTime-users[userIndex].lastTime;
		console.log(timeDif);
		if (timeDif  >= 30000) {
			currentCommands.push(newCmd);
			users[userIndex].lastTime = curTime;
		}
		else {
			//code to run if still on cooldown
			client.say(target, user+", you need to wait "+(30-Math.round(timeDif/1000))+" seconds until your next command");
		}
	} else {
		//cmd not known
		//will need to grab any !cc at the start before implementing this
		
	}
}

// Called every time the bot connects to Twitch chat
function onConnectedHandler (addr, port) {
  console.log(`* Connected to ${addr}:${port}`);
}