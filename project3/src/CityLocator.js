import React, { Component } from 'react';
import { Card, Button, Spin } from 'antd';

import 'antd/dist/antd.css';
import '../src/App.css';
import Header from './Header';


import CityLocatorButton from "./CityLocatorButton";
import Geocode from "react-geocode";

// set Google Maps Geocoding API for purposes of quota management. Its optional but recommended.
Geocode.setApiKey("AIzaSyAHlJQ6EdfWT_UVPNpagMe7sS9kz1N-diU");

// set response language. Defaults to english.
Geocode.setLanguage("en");
Geocode.setLocationType("ROOFTOP");
const re = new RegExp("^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$");


class CityLocator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            latitude: 0,
            longitude: 0,
            city: '',
            loading: false,
            validLat: true,
            validLong: true,
        };
    }

    render() {
        return (
            <div>
                <p>Please enter coordinates to see nearest city</p>
                <input
                    className="latitude"
                    type="text"
                    name="latitude"
                    placeholder="Latitude"
                    style={{ backgroundColor: "#fff", borderRadius: "4px", borderColor: "#333", color: "#8c8c8c", marginRight: ".5rem" }}
                    onChange={(e) => {
                        if (re.test(e.target.value))
                            this.setState({ validLat: true, latitude: e.target.value })
                        else
                            this.setState({ validLat: false })
                    }}
                >

                </input>
                {!this.state.validLat && <p className="error-lat" style={{ color: "orange", fontWeight: "bold" }}>Invalid Latitude Input</p>}
                <input
                    className="longitude"
                    type="text"
                    name="longitude"
                    placeholder="Longitude"
                    style={{ backgroundColor: "#fff", borderRadius: "4px", borderColor: "#333", color: "#8c8c8c", marginRight: ".5rem" }}
                    onChange={(e) => {
                        if (re.test(e.target.value))
                            this.setState({ validLong: true, longitude: e.target.value })
                        else
                            this.setState({ validLong: false })
                    }}
                >

                </input>
                {!this.state.validLong && <p className="error-long" style={{ color: "orange", fontWeight: "bold" }}>Invalid Longitude Input</p>}
                <CityLocatorButton
                    className="locate-city"
                    buttonValue="locate"
                    buttonAction={async() => {
                        this.setState({ loading: true })
                        console.log("Locate city called.");
                        await Geocode.fromLatLng(this.state.latitude.toString(), this.state.longitude.toString()).then(
                            (response) => {
                                let city;
                                const address = response.results[0].address_components;
                                for (let i = 0; i < address.length; i++) {
                                    if (address[i].types.includes("administrative_area_level_1"))
                                        city = address[i].long_name;
                                }
                                console.log("address: " + address + " city: " + city);
                                this.setState({ city: city, loading: false })
                            },
                            (error) => {
                                console.error(error);
                                this.setState({city: "not found", loading:false})
                            }
                        );
                        console.log(this.state)
                    }
                    }
                />

                <br></br>
                {this.state.loading && <Spin style={{ marginTop: "2%" }} size="large"></Spin>}
                {this.state.city &&
                    <p className="result-text-geoc" style={{ color: "blue", fontWeight: "bold", fontSize: "25px" }} >{`This location is in ${this.state.city}`}</p>
                }
            </div>);
    }
}
export default CityLocator;
