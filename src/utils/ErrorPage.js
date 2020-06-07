import React from 'react';
import '../styles/loader.scss';
import { errorGif } from './images';

export default class ErrorPage extends React.Component {
	render() {
		return (
			<div>
				<div className="error-msg">
					<p> Oops, seems like something went wrong. Sorry!</p>
					<p>
						Please logout and log back in to continue and leave a message telling us
						what went wrong.
					</p>
					<p> Thank you!</p>
					<button style={{ marginTop: '20px' }}>Logout</button>
				</div>
			</div>
		);
	}
}
