import React from 'react'; 
// import axios from 'axios';

class Users extends React.Component {

    render(){
        return(
            <div>
                <h3>{this.props.user['firstname']} {this.props.user['lastname']}</h3>
                <p>@{this.props.user['username']}</p>
            </div>
        )
    }
}

export default Users; 