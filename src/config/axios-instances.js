import axios from 'axios';

export const axiosAuth = axios.create({
	// headers: { Pragma: 'no-cache' },
});

//axios instance without header
export const axiosNoAuth = axios.create({
	// headers: { Pragma: 'no-cache' },
});
