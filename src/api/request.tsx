import axios from 'axios';

const instance = axios.create({
	baseURL: process.env.REACT_APP_API_URL,
	headers: {
		'x-api-key': process.env.REACT_APP_API_KEY
	}
});

const get = (url: string, params = {}): Promise<object> => {
	return new Promise((resolve, reject) => {
		instance.get(url, { params })
			.then(response => resolve(response.data))
			.catch(error => reject(error))
	});
}

const post = (url: string, body = {}, params = {}): Promise<object> => {
	return new Promise((resolve, reject) => {
		instance.post(url, { data: body, params })
			.then(response => resolve(response.data))
			.catch(error => reject(error))
	});
}

const put = (url: string, body = {}, params = {}): Promise<object> => {
	return new Promise((resolve, reject) => {
		instance.put(url, { data: body, params })
			.then(response => resolve(response.data))
			.catch(error => reject(error))
	});
}

const patch = (url: string, body = {}, params = {}): Promise<object> => {
	return new Promise((resolve, reject) => {
		instance.patch(url, { data: body, params })
			.then(response => resolve(response.data))
			.catch(error => reject(error))
	});
}

const _delete = (url: string, body = {}, params = {}): Promise<object> => {
	return new Promise((resolve, reject) => {
		instance.delete(url, { data: body, params })
			.then(response => resolve(response.data))
			.catch(error => reject(error))
	});
}

const request = {
	get,
	post,
	put,
	patch,
	delete: _delete
}

export default request;