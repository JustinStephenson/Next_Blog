import React from 'react';

type LoaderProps = {
	show: boolean;
};

// Loading spinner
const Loader = (props: LoaderProps) => {
	return props.show ? <div className="loader"></div> : null;
};

export default Loader;
