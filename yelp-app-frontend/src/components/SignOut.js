import axios from 'axios';
import React from 'react'
import { Link } from 'react-router-dom';

class SignOut extends React.Component {

    componentDidMount () {
        localStorage.removeItem('usertoken')
        // console.log(localStorage.getItem('usertoken'))
        axios.post('http://localhost:5000/sign-out', {'token': ''})
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
                <Link to="/sign-out">
                    <button type="button">Sign Out</button>
                </Link>

                <h1>Welcome to Yelp</h1>
                
            </div>

            
        )
    }
}

export default SignOut