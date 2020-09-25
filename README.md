# programming-news-bot

A discord bot that aggregates programming articles from Reddit
and hackernews, and post them on Discord.

### Adding this bot to your own server
0. Clone this repo and then run `yarn`
1. Create an application in [Discord application portal](https://discord.com/developers/applications).
2. Add a bot to your application
3. Create an environment variables DISCORD_API_SECRET and set the value
to the secret of the bot you just created
4. Give appropriate permissions to your bot
5. Invite your bot to your server by going to the link generated
6. In `src/constants.ts`, change `CHANNEL_ID` to the ID of the text channel
you want this bot to send links to. There are plenty of tutorials
on how to get the ID of a text channel.
7. To start locally, run `yarn start:dev`.
