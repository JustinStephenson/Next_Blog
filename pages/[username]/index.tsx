import PostFeed from '@/components/PostFeed';
import UserProfile from '@/components/UserProfile';
import { getUserWithUsername, postToJSON } from '@/lib/firebase';

type Props = {
	user: any;
	posts: any;
};

// For server side rendering (SSR) in Next.js
export async function getServerSideProps({ query }: any) {
	const { username } = query;
	const userDoc = await getUserWithUsername(username);

	// If no user, short circuit to 404 page
	// notFound: true, will tell Next.js to render a 404 page
	if (!userDoc) {
		return {
			notFound: true,
		};
	}

	// JSON serializable data
	let user = null;
	let posts = null;

	if (userDoc) {
		user = userDoc.data();
		const postsQuery = userDoc.ref
			.collection('posts')
			.where('published', '==', true)
			.orderBy('createdAt', 'desc')
			.limit(5);

		posts = (await postsQuery.get()).docs.map(postToJSON);
	}

	return {
		props: { user, posts }, // will be passed to the page component as props
	};
}

// This is a dynamic route in file structure -> [name]
const UserProfilePage = (props: Props) => {
	return (
		<main>
			<UserProfile user={props.user} />
			<PostFeed posts={props.posts} />
		</main>
	);
};

export default UserProfilePage;
