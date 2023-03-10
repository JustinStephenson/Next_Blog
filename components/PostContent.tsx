import Link from 'next/link';
import reactMarkdown from 'react-markdown';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';

// UI component for main post content
const PostContent = ({ post }: any) => {
	const createdAt =
		typeof post?.createdAt === 'number'
			? new Date(post.createdAt)
			: post.createdAt.toDate();

	return (
		<div className="card">
			<h1>{post?.title}</h1>
			<span className="text-sm">
				Written by{' '}
				<Link href={`/${post.username}/`}>
					<p className="text-info">@{post.username}</p>
				</Link>{' '}
				on {createdAt.toISOString()}
			</span>

			<ReactMarkdown>{post?.content}</ReactMarkdown>
		</div>
	);
};

export default PostContent;
