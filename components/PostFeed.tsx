import Link from 'next/link';

type PostFeedProps = {
	posts: any;
	admin?: any;
};

type Post = {
	post: any;
	admin?: any;
};

const PostFeed = (props: PostFeedProps) => {
	return props.posts
		? props.posts.map((post: any) => (
				<PostItem post={post} key={post.slug} admin={props.admin} />
		  ))
		: null;
};

function PostItem({ post, admin = false }: Post) {
	// Naive method to calc word count and read time
	const wordCount = post?.content.trim().split(/\s+/g).length;
	const minutesToRead = (wordCount / 100 + 1).toFixed(0);

	return (
		<div className="card">
			<Link href={`/${post.username}`}>
				<p>
					<strong>By @{post.username}</strong>
				</p>
			</Link>

			<Link href={`/${post.username}/${post.slug}`}>
				<h2>
					<p>{post.title}</p>
				</h2>
			</Link>

			<footer>
				<span>
					{wordCount} words. {minutesToRead} min read
				</span>
				<span className="push-left">💗 {post.heartCount || 0} Hearts</span>
			</footer>

			{/* If admin view, show extra controls for user */}
			{admin && (
				<>
					<Link href={`/admin/${post.slug}`}>
						<h3>
							<button className="btn-blue">Edit</button>
						</h3>
					</Link>

					{post.published ? (
						<p className="text-success">Live</p>
					) : (
						<p className="text-danger">Unpublished</p>
					)}
				</>
			)}
		</div>
	);
}

export default PostFeed;
