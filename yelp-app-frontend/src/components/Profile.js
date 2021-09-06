import axios from 'axios';
import React from 'react'
import { Link } from 'react-router-dom';
// import Restaurant from './Restaurant';
import Map from './containers/Map'
// import L from 'leaflet'

class Profile extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            restaurants: []
        }
    }

    componentDidMount() {
        // console.log(localStorage.getItem('usertoken'))
        console.log(this.state.username)
        // axios.post('http://localhost:5000/set-user', {'token': localStorage.getItem('usertoken')})
        axios.post('http://localhost:5000/set-user', {'user': localStorage.getItem('user_id')})
        // console.log('got token')

        axios.get('http://localhost:5000/profile').then(res => {
            const favoriteRestaurants = res.data.restaurants
            // console.log(favoriteRestaurants)
            favoriteRestaurants.forEach(restaurant => {
                // console.log(restaurant[4].latitude)
                // console.log(restaurant['res_address'])
                this.setState({restaurants: [...this.state.restaurants, restaurant]})
            });
        })
    }

    renderItems = () => {
        return this.state.restaurants.map(restaurant => (
            <Map id={restaurant['res_id']} restaurant={restaurant}/>
        ))
    }

    // renderMap = () => {
    //     return this.state.restaurants.map(restaurant => (
    //         <Map id={restaurant[0]} restaurant={restaurant[4]}/>
    //     ))
    // }

    render(){
        return(
            <div>
                <Link to="/home">
                    <button type="button">Home</button>
                </Link>
                <Link to="/profile">
                    <button type="button">Profile</button>
                </Link>
                <Link to="/sign-in">
                    <button type="button">Sign In</button>
                </Link>
                <Link to="/register">
                    <button type="button">Register</button>
                </Link>
                <Link to="/restaurants">
                    <button type="button">Restaurants</button>
                </Link>
                <Link to="/favorites">
                    <button type="button">Favorites</button>
                </Link>
                <Link to="/explore">
                    <button type="button">Explore</button>
                </Link>
                <Link to="/sign-out">
                    <button type="button">Sign Out</button>
                </Link>
                
                <h1>Welcome to profile page</h1>   
                <h2>Favorite Restaurants</h2>
                {this.renderItems()} 
                {/* {this.renderMap()} */}
            </div>
            
        )
    }
}

export default Profile