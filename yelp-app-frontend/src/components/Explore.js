import React from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import Users from './containers/Users';

class Explore extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            users: []
        }
    }
    componentDidMount() {
        axios.get('http://localhost:5000/explore').then(res => {
            const all_users = res.data.users
            all_users.forEach(user => {
                // console.log(user['username'])
                this.setState({users: [...this.state.users, user]})
            });
        })
    }

    renderItems = () => {
        return this.state.users.map(user => (
            <Users id={user['user_id']} user={user}/>
        ))
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
                <h1>Welcome to Explore</h1>
                {this.renderItems()}
            </div>
        )
    }
}

export default Explore