import React, { Component } from 'react';
import { Card, Button, Spin } from 'antd';
import 'antd/dist/antd.css';
import '../src/App.css';
import DistanceCalculatorButton from "./DistanceCalculatorButton";
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

class DistanceCalculator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            latitude: "",
            longitude: "",
            loading: false,
            validLat: true,
            validLong: true,
            distance: ""
        };
        this.calculateDistance = this.calculateDistance.bind(this);
        this.autoCalc = this.autoCalc.bind(this);
        this.onChangeLat = this.onChangeLat.bind(this);
        this.onChangeLong = this.onChangeLong.bind(this);
        this.locate = this.locate.bind(this);
    }

    async locate() {
        this.setState({ loading: true })
        navigator.geolocation.getCurrentPosition(position => {
            this.setState({ latitude: position.coords.latitude, longitude: position.coords.longitude })
            this.autoCalc();
        })
    }

    async calculateDistance() {
        this.setState({ loading: true })
        let r1 = 6378.137; // equatorial r km
        let r2 = 6356.752; //polar r km
        let firstTerm = Math.pow((Math.pow(r1, 2) * Math.cos(this.state.latitude * Math.PI / 180.0)), 2);
        let secondTerm = Math.pow((Math.pow(r2, 2) * Math.sin(this.state.latitude * Math.PI / 180.0)), 2);
        let thirdTerm = Math.pow((r1 * Math.cos(this.state.latitude * Math.PI / 180.0)), 2) + Math.pow((r2 * Math.sin(this.state.latitude * Math.PI / 180.0)), 2);
        let r = Math.sqrt((firstTerm + secondTerm) / thirdTerm)
        this.setState({ loading: false, distance: r })
    }

    async autoCalc() {
        let r1 = 6378; // equatorial r km
        let r2 = 6357; //polar r km
        let firstTerm = Math.pow(Math.pow(r1, 2) * Math.cos(this.state.latitude), 2);
        let secondTerm = Math.pow(Math.pow(r2, 2) * Math.sin(this.state.latitude), 2);
        let thirdTerm = Math.pow(r1 * Math.cos(this.state.latitude), 2) + Math.pow(r2 * Math.sin(this.state.latitude), 2);
        let r = Math.sqrt((firstTerm + secondTerm) / thirdTerm)

        this.setState({ loading: false, distance: r })
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
        let dist1 = Number(Number(this.state.longitude).toPrecision(3));
        let dist2 = Number(Number(this.state.latitude).toPrecision(3))
        return <div>

            <p>Please enter coordinates to calculate distance to earth center</p>
            <input
                className="latitude-c"
                type="text"
                name="latitude"
                placeholder="Latitude"
                style={style2}
                onChange={this.onChangeLat}
            >

            </input>
            {!this.state.validLat && <p className="error-lat-c" style={style1}>Invalid Latitude Input</p>}
            <input
                className="longitude-c"
                type="text"
                name="longitude"
                placeholder="Longitude"
                style={style2}
                onChange={this.onChangeLong}
            />

            {!this.state.validLong &&
                <p className="error-long-c" style={style1}>Invalid Longitude Input</p>
            }
            <DistanceCalculatorButton
                buttonId="calculate-manual"
                className="calculate-manual"
                buttonValue="Calculate Distance"
                buttonAction={this.calculateDistance}
            />
            <DistanceCalculatorButton
                buttonId="calculate-automatic"
                className="calculate-automatic"
                buttonValue="Automatically Calculate Distance"
                buttonAction={this.locate}
            />
            <br></br>
            {this.state.loading &&
                <Spin style={{ marginTop: "2%" }} size="large" />
            }
            <br></br>
            {this.state.longitude &&
                <p className="longitude-auto" style={style3} >
                    {`Longitude found for this device is ${dist1}`}
                </p>
            }
            {this.state.latitude &&
                <p className="latitude-auto" style={style3} >
                    {`Latitude found for this device is ${dist2}`}
                </p>
            }
            <p className="result-text-distance">{`This location approx. ${this.state.distance} kms away from the center of the earth`}</p>

        </div>
    }
}
export default DistanceCalculator;
