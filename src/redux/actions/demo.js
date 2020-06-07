import { axiosNoAuth } from 'config/axios-instances';
import { API_BASE_URL } from 'config/config';
import { DEMO } from 'redux/types';
import { Api_url } from 'config/api_url';

export function authHandler(data, successCallback, errorCallback) {
	return async function (dispatch) {
		try {
			let response = await axiosNoAuth.post(API_BASE_URL + Api_url.Demo, data);

			await dispatch({
				type: DEMO,
				payload: response.data.data,
			});
			successCallback && successCallback();
		} catch (e) {
			console.error(e);
			errorCallback && errorCallback(e.response.data.message);
		}
	};
}