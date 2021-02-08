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
		<div className="col-12 col-sm-6 col-md-3">
			<Card bg="dark">
				<Card.Img variant="top" src={url} />
				<Card.Body>
					<Card.Title>
						<Link to={`cat/${id}`}>{id}</Link>
					</Card.Title>
				</Card.Body>
			</Card>
		</div>
	)
}

export default CatItem
