/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useContext, useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useHistory, useLocation } from 'react-router-dom';

import { CatsContext } from '../../context/cats';
import CatItem from '../../components/CatItem';

const HomePage: FC = () => {
	const { state, dispatch } = useContext(CatsContext);
	const { getBreeds, getCats } = dispatch;
	const {
		breeds,
		loadingBreeds,
		cats,
		loadingCats,
		error,
		canLoadMore
	} = state;

	// Routes
	const history = useHistory();
	const search = useLocation().search;
	const queryBreed = new URLSearchParams(search).get('breed'); // get breed query param if any

	// Component's states
	const [selectedBreed, setSelectedBreed] = useState('');
	const [page, setPage] = useState(1);

	useEffect(() => {
		// Load breeds on load
		(async () => {
			if (breeds?.length === 0) {
				await getBreeds();
			}
		})();

		// Set default selected breed if any in query param
		setSelectedBreed(queryBreed ? queryBreed : '');

		// Load cats if their's a breed already existing
		if (queryBreed) {
			_getCats(queryBreed, page);
		}
	}, []);

	// Base function in getting cats
	const _getCats = (breed: string, _page: number) => {
		// Get cats
		(async () => await getCats(breed, _page, 10))();
	}

	// Change breed selection
	const _onChangeBreed = (e: any) => {
		const { target: { value } } = e;

		// Update breed query param
		const params = new URLSearchParams()
		if (value) {
			params.append('breed', value);
		} else {
			params.delete('breed');
		}
		history.push({ search: params.toString() });

		// Set selected breed
		setSelectedBreed(value);

		// Set page back to 1
		setPage(1);

		// Get cats
		_getCats(value, 1);
	}

	// On Load more
	const _onLoadMore = () => {
		// Add page by 1
		setPage(page + 1);

		// Get cats
		_getCats(selectedBreed, page + 1);
	}

	return (
		<Container className="py-5">
			{error && (
				<Alert variant="danger">
					Apologies but we could not load new cats for you at this time! Miau!
				</Alert>
			)}
			{/* Form */}
			<Form>
				<Form.Group controlId="exampleForm.SelectCustom">
					<Form.Control as="select" custom disabled={loadingBreeds} onChange={_onChangeBreed} value={selectedBreed}>
						<option value="">Select breed</option>
						{breeds?.map(o => (
							<option key={o.id} value={o.id}>{o.name}</option>
						))}
					</Form.Control>
				</Form.Group>
			</Form>

			{(!cats || cats.length === 0) && <p>No cats available</p>}
			{cats && cats.length > 0 && (
				<div className="row">
					{cats.map(cat => <CatItem key={cat.id} id={cat.id} url={cat.url} />)}
				</div>
			)}

			{(!selectedBreed || (selectedBreed && canLoadMore)) && (
				<Button variant="success" disabled={loadingBreeds || loadingCats || !canLoadMore || !selectedBreed} onClick={_onLoadMore}>
					Load More
				</Button>
			)}
		</Container>
	)
}

export default HomePage
