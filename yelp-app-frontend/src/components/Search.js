import React from 'react'
import Restaurant from './containers/Restaurant'
import '../App.css'
import { Link } from 'react-router-dom';
import axios from 'axios';

class Search extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            restaurant: '',
            location: '',
            radius: '',
            categories: '',
            sort_by: '',
            price: '',
            open_now: '',
            restaurants: []
        }
    }

    handleChangeRestaurant = (event) => {
        this.setState({restaurant: event.target.value})
    }

    handleChangeLocation = (event) => {
        this.setState({location: event.target.value})
    }

    handleChangeRadius = (event) => {
        this.setState({radius: event.target.value})
    }

    handleChangeCategories = (event) => {
        this.setState({categories: event.target.value})
    }

    handleChangeSortBy = (event) => {
        this.setState({sort_by: event.target.value})
    }

    handleChangePrice = (event) => {
        this.setState({price: event.target.value})
    }

    handleChangeOpenNow = (event) => {
        this.setState({open_now: event.target.value})
    }

    // componentDidMount() {
    //     // console.log(this.state.restaurants)
    //     axios.get('http://localhost:5000/restaurants').then(res => {
    //         // console.log(res.data.businesses)
    //         const retrievedRestaurants = this.state.restaurants
    //         retrievedRestaurants.forEach(restaurant => {
                
    //             this.setState({restaurants: [...this.state.restaurants, restaurant.name]})
    //         })
    //     })
    // }

    handleSubmit = (event) => {
        event.preventDefault()
        this.setState({
            restaurant: '',
            location: '',
            radius: '',
            categories: '',
            sort_by: '',
            price: '',
            open_now: '',
            restaurants: []
        })

        const restaurant = {
            restaurant: this.state.restaurant,
            location: this.state.location,
            radius: this.state.radius,
            categories: this.state.categories,
            sort_by: this.state.sort_by,
            price: this.state.price,
            open_now: this.state.open_now
        }

        // axios.post('http://localhost:5000/set-user', {'token': localStorage.getItem('usertoken')})
        axios.post('http://localhost:5000/set-user', {'user': localStorage.getItem('user_id')})
        console.log(localStorage.getItem('user_id'))
        axios.post('http://localhost:5000/restaurants', restaurant).then(res => {
            // console.log(res.data.businesses);
            // this.setState({restaurants: [res.data.businesses]})
            const retrievedRestaurants = res.data.businesses
            retrievedRestaurants.forEach(restaurant => {
                // console.log(restaurant.location.display_address)
                this.setState({restaurants: [...this.state.restaurants, {
                    'res_id': restaurant.id, 
                    'res_name': restaurant.name, 
                    'res_address': restaurant.location.display_address, 
                    'res_phone': restaurant.display_phone, 
                    'res_coordinates': restaurant.coordinates
                }]})
            })
            // console.log(this.state.restaurants)
        })
        // console.log('here')
    }

    renderItems = () => {
        // console.log(this.state.restaurants)
        return this.state.restaurants.map(restaurant => (
            // console.log(restaurant)
            <Restaurant key={restaurant['res_id']} restaurant={restaurant}/>
            // console.log('sup')
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
                
                <h1>Search Restaurants:</h1>
                <form id="restaurant_search" action="restaurants" method="post">
                <label>
                    Restaurant:
                    <input type="text" name="restaurant" value={this.state.restaurant} onChange={this.handleChangeRestaurant}/><br></br>
                    *Location:
                    <input type="text" name="location" value={this.state.location} onChange={this.handleChangeLocation}/><br></br>
                    Radius:
                    <input type="text" name="radius" value={this.state.radius} onChange={this.handleChangeRadius}/><br></br>
                    Categories:
                    <input type="text" name="categories" value={this.state.categories} onChange={this.handleChangeCategories}/><br></br>
                    *Sort By:
                    <select name="sort_by" value={this.state.sort_by} onChange={this.handleChangeSortBy}>
                        <option>Select One</option>
                        <option value="best_match">Best Match</option>
                        <option value="rating">Rating</option>
                        <option value="review_count">Review Count</option>
                        <option value="distance">Distance</option>
                    </select><br></br>
                    *Price:
                    <select name="price" value={this.state.price} onChange={this.handleChangePrice}>
                        <option>Select One</option>
                        <option value="1">$</option>
                        <option value="2">$$</option>
                        <option value="3">$$$</option>
                        <option value="4">$$$$</option>
                    </select><br></br>
                    Open Now:
                    <select name="open_now" value={this.state.open_now} onChange={this.handleChangeOpenNow}>
                        <option>Select One</option>
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                    </select><br></br>
                </label>
                <button onClick={this.handleSubmit}>Submit</button><br></br>
                
                </form>
                {/* {JSON.stringify(this.state.restaurants)} */}
                {this.renderItems()}
            </div>
        )
    }
}

export default Search