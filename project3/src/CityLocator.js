import React, { Component } from 'react';
import { Card, Button,Input } from 'antd';
import 'antd/dist/antd.css';
import '../src/App.css';

import CityLocatorButton from "./CityLocatorButton";
import Geocode from "react-geocode";

// set Google Maps Geocoding API for purposes of quota management. Its optional but recommended.
Geocode.setApiKey("AIzaSyAHlJQ6EdfWT_UVPNpagMe7sS9kz1N-diU");

// set response language. Defaults to english.
Geocode.setLanguage("en");
Geocode.setLocationType("ROOFTOP");
const re = new RegExp("^([0-9]+([.][0-9]*)?|[.][0-9]+)$");


class CityLocator extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            latitude:0,
            longitude:0,
            city: '',
            loading:false,
            validLat:true,
            validLong:true,
        }; 
        this.locateCity=this.locateCity.bind(this);
        this.onChangeLat = this.onChangeLat.bind(this);
        this.onChangeLong = this.onChangeLong.bind(this);

    }
    //sonradan değişmeli
    async locateCity(){
        this.setState({loading:true})
        console.log("Locate city called.");
        await Geocode.fromLatLng(this.state.latitude.toString(), this.state.longitude.toString()).then(
            (response) => {
                let city;
              const address = response.results[0].address_components;
              for(let i = 0; i< address.length;i++)
                {
                    if(address[i].types.includes("administrative_area_level_1"))
                        city=address[i].long_name;
                }
              console.log("address: " + address+ " city: " + city );
              this.setState({city:city, loading:false})
            },
            (error) => {
              console.error(error);
            }
        );
       console.log(this.state)
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

    render(){
        return <div>
            <input
                className="latitude"
                type="text"
                name="latitude" 
                onChange={this.onChangeLat}
            >

            </input>
            {!this.state.validLat && <p>hello</p>}
            <input
                className="longitude"
                type="text"
                name="longitude" 
                onChange={this.onChangeLong}
            >
            
            </input>
            {!this.state.validLong && <p>hello</p>}
            <CityLocatorButton className="locate-city" buttonValue="locate" buttonAction={this.locateCity}>
                
            </CityLocatorButton>
        </div>
    }
}
export default CityLocator;
