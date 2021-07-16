import React from 'react'; 
import L from 'leaflet'
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

import 'leaflet/dist/leaflet.css'
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

class Map extends React.Component {
  // constructor(props) {
  //   super(props);
  // } 

  render() {
    const displayAddress = this.props.restaurant['res_address'].map(address => <p>{address}</p> );
    const latitude = this.props.restaurant['res_coordinates'].latitude
    const longitude = this.props.restaurant['res_coordinates'].longitude

    let DefaultIcon = L.icon({
      iconUrl: icon,
      shadowUrl: iconShadow
    });
    
    L.Marker.prototype.options.icon = DefaultIcon;

    return (
      <div>
        <h1>{this.props.restaurant['res_name']}</h1>
        {displayAddress}
        <p>{this.props.restaurant['res_phone']}</p>
        <MapContainer center={[latitude,longitude]} zoom={12} scrollWheelZoom={false} style={{ width: '50%', height: '300px' }}>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[latitude,longitude]}>
            <Popup>
              {this.props.restaurant['res_name']}
            </Popup>
          </Marker>
        </MapContainer>
      </div>
      
    )
  }
}
  

export default Map; 