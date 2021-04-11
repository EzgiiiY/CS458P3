import React, { Component } from 'react';
import { Card, Button, Spin } from 'antd';
import 'antd/dist/antd.css';
import '../src/App.css';
import Header from './Header';


import DistanceCalculatorButton from "./CityLocatorButton";
import Geocode from "react-geocode";

// set Google Maps Geocoding API for purposes of quota management. Its optional but recommended.
Geocode.setApiKey("AIzaSyAHlJQ6EdfWT_UVPNpagMe7sS9kz1N-diU");

// set response language. Defaults to english.
Geocode.setLanguage("en");
Geocode.setLocationType("ROOFTOP");
const re = new RegExp("^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$");


class DistanceCalculator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            latitude: 0,
            longitude: 0,
            city: '',
            loading: false,
            validLat: true,
            validLong: true,
            distance:""
        };
        this.locateCity = this.locateCity.bind(this);
        this.autoCalc = this.autoCalc.bind(this);
        this.onChangeLat = this.onChangeLat.bind(this);
        this.onChangeLong = this.onChangeLong.bind(this);
        this.locate = this.locate.bind(this);
    }

    async locate(){
        this.setState({loading:true})
        navigator.geolocation.getCurrentPosition(position=> {
            console.log("Latitude is :", position.coords.latitude);
            console.log("Longitude is :", position.coords.longitude);
            this.setState({latitudeDevice:position.coords.latitude, longitudeDevice: position.coords.longitude})
            this.autoCalc();
        })
    }

    async locateCity() {
        this.setState({ loading: true })
        let r1 = 6378.137; // equatorial r km
        let r2 = 6356.752; //polar r km
        let firstTerm = Math.pow((Math.pow(r1,2) * Math.cos(this.state.latitude* Math.PI / 180.0)),2);
        let secondTerm = Math.pow((Math.pow(r2,2) * Math.sin(this.state.latitude* Math.PI / 180.0)),2);
        let thirdTerm = Math.pow( (r1 * Math.cos(this.state.latitude* Math.PI / 180.0)),2) + Math.pow( (r2 * Math.sin(this.state.latitude* Math.PI / 180.0)),2);
        let r = Math.sqrt((firstTerm + secondTerm)/thirdTerm)
        console.log("first: " + firstTerm);
        console.log("second:" + secondTerm);
        console.log("third:  " + thirdTerm);
        this.setState({loading:false, distance: r})
    }

    async autoCalc() {
       /* fetch("https://maps.googleapis.com/maps/api/elevation/json?locations=39.7391536,-104.9847034&key=AIzaSyAHlJQ6EdfWT_UVPNpagMe7sS9kz1N-diU",
        {
            mode:'no-cors',
            headers: {'Content-Type': 'application/json'}
        }
        ).then(function(response) {
            console.log(response)
            //console.log(result)
          });*/
        let r1 = 6378; // equatorial r km
        let r2 = 6357; //polar r km
        let firstTerm = Math.pow(Math.pow(r1,2) * Math.cos(this.state.latitude),2);
        let secondTerm = Math.pow(Math.pow(r2,2) * Math.sin(this.state.latitude),2);
        let thirdTerm = Math.pow( r1 * Math.cos(this.state.latitude),2) + Math.pow( r2 * Math.sin(this.state.latitude),2);
        let r = Math.sqrt((firstTerm + secondTerm)/thirdTerm)
          
        this.setState({loading:false, distance: r})
    }

    onChangeLat(e) {
        console.log(e.target.value)
        if (re.test(e.target.value))
            this.setState({ validLat: true, latitude: e.target.value })
        else
            this.setState({ validLat: false })
        console.log(this.state)
    }

    onChangeLong(e) {
        console.log(e.target.value)
        if (re.test(e.target.value))
            this.setState({ validLong: true, longitude: e.target.value })
        else
            this.setState({ validLong: false })
        console.log(this.state)
    }

    render() {
        return <div>

            <p>Please enter coordinates to calculate distance to earth center</p>
            <input
                className="latitude-c"
                type="text"
                name="latitude"
                placeholder="Latitude"
                style={{ backgroundColor: "#fff", borderRadius: "4px", borderColor: "#333", color: "#8c8c8c", marginRight: ".5rem" }}
                onChange={this.onChangeLat}
            >

            </input>
            {!this.state.validLat && <p className="error-lat-c" style={{ color: "orange", fontWeight: "bold" }}>*hello</p>}
            <input
                className="longitude-c"
                type="text"
                name="longitude"
                placeholder="Longitude"
                style={{ backgroundColor: "#fff", borderRadius: "4px", borderColor: "#333", color: "#8c8c8c", marginRight: ".5rem" }}
                onChange={this.onChangeLong}
            >

            </input>
            {!this.state.validLong && <p className="error-long-c">hello</p>}
            <DistanceCalculatorButton className="calculate-manual" buttonValue="Calculate Distance" buttonAction={this.locateCity}>

            </DistanceCalculatorButton>
            <DistanceCalculatorButton className="calculate-automatic" buttonValue="Automatically Calculate Distance" buttonAction={this.locate}>

            </DistanceCalculatorButton>
            {this.state.loading && <Spin style={{marginTop:"2%"}}size="large"></Spin>}

            <p className="result-text-distance">{`This location approx. ${this.state.distance} kms away from the center of the earth`}</p>
            
        </div>
    }
}
export default DistanceCalculator;
