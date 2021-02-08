import { FC } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './style.scss';

// Components
import Header from '../Header';

// Pages
import HomePage from '../../pages/HomePage';
import SingleCatPage from '../../pages/SingleCatPage';
import Page404 from '../../pages/Page404';

// Providers
import { CatsProvider } from '../../context/cats';
import { CatDetailsProvider } from '../../context/cat_details';

const App: FC = () => {
	return (
		<Router basename="/">
			<Header />
			<Switch>
				<Route path="/" exact>
					<CatsProvider>
						<HomePage />
					</CatsProvider>
				</Route>
				<Route path="/cat/:id" exact>
					<CatDetailsProvider>
						<SingleCatPage />
					</CatDetailsProvider>
				</Route>
				<Route path="*">
					<Page404 />
				</Route>
			</Switch>
		</Router>
	)
}

export default App;
