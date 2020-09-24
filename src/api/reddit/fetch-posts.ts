import fetch from 'node-fetch';

import { RedditAPIResponse } from './types';
import { SUBREDDIT_URL } from './constants';

async function fetchPosts() {
	const result: RedditAPIResponse = await fetch(
		`${SUBREDDIT_URL}/.json?sort=trending`,
		{
			method: 'GET',
		},
	).then((response) => response.json());

	return result.data.children.filter(({ kind }) => kind === 't3');
}

export default fetchPosts;
