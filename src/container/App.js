import React, { Component } from 'react'; // import Suspense and lazy for implementing lazy loading
import 'styles/index.scss';

// redux
import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import reduxThunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { axiosAuthMiddleware } from 'middleware/axios-middleware';
import reducers from 'redux/reducers';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import { PersistGate } from 'redux-persist/lib/integration/react';
import createEncryptor from 'redux-persist-transform-encrypt'

// routes and routing
//import Routes from 'config/routes';
import { BrowserRouter as Router, Route } from 'react-router-dom';

// scroll to top
// import ScrollToTop from 'utils/scroll-to-top';

//pages
import Demo from '../views/demo/Demo'

// -- Only if you want to implement string.toProperCase(), in which first letter of every word becomes capital
// String.prototype.toProperCase = function () {
// 	return this.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
// };

const encryptor = createEncryptor({
	secretKey: 'xyzzyxspoonshift1',
	onError: function (error) {
		// Handle the error.
	}
})

const persistConfig = {
	key: 'root',
	transforms: [encryptor],
	storage: storage,
	stateReconciler: autoMergeLevel2, // see "Merge Process" section for details.
	// blacklist: ['career_goal'],
};

const pReducer = persistReducer(persistConfig, reducers);

const createStoreWithMiddleware = applyMiddleware(
	reduxThunk,
	logger,
	axiosAuthMiddleware)(
		createStore
	);

const store = createStoreWithMiddleware(
	pReducer,
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const persistor = persistStore(store);

/*
	--	IF YOU WANT TO ADD LAZY LOADER	--

function retry(fn, retriesLeft = 5, interval = 1000) {
	return new Promise((resolve, reject) => {
		fn()
			.then(resolve)
			.catch((error) => {
				setTimeout(() => {
					if (retriesLeft === 1) {
						// reject('maximum retries exceeded');
						reject(error);
						return;
					}

					// Passing on "reject" is the important part
					retry(fn, retriesLeft - 1, interval).then(resolve, reject);
				}, interval);
			});
	});
}
const Home = lazy(() => {
	return retry(() => import('views/...')); // add component url inside import
});

	-- enclose all the routes with suspense component and pass loader component as fallback, eg given below
	<Suspense fallback={<LoaderComponent/>}>
		<Route />
	</Suspense>

*/

/*
	--	YOU CAN ENCLOSE SCROLL-TO-TOP COMPONENT WITH WHITH REQUIRED ROUTES
	<ScrollToTop>
		<Route />
	</ScrollToTop>

*/

class App extends Component {
	render() {
		return (
			<Provider store={store}>
				<PersistGate loading persistor={persistor}>
					<Router>
						<Route exact path="/" component={Demo} />
					</Router>
				</PersistGate>
			</Provider>
		);
	}
}

export default App;
