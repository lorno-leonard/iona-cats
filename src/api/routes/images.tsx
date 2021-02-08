import request from '../request';

interface CatsProps {
	breed: string;
	page: number;
	limit: number;
}

const getCats = ({ breed, page, limit }: CatsProps) => request.get('images/search', { breed_id: breed, page, limit });
const getCatById = (id: string) => request.get(`images/${id}`);

const images = {
	getCats,
	getCatById
}

export default images;