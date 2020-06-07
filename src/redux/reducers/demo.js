import { DEMO } from 'redux/types';
import { PURGE } from 'redux-persist';

const initial_state = {
	demo_state: null
};

export default (state = initial_state, action) => {
	switch (action.type) {
		case PURGE:
			return {
				demo_state: null
			};

		case DEMO:
			return {
				...state,
				demo_state: action.payload
			}

		default:
			return state;
	}
};
