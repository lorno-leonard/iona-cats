import { FC } from 'react';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import './style.scss';

interface Props {
	id: string;
	url: string
}

const CatItem: FC<Props> = ({ id, url }) => {
	return (
		<div className="cat-card-item col-12 col-sm-6 col-md-3 p-0">
			<Link to={`cat/${id}`} className="cat-card-item__link">
				<Card bg="dark">
					<Card.Img src={url} className="cat-card-item__card-img" />
					<Card.ImgOverlay className="cat-card-item__card-img-overlay">
						<span>View Details</span>
					</Card.ImgOverlay>
				</Card>
			</Link>
		</div>
	)
}

export default CatItem
