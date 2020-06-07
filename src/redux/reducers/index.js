import { combineReducers } from 'redux';

// reducer files
import demo from 'redux/reducers/demo';

const appReducer = combineReducers({
	demo
});

const rootReducer = (state, action) => {
	return appReducer(state, action);
};

export default rootReducer;
