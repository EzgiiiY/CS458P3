import React, { Component } from 'react';
import { Card, Button } from 'antd';
import 'antd/dist/antd.css';
import '../src/App.css';

import CityLocatorButton from "./CityLocatorButton";
import Geocode from "react-geocode";

// set Google Maps Geocoding API for purposes of quota management. Its optional but recommended.
Geocode.setApiKey("AIzaSyAHlJQ6EdfWT_UVPNpagMe7sS9kz1N-diU");

// set response language. Defaults to english.
Geocode.setLanguage("en");
Geocode.setLocationType("ROOFTOP");



class CityLocator extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            latitude:0,
            longitude:0,
            city: '',
        }; 
        this.locateCity=this.locateCity.bind(this);
    }
    //sonradan değişmeli
    locateCity(){
        console.log("Locate city called.");
        Geocode.fromLatLng("39.8754", "39.8754").then(
            (response) => {
                let city;
              const address = response.results[0].address_components;
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
        );
       
    }
    render(){
        return <div>
            <input
                className="latitude"
                type="text"
                name="latitude" 
                onChange={(event)=>this.setState({latitude:event.target.value})}
            >

            </input>
            <input
                className="longitude"
                type="text"
                name="longitude" 
                onChange={(event)=>this.setState({longitude:event.target.value})}
            >

            </input>
                
            <CityLocatorButton className="locate-city" buttonValue="locate" buttonAction={this.locateCity}>
                
            </CityLocatorButton>
        </div>
    }
}
export default CityLocator;
