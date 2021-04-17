import React, { Component } from 'react';
import { Spin } from 'antd';

import 'antd/dist/antd.css';
import '../src/App.css';
import CityLocatorButton from "./CityLocatorButton";
import Geocode from "react-geocode";

// set Google Maps Geocoding API for purposes of quota management. Its optional but recommended.
Geocode.setApiKey("AIzaSyAHlJQ6EdfWT_UVPNpagMe7sS9kz1N-diU");

// set response language. Defaults to english.
Geocode.setLanguage("en");
Geocode.setLocationType("ROOFTOP");
const re = new RegExp("^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$");
const style1 = { color: "orange", fontWeight: "bold" }
const style2 = { backgroundColor: "#fff", borderRadius: "4px", borderColor: "#333", color: "#8c8c8c", marginRight: ".5rem" }
const style3 = { color: "blue", fontWeight: "bold", fontSize: "25px" }
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
        this.locateCity = this.locateCity.bind(this);
        this.onChangeLat = this.onChangeLat.bind(this);
        this.onChangeLong = this.onChangeLong.bind(this);

    }

    async locateCity() {
        this.setState({ loading: true })
        await Geocode.fromLatLng(this.state.latitude.toString(), this.state.longitude.toString()).then(
            (response) => {
                let city;
                const address = response.results[0].address_components;
                for (let i = 0; i < address.length; i++) {
                    if (address[i].types.includes("administrative_area_level_1"))
                        city = address[i].long_name;
                }
                this.setState({ city: city, loading: false })
            },
            (error) => {
                console.error(error);
                this.setState({ city: "not found", loading: false })
            }
        );
    }

    onChangeLat(e) {
        if (re.test(e.target.value))
            this.setState({ validLat: true, latitude: e.target.value })
        else
            this.setState({ validLat: false })
    }

    onChangeLong(e) {
        if (re.test(e.target.value))
            this.setState({ validLong: true, longitude: e.target.value })
        else
            this.setState({ validLong: false })
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
                    style={style2}
                    onChange={this.onChangeLat}
                />
                {!this.state.validLat &&
                    <p className="error-lat" style={style1}>Invalid Latitude Input</p>}
                <input
                    className="longitude"
                    type="text"
                    name="longitude"
                    placeholder="Longitude"
                    style={style2}
                    onChange={this.onChangeLong}
                />
                {!this.state.validLong &&
                    <p className="error-long" style={style1}>Invalid Longitude Input</p>}
                <CityLocatorButton 
                    className="locate-city" 
                    buttonValue="locate" 
                    buttonAction={this.locateCity}
                />

                <br></br>
                {this.state.loading && <Spin style={{ marginTop: "2%" }} size="large"></Spin>}
                {this.state.city &&
                    <p className="result-text-geoc" style={style3} >{`This location is in ${this.state.city}`}</p>
                }
            </div>);
    }
}
export default CityLocator;
