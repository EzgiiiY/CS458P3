import React, { Component } from 'react';
import { Card, Button,Input } from 'antd';
import 'antd/dist/antd.css';
import '../src/App.css';

import { geolocated } from "react-geolocated";
import Geocode from "react-geocode";

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
            latitude:0,
            longitude:0,
            city: '',
            loading:false,
        }; 
        this.locate=this.locate.bind(this);
        this.onChangeLat = this.onChangeLat.bind(this);
        this.onChangeLong = this.onChangeLong.bind(this);

    }

    parseDMS(input) {
        var parts = input.split(/[^\d\w\.]+/);
        var lat = this.convertDMSToDD(parts[0], parts[1], parts[2], parts[3]);
        var lng = this.convertDMSToDD(parts[4], parts[5], parts[6], parts[7]);
    }

    convertDMSToDD(degrees, minutes, seconds, direction) {
        var dd = Number(degrees) + Number(minutes)/60 + Number(seconds)/(60*60);
    
        if (direction == "S" || direction == "W") {
            dd = dd * -1;
        } // Don't do anything for N or E
        return dd;
    }

    async locate(){
        navigator.geolocation.getCurrentPosition(function(position) {
            console.log("Latitude is :", position.coords.latitude);
            console.log("Longitude is :", position.coords.longitude);
          });
    }

    onChangeLat(e){
        console.log(e.target.value)
        if(re.test(e.target.value))
            this.setState({validLat:true, latitude:e.target.value})
        else
            this.setState({validLat:false})
        console.log(this.state)
    }

    onChangeLong(e){
        console.log(e.target.value)
        if(re.test(e.target.value))
            this.setState({validLong:true, longitude:e.target.value})
        else
            this.setState({validLong:false})
        console.log(this.state)
    }

    render() {
        return(
        <Button onClick={this.locate}> locate 2</Button>);
    }
}
export default GeoLocator;

