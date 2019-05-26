import React, { useState, useEffect, useContext } from "react"
import axios from "axios"
import slugify from "slugify"
import { Context } from "../Context"
import { Container, Placeholder, Segment, Image, Grid } from "semantic-ui-react"
import { Link } from "react-router-dom"

const RenderLoading = () => {
	return (
		<React.Fragment>
			<Segment>
				<Placeholder style={{ height: 150, width: 150 }}>
	  				<Placeholder.Image />
	  			</Placeholder>
	  			<Placeholder fluid>
	  				<Placeholder.Paragraph>
						<Placeholder.Line />
						<Placeholder.Line />
						<Placeholder.Line />
	  				</Placeholder.Paragraph>
	  			</Placeholder>
			</Segment>
			<Segment>
				<Placeholder style={{ height: 150, width: 150 }}>
	  				<Placeholder.Image />
	  			</Placeholder>
	  			<Placeholder fluid>
	  				<Placeholder.Paragraph>
						<Placeholder.Line />
						<Placeholder.Line />
						<Placeholder.Line />
	  				</Placeholder.Paragraph>
	  			</Placeholder>
			</Segment>
		</React.Fragment>
	)
}

const RenderMovies = movies => {
	return (
		<Grid container doubling columns={6}>
			{
				movies.map(movie => {
					return movie.images.map(image => {
						if (image.type.toLowerCase() === "poster") {
							return (
								<Grid.Column key={image.id}>
									<Link to={{
										pathname: `/movies/${slugify(movie.title)}`,
										state: {
											movieId: movie.id,
											posterUrl: image.url,
										}
									}}>
										<Image src={image.url} size="small" wrapped alt={movie.title}/>
									</Link>
									<p>{movie.title}</p>
								</Grid.Column>
							)
						}
					})
				})
			}
		</Grid>
	)
}

const RenderCurations = curations => {
	return curations.map(curation => {
		return (
			<Segment key={curation.row_id}>
				<h2>{curation.row_name}</h2>
				{ RenderMovies(curation.data)}
			</Segment>
		)	
	})
}

const ListingPage = () => {
	const { state, dispatch } = useContext(Context)

	const handleScroll = e => {
		let scrollY = e.target.body.scrollTop
		const maxScroll = e.target.body.scrollHeight - e.target.body.clientHeight
		const pxOffsetToNextPage = 1200
		
		if (scrollY > maxScroll - pxOffsetToNextPage && !state.isLoading) {
			dispatch({ type: "NEXT_PAGE" })
		}
	}

	useEffect(() => {
		window.addEventListener("scroll", handleScroll)
	}, [])

	useEffect(() => {
		if (!state.isLoading && state.page != state.previousPage ) {
			dispatch({ type: "SET_IS_LOADING" })

			const loadCuration = async () => {
				try {
					const resp = await axios.get(`https://cdn-discover.hooq.tv/v1.2/discover/feed?region=IN&page=${state.page}&perPage=20`)
					
					if (state.page >= resp.data.pagination.totalPages) {
						window.removeEventListener("scroll", handleScroll)
					}

					const filtered = resp.data.data.filter(movie=> {
						return movie.type === "Multi-Title-Manual-Curation"
					})
					
					dispatch({ type: "APPEND_CURATIONS", curations: filtered })	

				} catch(err) {
					console.log(err)
				}
			}
			loadCuration()
		}
	
		return () => {
			window.removeEventListener("scroll", handleScroll)
			dispatch({ type: "SET_PREVIOUS_PAGE", previousPage: state.page })
		}
	}, [state.page])

	return (
  		<Container>
  			{ state.curationList ? RenderCurations(state.curationList) : <RenderLoading/> }
  		</Container>
  	)
}

export default ListingPage