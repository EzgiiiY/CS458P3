import React, { Component } from 'react';
import { Card, Button,Input } from 'antd';
import 'antd/dist/antd.css';
import '../src/App.css';

import Geocode from "react-geocode";
import GeoLocatorButton from "./GeoLocatorButton";
// set Google Maps Geocoding API for purposes of quota management. Its optional but recommended.
Geocode.setApiKey("AIzaSyAHlJQ6EdfWT_UVPNpagMe7sS9kz1N-diU");

// set response language. Defaults to english.
Geocode.setLanguage("en");
Geocode.setLocationType("ROOFTOP");
const re = new RegExp("^([0-9]+([.][0-9]*)?|[.][0-9]+)$");


class GeoLocator extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            latitudeDevice:0,
            longitudeDevice:0,
            latitudeCity:0,
            longitudeCity:0,
            city: '',
            loading:false,
        }; 
        this.locate=this.locate.bind(this);
        this.locateCity=this.locateCity.bind(this);
        this.distance = this.distance.bind(this);

    }

    distance(lat1, lon1, lat2, lon2, unit) {
        var radlat1 = Math.PI * lat1/180
        var radlat2 = Math.PI * lat2/180
        var theta = lon1-lon2
        var radtheta = Math.PI * theta/180
        var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        dist = Math.acos(dist)
        dist = dist * 180/Math.PI
        dist = dist * 60 * 1.1515
        if (unit=="K") { dist = dist * 1.609344 }
        if (unit=="M") { dist = dist * 0.8684 }
        this.setState({loading:false})
        console.log(dist)
    }

    async locate(){
        navigator.geolocation.getCurrentPosition(position=> {
            console.log("Latitude is :", position.coords.latitude);
            console.log("Longitude is :", position.coords.longitude);
            this.setState({latitudeDevice:position.coords.latitude, longitudeDevice: position.coords.longitude})
            this.locateCity();
        })
        
        
    }

    async locateCity(){
        this.setState({loading:true})
        console.log("Locate city called.");
        console.log(this.state);
        await Geocode.fromLatLng(this.state.latitudeDevice.toString(), this.state.longitudeDevice.toString()).then(
            (response) => {
                let city;
              const address = response.results[0].address_components;
              console.log(response.results)
              for(let i = 0; i< address.length;i++)
                {
                    if(address[i].types.includes("administrative_area_level_1"))
                        city=address[i].long_name;
                }
              console.log("address: " + address+ " city: " + city );
              this.setState({city:city})
            },
            (error) => {
              console.error(error);
            }
        )
        await Geocode.fromAddress(this.state.city).then(
            (response) => {
              const address = response.results;
              console.log(response.results)
              
              this.setState({latitudeCity: response.results[0].geometry.location.lat, longitudeCity: response.results[0].geometry.location.lng})
            },
            (error) => {
              console.error(error);
            }
        ).then(()=>this.distance(this.state.latitudeDevice, this.state.longitudeDevice, this.state.latitudeCity,this.state.longitudeCity, "K"))
    }

    render() {
        return(
            <div>
                <p>Click button to see your distance to the nearest city center </p>
                <GeoLocatorButton className="geo-locate" buttonValue="See Distance" buttonAction={this.locate}>
            
                </GeoLocatorButton>
            </div>       
        );
    }
}
export default GeoLocator;

