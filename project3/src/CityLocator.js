import React, { Component } from 'react';
import { Card, Button } from 'antd';
import 'antd/dist/antd.css';
import '../src/App.css';

import CityLocatorButton from "./CityLocatorButton";
import CityLocatorTextInput from "./CityLocatorTextInput";

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
                
            <CityLocatorButton className="locate-city" buttonAction={this.locateCity}>
                
            </CityLocatorButton>
        </div>
    }
}
export default CityLocator;
