import request from '../request';

const getBreeds = () => request.get('breeds');

const breeds = {
	getBreeds
}

export default breeds;