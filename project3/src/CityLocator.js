import React, { Component } from 'react';
import { Card } from 'antd';
import 'antd/dist/antd.css';
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
    }
    //sonradan değişmeli
    locateCity(){
        console.log("Locate city called.");
    }
    render(){
        return <div>
            <CityLocatorButton>
                
            </CityLocatorButton>
        </div>
    }
}
export default CityLocator;
