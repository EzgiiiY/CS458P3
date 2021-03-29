import React, { Component } from 'react';
import { Card } from 'antd';
import 'antd/dist/antd.css';
import CityLocatorButton from "./CityLocatorButton";

class CityLocator extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            latitude:0,
            longitude:0,
        }; 
    }

    getCity(latitude, longitude){
        this.setState(latitude,longitude)
    }
    render(){
        return <div>
            <CityLocatorButton>
                
            </CityLocatorButton>
        </div>
    }
}
export default CityLocator;