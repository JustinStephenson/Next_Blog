import Loader from '@/components/Loader';
import { firestore, fromMillis, postToJSON } from '@/lib/firebase';
import { useState } from 'react';
import PostFeed from '@/components/PostFeed';

type HomeProps = {
	user: any;
	posts: any;
};

// Max post to query per page
const LIMIT = 1;

export async function getServerSideProps(context: any) {
	const postsQuery = firestore
		.collectionGroup('posts') // grab any sub query no matter where it is nested
		.where('published', '==', true)
		.orderBy('createdAt', 'desc')
		.limit(LIMIT);

	const posts = (await postsQuery.get()).docs.map(postToJSON);

	return {
		props: { posts }, // will be passed to the page component as props
	};
}

// The default exports is what Next will trigger,
// when the route is hit in the browser
export default function Home(props: HomeProps) {
	const [posts, setPosts] = useState(props.posts);
	const [loading, setLoading] = useState(false);
	const [postsEnd, setPostsEnd] = useState(false);

	const getMorePosts = async () => {
		setLoading(true);
		const last = posts[posts.length - 1];
		const cursor =
			typeof last.createdAt === 'number'
				? fromMillis(last.createdAt)
				: last.createdAt;

		const query = firestore
			.collectionGroup('posts')
			.where('published', '==', true)
			.orderBy('createdAt', 'desc')
			.startAfter(cursor)
			.limit(LIMIT);

		const newPosts = (await query.get()).docs.map((doc) => doc.data());
		setPosts(posts.concat(newPosts));
		setLoading(false);

		if (newPosts.length < LIMIT) {
			setPostsEnd(true);
		}
	};

	return (
		<main>
			<PostFeed posts={posts} />
			{!loading && !postsEnd && (
				<button onClick={getMorePosts}>Load more</button>
			)}
			<Loader show={loading} />
			{postsEnd && 'You have reached the end!'}
		</main>
	);
}
