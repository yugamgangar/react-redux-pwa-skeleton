import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Icons from 'utils/icons';

class Icon extends Component {
	render() {
		return (
			<svg
				className={this.props.className || ''}
				viewBox={Icons[this.props.icon].viewBox}
				dangerouslySetInnerHTML={{ __html: Icons[this.props.icon].data }}
			/>
		);
	}
}

Icon.propTypes = {
	icon: PropTypes.string.isRequired,
	className: PropTypes.string,
};

export default Icon;

/*	--	EXAMPLE TO IMPLEMENT  --
	<Icon icon='' className=''/> -> icon props should be passed const defined in icons.js
*/
