export interface RedditAPIResponse {
	data: {
		children: {
			kind: 't1' | 't2' | 't3' | 't4' | 't5' | 't6';
			data: Post;
		}[];
	};
}

export interface Post {
	id: string;
	title: string;
	// this field is used to check whether a post is removed on reddit
	removed_by: Nullable<unknown>;
	added_on: number;
	url: string;
}
