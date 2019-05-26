import React, { useReducer } from "react"

const Context = React.createContext()

const reducer = (state, action) => {
	switch (action.type) {
		case "NEXT_PAGE":
			return { ...state, page: state.page + 1 }
		case "SET_PREVIOUS_PAGE":
			return { ...state, previousPage: action.previousPage }
		case "APPEND_CURATIONS":
			return { ...state, curationList: state.curationList.concat(action.curations), isLoading: false }
		case "SET_IS_LOADING":
			return { ...state, isLoading: true }
		default:
			return state
	}
}

const ContextProvider = props => {
	const [state, dispatch] = useReducer(reducer, { page: 1, curationList: [], isLoading: false, previousPage: null })
	const contextApi = { state, dispatch }

	return (
		<Context.Provider value={contextApi}>
			{props.children}
		</Context.Provider>
	);
}

const ContextConsumer = Context.Consumer

export { Context, ContextProvider, ContextConsumer }