import React from 'react'; 
import axios from 'axios';

class Restaurant extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            favorite: false
        }
    }

    handleSubmit = () => {
        this.setState({favorite: true})
        const favorited = {
            favorite: this.props.restaurant,
            // favorite: this.state.favorite
        }
        axios.post('http://localhost:5000/favorites', favorited)
    }

    render(){
        const displayAddress = this.props.restaurant[2].map(address => <p>{address}</p> );
        return(
            <div className='restaurant-container'>
                <h1>{this.props.restaurant[1]}</h1>
                {displayAddress}
                <p>{this.props.restaurant[3]}</p>
                <button onClick={this.handleSubmit}>Favorite</button>
            </div>
            
        )
    }
}

export default Restaurant; 