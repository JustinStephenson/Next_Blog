import React from 'react';

type Props = {
	user: any;
};

const UserProfile = (props: Props) => {
	return (
		<div className="box-center">
			<img
				src={props.user.photoURL || '/hacker.png'}
				referrerPolicy="no-referrer"
				className="card-img-center"
			/>
			<p>
				<i>@{props.user.username}</i>
			</p>
			<h1>{props.user.displayName || 'Anonymous User'}</h1>
		</div>
	);
};

export default UserProfile;
