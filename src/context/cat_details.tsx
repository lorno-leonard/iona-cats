import { useReducer, FC, ReactNode, createContext } from 'react';
import API from '../api';

enum ActionTypes {
	GET_CAT_REQUEST,
	GET_CAT_ERROR,
	GET_CAT_SUCCESS
}

interface StateProps {
	cat?: any;
	loading?: boolean;
	error?: boolean
}

interface ActionProps {
	type: ActionTypes;
	payload?: StateProps;
}

interface ContextProps {
	state: StateProps;
	dispatch: {
		getCatById: (id: string) => void;
	}
}

interface ProviderProps {
	children: ReactNode;
}

// Reducer
const reducer = (state: StateProps, action: ActionProps): StateProps => {
	switch (action.type) {
		case ActionTypes.GET_CAT_REQUEST:
			return {
				...state,
				loading: true,
				error: false
			}
		case ActionTypes.GET_CAT_ERROR:
			return {
				...state,
				loading: false,
				error: true
			}
		case ActionTypes.GET_CAT_SUCCESS:
			return {
				...state,
				loading: false,
				...(action.payload && action.payload.cat && { cat: action.payload.cat })
			}
		default:
			return state;
	}
}

const initialState: StateProps = {
	cat: null,
	loading: false,
	error: false
}

// Create context
export const CatDetailsContext = createContext({} as ContextProps);

// Provider component
export const CatDetailsProvider: FC<ProviderProps> = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialState);

	// Get cat
	const getCatById = async (id: string) => {
		dispatch({
			type: ActionTypes.GET_CAT_REQUEST
		});

		let response;
		try {
			response = await API.images.getCatById(id);
		} catch (error) {
			console.log('error', error);

			dispatch({
				type: ActionTypes.GET_CAT_ERROR
			});
			return;
		}

		dispatch({
			type: ActionTypes.GET_CAT_SUCCESS,
			payload: {
				cat: response
			}
		});
	}


	return (
		<CatDetailsContext.Provider value={{ state, dispatch: { getCatById } }}>
			{children}
		</CatDetailsContext.Provider>
	);
}