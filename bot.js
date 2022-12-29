const tmi = require('tmi.js');
const dotenv = require('dotenv');
dotenv.config();

// Define configuration options
const username = process.env.USERNAME;
const password = process.env.PASSWORD;

const opts = {
    identity: {
        username: username,
        password: password
    },
    channels: [
        'matheusgmbr'
    ]
};

// Create a client with our options
const client = new tmi.client(opts);

// Register our event handlers (defined below)
client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);

// Connect to Twitch:
client.connect();

// Called every time a message comes in
function onMessageHandler(target, context, msg, self) {
    if (self) { return; }

    const commandName = msg.trim().toLowerCase();

    // If the command is known, let's execute it
    if (commandName === '!detailsort') {
        const message = "O comando !sort retorna um numero aleatorio de 0 - 9 para o usuário que executou o comando"
        client.say(target, message);
        generateLog(commandName);
        return;
    }
    if (commandName === '!sort') {
        const num = generateRandomNumber();
        client.say(target, `O numero sorteado para ${context.username} foi ${num}`);
        generateLog(commandName);
        return;
    } else {
        console.log(`* Unknown command ${commandName}`);
    }
}

function generateLog(commandName) {
    console.log(`* Executed ${commandName} command`);
}

function generateRandomNumber() {
    const randomNumber = Math.floor(Math.random() * 10)
    return randomNumber;
}
// Called every time the bot connects to Twitch chat
function onConnectedHandler(addr, port) {
    console.log(`* Connected to ${addr}:${port}`);
}
