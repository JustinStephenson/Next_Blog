import AuthCheck from '@/components/AuthCheck';
import HeartButton from '@/components/HeartButton';
import PostContent from '@/components/PostContent';
import { firestore, getUserWithUsername, postToJSON } from '@/lib/firebase';
import Link from 'next/link';
import { useDocumentData } from 'react-firebase-hooks/firestore';

// This page is statically generated, BUT regenerated after new requests come in at an interval of 5000ms.
// If a pre-rendered page does not exist, will fallback to regular SSR.
// This is ISR

export async function getStaticProps({ params }: any) {
	const { username, slug } = params;
	const userDoc = await getUserWithUsername(username);

	let post;
	let path;

	if (userDoc) {
		const postRef = userDoc.ref.collection('posts').doc(slug);
		post = postToJSON(await postRef.get());

		path = postRef.path;
	}

	return {
		props: { post, path },
		revalidate: 5000,
	};
}

export async function getStaticPaths() {
	// Improve my using Admin SDK to select empty docs
	const snapshot = await firestore.collectionGroup('posts').get();

	const paths = snapshot.docs.map((doc) => {
		const { slug, username } = doc.data();
		return {
			params: { username, slug },
		};
	});

	return {
		// must be in this format:
		// paths: [
		//   { params: { username, slug }}
		// ],
		paths,
		fallback: 'blocking',
	};
}

type PostProps = {
	path: any;
	post: any;
};

const PostPage = (props: PostProps) => {
	const postRef: any = firestore.doc(props.path);
	const [realtimePost] = useDocumentData(postRef);

	const post = realtimePost || props.post;

	return (
		<main>
			<section>
				<PostContent post={post} />
			</section>
			<aside className="card">
				<p>
					<strong>{post.heartCount || 0} 🤍</strong>
				</p>
			</aside>

			<AuthCheck
				fallback={
					<Link href="/enter">
						<button>💗 Sign Up</button>
					</Link>
				}
			>
				<HeartButton postRef={postRef} />
			</AuthCheck>
		</main>
	);
};

export default PostPage;
