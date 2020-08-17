const V = require('vaxic');
const bot = require('./bot');
var Command = require('./commandTemplate');
global.currentCommands = [];


const app = new V();


app.add('GET', '/api/nextCommands', (req, res) => {
	res.writeHead(200);
	//var cmd = new Command('popsiclejokes','hurt 10');
	//currentCommands.push(cmd);
	res.end(JSON.stringify(currentCommands));
	currentCommands = [];
});


//Make sure this goes at the end
app.add('GET', (req, res) => {
	res.writeHead(404);
	res.end('404 lmao theres no default page what');
});


app.listen(8080, () => {
	console.log('Listening');
});
