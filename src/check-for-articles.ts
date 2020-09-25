import { Client as DiscordClient, TextChannel } from 'discord.js';

import { CHANNEL_ID } from './constants';
import * as Reddit from './api/reddit';

type Article = Reddit.Post;

/**
 * This is used to keep track of articles that have already sent to the channel.
 * Articles will be removed from here if they were added for more than a day.
 */
const sentPost = new Map<string, Article>();

function cleanup() {
	sentPost.forEach((article, articleID) => {
		if (Date.now() - article.added_on > 85_400_000) {
			sentPost.delete(articleID);
		}
	});
}

/**
 * Creates a discord channel message with a given article
 */
function buildMessageFromArticle(article: Article) {
	return `${article.title}
${article.url}`;
}

/**
 * Check for any new articles. This will be called every hour.
 * It is possible that there are new posts and old posts that came from last check.
 * Those old posts will have been added to sentPost during the last check,
 * and so in the next check they won't be send to the text channel.
 * @param client
 */
function checkForArticles(client: DiscordClient) {
	return async () => {
		console.log('performing check...');

		cleanup();

		const articles: Article[] = [];
		const redditPosts = await Reddit.fetchPosts();

		redditPosts.forEach(({ data: post }) => {
			if (!sentPost.has(`reddit_${post.id}`)) {
				sentPost.set(`reddit_${post.id}`, post);
				articles.push(post);
			}
		});

		const channel = client.channels.cache.get(CHANNEL_ID) as
			| TextChannel
			| undefined;

		articles.forEach((article, i) => {
			setTimeout(() => {
				channel?.send(buildMessageFromArticle(article));
			}, 10000 * i);
		});
	};
}

export default checkForArticles;
