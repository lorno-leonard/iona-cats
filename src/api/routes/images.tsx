import request from '../request';

interface CatsProps {
	breed: string;
	page: number;
	limit: number;
}

const getCats = ({ breed, page, limit }: CatsProps) => request.get('images/search', { breed_id: breed, page, limit });

const images = {
	getCats
}

export default images;