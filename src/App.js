import React from "react"
import { ContextProvider } from "./Context"
import { BrowserRouter, Switch, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import ListingPage from "./components/ListingPage"

const App = () => {
	return (
		<ContextProvider>
			<BrowserRouter>
				<Navbar></Navbar>
				<Switch>
					<Route exact path="/" component={ListingPage}/>
				</Switch>
			</BrowserRouter>
		</ContextProvider>
	)
}

export default App