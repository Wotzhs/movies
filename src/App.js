import React from "react"
import { ContextProvider } from "./Context"
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom"
import Navbar from "./components/Navbar"
import ListingPage from "./components/ListingPage"
import DetailsPage from "./components/DetailsPage"

const App = () => {
	return (
		<ContextProvider>
			<BrowserRouter>
				<Navbar></Navbar>
				<Switch>
					<Route exact path="/" render={ ()=> <Redirect to="/movies" /> } />
					<Route exact path="/movies" component={ListingPage}/>
					<Route exact path="/movies/:slug" component={DetailsPage}/>
				</Switch>
			</BrowserRouter>
		</ContextProvider>
	)
}

export default App