import { useReducer, FC, ReactNode, createContext } from 'react';
import API from '../api';

enum ActionTypes {
	GET_BREEDS_REQUEST,
	GET_BREEDS_ERROR,
	GET_BREEDS_SUCCESS,
	GET_CATS_REQUEST,
	GET_CATS_ERROR,
	GET_CATS_SUCCESS
}

interface Breed {
	id: string;
	name: string;
}

interface Cat {
	id: string;
	url: string;
}

interface StateProps {
	breeds?: Breed[];
	loadingBreeds?: boolean;

	cats?: Cat[];
	loadingCats?: boolean;
	canLoadMore?: boolean;

	error?: boolean
}

interface ActionProps {
	type: ActionTypes;
	payload?: StateProps;
}

interface ContextProps {
	state: StateProps;
	dispatch: {
		getBreeds: () => void;
		getCats: (breed: string, page: number, limit: number) => void;
	}
}

interface ProviderProps {
	children: ReactNode;
}

// Reducer
const reducer = (state: StateProps, action: ActionProps): StateProps => {
	switch (action.type) {
		case ActionTypes.GET_BREEDS_REQUEST:
			return {
				...state,
				loadingBreeds: true,
				error: false
			}
		case ActionTypes.GET_BREEDS_ERROR:
			return {
				...state,
				loadingBreeds: false,
				error: true
			}
		case ActionTypes.GET_BREEDS_SUCCESS:
			return {
				...state,
				loadingBreeds: false,
				...(action.payload && action.payload.breeds && { breeds: action.payload.breeds })
			}
		case ActionTypes.GET_CATS_REQUEST:
			return {
				...state,
				loadingCats: true,
				error: false,
				...(action.payload && action.payload.cats && { cats: action.payload.cats }),
				...(action.payload && action.payload.canLoadMore && { canLoadMore: action.payload.canLoadMore })
			}
		case ActionTypes.GET_CATS_ERROR:
			return {
				...state,
				loadingCats: false,
				error: true
			}
		case ActionTypes.GET_CATS_SUCCESS:
			return {
				...state,
				loadingCats: false,
				...(action.payload && action.payload.cats && { cats: action.payload.cats }),
				...(action.payload && typeof action.payload.canLoadMore === 'boolean' && { canLoadMore: action.payload.canLoadMore })
			}
		default:
			return state;
	}
}

const initialState: StateProps = {
	breeds: [],
	loadingBreeds: false,
	cats: [],
	loadingCats: false,
	error: false,
	canLoadMore: false
}

// Create context
export const CatsContext = createContext({} as ContextProps);

// Provider component
export const CatsProvider: FC<ProviderProps> = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialState);

	// Get breeds
	const getBreeds = async () => {
		dispatch({
			type: ActionTypes.GET_BREEDS_REQUEST
		});

		let response;
		try {
			response = await API.breeds.getBreeds();
		} catch (error) {
			console.log('error', error);

			dispatch({
				type: ActionTypes.GET_BREEDS_ERROR
			});
			return;
		}

		if (response instanceof Array) {
			dispatch({
				type: ActionTypes.GET_BREEDS_SUCCESS,
				payload: {
					breeds: response
				}
			});
		} else {
			dispatch({
				type: ActionTypes.GET_BREEDS_ERROR
			});
		}
	}

	// Get cats
	const getCats = async (breed: string, page: number, limit: number) => {
		console.log({ breed, page });
		dispatch({
			type: ActionTypes.GET_CATS_REQUEST,
			...(page === 1 && { payload: { cats: [], canLoadMore: false } })
		});

		if (breed === '') {
			dispatch({
				type: ActionTypes.GET_CATS_SUCCESS,
				payload: {
					cats: []
				}
			});
			return;
		}

		let response;
		try {
			response = await API.images.getCats({ breed, page, limit });
		} catch (error) {
			console.log('error', error);

			dispatch({
				type: ActionTypes.GET_CATS_ERROR
			});
			return;
		}

		if (response instanceof Array) {
			let prevCats: Cat[];
			let newCats: Cat[];
			if (page === 1) {
				prevCats = [];
				newCats = response;
			} else {
				prevCats = state.cats ? state.cats : [];

				// Add only non-exisint cats in the array
				newCats = [...prevCats, ...response.filter(f => !prevCats.some(s => s.id === f.id))]
			}
			console.log({ prevCats, newCats });
			dispatch({
				type: ActionTypes.GET_CATS_SUCCESS,
				payload: {
					cats: newCats,
					canLoadMore: prevCats.length !== newCats.length
				}
			});
		} else {
			dispatch({
				type: ActionTypes.GET_CATS_ERROR
			});
		}
	}

	return (
		<CatsContext.Provider value={{ state, dispatch: { getBreeds, getCats } }}>
			{children}
		</CatsContext.Provider>
	);
}