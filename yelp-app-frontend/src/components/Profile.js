import axios from 'axios';
import React from 'react'
import { Link } from 'react-router-dom';
// import Restaurant from './Restaurant';

class Profile extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            restaurants: []
        }
    }

    componentDidMount() {
        console.log('hello')
        axios.get('http://localhost:5000/profile').then(res => {
            const favoriteRestaurants = res.data
            favoriteRestaurants.forEach(restaurant => {
                this.setState({restaurants: [...this.state.restaurants, restaurant]})
            });
        })
    }

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
                
                <h1>Welcome to profile page</h1>    
            </div>
            
        )
    }
}

export default Profile