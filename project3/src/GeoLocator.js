import React, { Component } from 'react';
import { Card, Button,Spin } from 'antd';
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
            latitudeDevice:"",
            longitudeDevice:"",
            latitudeCity:"",
            longitudeCity:"",
            city: '',
            loading:false,
            distance:"",
        }; 
        this.locate=this.locate.bind(this);
        this.locateCity=this.locateCity.bind(this);
        this.distance = this.distance.bind(this);

    }

    distance(lat1, lon1, lat2, lon2, unit) {
        console.log("distance called")

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
        let dist1= Number( dist.toPrecision(3) )
        this.setState({loading:false, distance:dist1})
    }

    async locate(){
        this.setState({loading:true})
        navigator.geolocation.getCurrentPosition(position=> {
            console.log("Latitude is :", position.coords.latitude);
            console.log("Longitude is :", position.coords.longitude);
            
            this.setState({latitudeDevice:position.coords.latitude, longitudeDevice: position.coords.longitude})
            console.log("locate")
            this.locateCity();
        })
    }

    async locateCity(){
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
        ).then(()=>
            this.distance(this.state.latitudeDevice, this.state.longitudeDevice, this.state.latitudeCity,this.state.longitudeCity, "K"))
    }

    render() {

        let dist1= Number( Number(this.state.longitudeDevice).toPrecision(3) );
        let dist2= Number( Number(this.state.latitudeDevice).toPrecision(3) )
        let dist3= Number( Number(this.state.longitudeCity).toPrecision(3) )
        let dist4= Number( Number(this.state.latitudeCity).toPrecision(3) )
        return(
            <div>
                <p>Click button to see your distance to the nearest city center </p>
                <GeoLocatorButton className="geo-locate" buttonValue="See Distance" buttonAction={this.locate}>
            
                </GeoLocatorButton>
                <br></br>
                {this.state.loading && <Spin style={{marginTop:"2%"}}size="large"></Spin>}
                {this.state.longitudeDevice &&
                    <p className="longitude-device" style= {{color:"blue", fontWeight:"bold", fontSize : "25px"}} >
                        { `Longitude device is ${dist1}`}
                    </p>
                }
                {this.state.latitudeDevice &&
                    <p className="latitude-device" style= {{color:"blue", fontWeight:"bold", fontSize : "25px"}} >
                        { `Latitude device is ${dist2}`}
                    </p>
                }
                {this.state.longitudeCity &&
                    <p className="longitude-city" style= {{color:"blue", fontWeight:"bold", fontSize : "25px"}} >
                        { `Longitude of the city center is ${dist3}`}
                    </p>
                }
                {this.state.latitudeCity &&
                    <p className="latitude-city" style= {{color:"blue", fontWeight:"bold", fontSize : "25px"}} >
                        { `Latitude of the city center is ${dist4}`}
                    </p>
                }
                {this.state.distance &&
                    <p className="result-text-geol" style= {{color:"blue", fontWeight:"bold", fontSize : "25px"}} >
                        { `Distance to nearest city center is ${this.state.distance} kms and that city is ${this.state.city}`}
                    </p>
                }
            </div>       
        );
    }
}
export default GeoLocator;

