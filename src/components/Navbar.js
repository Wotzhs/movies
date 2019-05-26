import React from "react"
import { Menu } from "semantic-ui-react"
import "./Navbar.scss"

const Navbar = () => {
	return (
		<Menu borderless inverted className="nav-square-border">
			<Menu.Item>
				<span className="nav-title">Movies</span>
			</Menu.Item>
		</Menu>
	)
}

export default Navbar