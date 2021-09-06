import React from 'react'; 
import { Link, Route } from 'react-router-dom';
import Profile from '../Profile';
// import axios from 'axios';

class Users extends React.Component {

    

    render(){
        // const username = this.props.user['username']
        return(
            <div>
                <h3>{this.props.user['firstname']} {this.props.user['lastname']}</h3>
                {/* <p>@{this.props.user['username']}</p> */}
                {/* <a href={`/profile` + `?username=` + `${this.props.user['username']}`} >@{this.props.user['username']}</a> */}
                {/* <Link to={"/profile?username="+ this.props.user['username']} render={(props) => <Profile {...props}/>}>@{this.props.user['username']}</Link> */}
                <Route path={`/profile/${this.props.user['username']}`} component={Profile}>@{this.props.user['username']}</Route>
                <Link to={`/profile/${this.props.user['username']}`}>@{this.props.user['username']}</Link>
                {/* <Link to={{
                    pathname: '/profile', 
                    state: this.props.user['username']
                }} >
                @kygkyg</Link> */}
            </div>
        )
    }
}

export default Users; 