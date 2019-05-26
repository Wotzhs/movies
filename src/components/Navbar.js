import React from "react"
import { Menu } from "semantic-ui-react"
import { Link } from "react-router-dom"
import "./Navbar.scss"

const Navbar = () => {
	return (
		<Menu borderless inverted className="nav-square-border">
			<Link to="/movies">
				<Menu.Item>
					<span className="nav-title">Movies</span>
				</Menu.Item>
			</Link>
		</Menu>
	)
}

export default Navbar