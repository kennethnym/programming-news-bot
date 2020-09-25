export interface RedditAPIResponse {
	data: {
		children: {
			kind: 't1' | 't2' | 't3' | 't4' | 't5' | 't6';
			data: RedditPost;
		}[];
	};
}

export interface RedditPost {
	id: string;
	title: string;
	// this field is used to check whether a post is removed on reddit
	removed_by: any | null;
	url: string;
	permalink: string;
}
