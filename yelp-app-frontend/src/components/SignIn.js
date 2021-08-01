import React from 'react'
import '../App.css'
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
// import Register from './Register';
// import Profile from './Profile';

class Sign_in extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: '',
            redirect: ''
        }
    }

    handleChangeUsername = (event) => {
        this.setState({username: event.target.value})
    }

    handleChangePassword = (event) => {
        this.setState({password: event.target.value})
    }

    handleSubmit = (event) => {
        event.preventDefault()
        
        this.setState({username: "", password: ""})
        // console.log('asdfjasdf')
        const credentials = {
            username: this.state.username,
            password: this.state.password
        }
        axios.post('http://localhost:5000/sign-in', credentials).then(res => {
            // console.log(res.data)
            if (res.data === 'make account') {
                this.setState({redirect: 'make account'})
            }
            else if (res.data ===' try again'){
                this.setState({redirect: 'try again'})
            }
            else {
                // console.log('sup')
                this.setState({redirect: 'True'})
                console.log(res.data)
                localStorage.setItem('usertoken', res.data['access_token'])
                localStorage.setItem('user_id', res.data['user_id'])
                console.log(localStorage.getItem('usertoken'))
                console.log(localStorage.getItem('user_id'))
            }
        })

        axios.post('http://localhost:5000/set-user', {'user': localStorage.getItem('user_id')})
        // console.log('here')
    }

    renderRedirect = () => {
        if (this.state.redirect === 'make account') {
            return <Redirect to='/register' />
        }
        else if (this.state.redirect === 'True') {
            return <Redirect to='/profile' />
        }
        else if (this.state.redirect === 'try again') {
            // event.preventDefault()
            return <Redirect to='/sign-in' />
        }
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
                
                <h1>Sign in!</h1>
                {this.renderRedirect()}
                <form>
                <label>
                    Username:
                    <input type="text" name="username" value={this.state.username} onChange={this.handleChangeUsername}/><br></br>
                    Password:
                    <input type="text" name="password" value={this.state.password} onChange={this.handleChangePassword}/><br></br>
                </label>
                <button onClick={this.handleSubmit}>Submit</button>
                </form>
            </div>
        )
    }
}

export default Sign_in