import React from 'react'
import { Link } from 'react-router-dom';

class Home extends React.Component {
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

                <h1>Welcome to Yelp</h1>
                
            </div>

            
        )
    }
}

export default Home