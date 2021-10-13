const { Client, Intents } = require('discord.js');

const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
require('dotenv').config()

if (!(['GUILD_ID', 'CLIENT_ID','BOT_TOKEN'].every(e => e in process.env))) {
    console.error('One or more cutial environment variables are missing, exiting.');
    process.exit();
}

const { BOT_TOKEN, GUILD_ID, CLIENT_ID } = process.env;

const intents = {
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.DIRECT_MESSAGES,
    ]
};

const commands = [
    { name: 'status', description: 'Shows your statistics' },
    { name: 'init', description: 'For internal use' }
];

const rest = new REST({ version: '9' }).setToken(BOT_TOKEN);
const client = new Client(intents);

client.on("ready", async () => {
    // Initialize the discord guild with the slash commands
    await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), { body: commands });
});
