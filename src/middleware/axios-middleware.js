import { axiosAuth } from 'config/axios-instances';

export function axiosAuthMiddleware({ dispatch, getState }) {
	return next => action => {
		axiosAuth.interceptors.request.use(
			function(config) {
				config.headers.Authorization = `Bearer ${getState().authentication.token}`;
				return config;
			},
			function(error) {
				return Promise.reject(error);
			}
		);
		next(action);
	};
}
