import React from 'react'
import '../App.css'
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
// import Home from './Home'

class Register extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            first_name: '',
            last_name: '',
            email: '',
            birthday: '',
            hometown: '',
            username: '',
            password: '',
            redirect: ''
        }
    }
    handleChangeFirstName = (event) => {
        this.setState({first_name: event.target.value})
    }

    handleChangeLastName = (event) => {
        this.setState({last_name: event.target.value})
    }

    handleChangeEmail = (event) => {
        this.setState({email: event.target.value})
    }

    handleChangeBirthday = (event) => {
        this.setState({birthday: event.target.value})
    }

    handleChangeHometown = (event) => {
        this.setState({hometown: event.target.value})
    }

    handleChangeUsername = (event) => {
        this.setState({username: event.target.value})
    }

    handleChangePassword = (event) => {
        this.setState({password: event.target.value})
    }

    handleSubmit = (event) => {
        event.preventDefault()
        this.setState({
            first_name: "",
            last_name: "",
            email: "",
            birthday: "",
            hometown: "",
            username: "", 
            password: ""
        })

        const user_info = {
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            email: this.state.email,
            birthday: this.state.birthday,
            hometown: this.state.hometown,
            username: this.state.username,
            password: this.state.password
        }
        axios.post('http://localhost:5000/register', user_info).then(res => {
            console.log(res.data);
            if (res.data === 'already registered') {
                // event.preventDefault()
                this.setState({redirect: 'already registered'})
            }
            else {
                this.setState({redirect: 'register'})
            }
        })
        console.log('here')
    }

    renderRedirect = () => {
        if (this.state.redirect === 'already registered') {
            return <Redirect to='/sign-in' />
        }
        else if (this.state.redirect === 'register') {
            return <Redirect to='/' />
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

                <h1>Register</h1>
                {this.renderRedirect()}
                <form>
                <label>
                    First Name:
                    <input type="text" name="first-name" value={this.state.first_name} onChange={this.handleChangeFirstName}/><br></br>
                    Last Name:
                    <input type="text" name="last-name" value={this.state.last_name} onChange={this.handleChangeLastName}/><br></br>
                    Email:
                    <input type="text" name="email" value={this.state.email} onChange={this.handleChangeEmail}/><br></br>
                    Birthday:
                    <input type="text" name="birthday" value={this.state.birthday} onChange={this.handleChangeBirthday}/><br></br>
                    Hometown:
                    <input type="text" name="hometown" value={this.state.hometown} onChange={this.handleChangeHometown}/><br></br>
                    Username:
                    <input type="text" name="username" value={this.state.username} onChange={this.handleChangeUsername}/><br></br>
                    Password:
                    <input type="text" name="password" value={this.state.password} onChange={this.handleChangePassword} /><br></br>
                </label>
                <button onClick={this.handleSubmit}>Submit</button>
                </form>
            </div>
        )
    }
}

export default Register