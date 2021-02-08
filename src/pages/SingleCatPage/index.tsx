/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useContext, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link, useParams } from 'react-router-dom';

import { CatDetailsContext } from '../../context/cat_details';
import './style.scss';

interface Params {
	id: string
}

const SingleCatPage: FC = () => {
	const { state, dispatch } = useContext(CatDetailsContext);
	const { getCatById } = dispatch;
	const {
		cat,
		loading,
		error
	} = state;
	let { id } = useParams<Params>();

	useEffect(() => {
		(async () => await getCatById(id))();
	}, []);

	return (
		<Container className="single-cat-page py-5">
			{error && (
				<Alert variant="danger">
					Apologies but we could not load new cats for you at this time! Miau!
				</Alert>
			)}
			{loading && <p>Loading...</p>}
			{cat && !loading && (
				<Card bg="dark">
					<Card.Header>
						<Button variant="secondary" as={Link} to={`/?breed=${cat.breeds[0].id}`}>Back</Button>
					</Card.Header>
					<Card.Img src={cat.url} />
					<Card.ImgOverlay className="single-cat-page__card-img-overlay">
						<div className="single-cat-page__card-img-overlay__content">
							<h4>{cat.breeds[0].name}</h4>
							<h5>🌎 {cat.breeds[0].origin}</h5>
							<h5>😇 {cat.breeds[0].temperament}</h5>
							<Card.Text>{cat.breeds[0].description}</Card.Text>
						</div>
					</Card.ImgOverlay>
				</Card>
			)}
		</Container>
	)
}

export default SingleCatPage
