import { Client as DiscordClient } from 'discord.js';
import checkForArticles from './check-for-articles';

require('dotenv').config();

/**
 * Creates a discord bot client and returns the instance
 */
async function createClient() {
	const client = new DiscordClient();

	await client.login(process.env.DISCORD_API_SECRET);

	return client;
}

/**
 * Initializes server stuff
 */
async function initialize() {
	const client = await createClient();

	// check for new articles every hour
	setInterval(checkForArticles(client), 1000);
}

initialize();
