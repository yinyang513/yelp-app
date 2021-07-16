import React from 'react'; 
import axios from 'axios';
// import L from 'leaflet'
// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

// import 'leaflet/dist/leaflet.css'
// import icon from 'leaflet/dist/images/marker-icon.png';
// import iconShadow from 'leaflet/dist/images/marker-shadow.png';

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
        const displayAddress = this.props.restaurant['res_address'].map(address => <p>{address}</p> );
        // const latitude = this.props.restaurant['res_coordinates'].latitude
        // const longitude = this.props.restaurant['res_coordinates'].longitude

        // let DefaultIcon = L.icon({
        // iconUrl: icon,
        // shadowUrl: iconShadow
        // });
        
        // L.Marker.prototype.options.icon = DefaultIcon;
        return(
            <div className='restaurant-container'>
                <h1>{this.props.restaurant['res_name']}</h1>
                {displayAddress}
                <p>{this.props.restaurant['res_phone']}</p>
                <button onClick={this.handleSubmit}>Favorite</button>

                {/* <MapContainer center={[latitude,longitude]} zoom={12} scrollWheelZoom={false} style={{ width: '50%', height: '300px' }}>
                    <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={[latitude,longitude]}>
                    <Popup>
                        Located Here!
                    </Popup>
                    </Marker>
                </MapContainer> */}
            </div>

            
            
        )
    }
}

export default Restaurant; 