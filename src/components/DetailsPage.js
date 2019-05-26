import React, { useState, useEffect } from "react"
import axios from "axios"
import { Container, Image, Item } from "semantic-ui-react"

const renderDetails = (movieDetails, posterUrl) => {
	return (
		<React.Fragment>
			<Item.Group>
				<Item>
					<Item.Image size="medium" src={posterUrl}/>
					<Item.Content>
						<Item.Header>{movieDetails.title} ({movieDetails.meta.releaseYear})</Item.Header>
						<Item.Meta>
							Director: {" "}
							{ 
								movieDetails.people
									.filter(person => person.role.toLowerCase() === "director" )
									.map(person => person.name)
									.join(", ")
							}
						</Item.Meta>
						<Item.Meta>
							Cast: {" "}
							{
								movieDetails.people
									.filter(person => person.role.toLowerCase() === "cast")
									.map(person => person.name)
									.join(", ")
							}
						</Item.Meta>
						<Item.Meta>
							Genre: { movieDetails.tags.map(tag => tag.label).join(", ") }
						</Item.Meta>
						<Item.Meta>Runtime: {movieDetails.running_time_friendly}</Item.Meta>
						<Item.Description>
							{movieDetails.description}
						</Item.Description>
					</Item.Content>
				</Item>
			</Item.Group>
		</React.Fragment>
	)
}

const DetailsPage = props => {
	const [movieDetails, setMovieDetails] = useState()
	const [backgroundUrl, setBackgroundUrl] = useState()
	const CancelToken = axios.CancelToken;
	const source = CancelToken.source();

	const { movieId, posterUrl } = props.location.state

	useEffect(()=> {
		const getDetails = async () => {
			try {
				const resp = await axios.get(`https://cdn-discover.hooq.tv/v1.2/discover/titles/${movieId}`, {
					cancelToken: source.token,
				})

				const backgroundImage = resp.data.data.images.filter(image => image.type.toLowerCase() === "background")[0]
				setBackgroundUrl(backgroundImage.url)
				setMovieDetails(resp.data)
			} catch(err) {
				console.log(err)
			}
		}
		getDetails()

		return () => {
			source.cancel('user left the details page')
		}
	},[])
	return (
		<React.Fragment>
			<Container>{ movieDetails ? renderDetails(movieDetails.data, posterUrl) : "" }</Container>
		</React.Fragment>
	)
}

export default DetailsPage