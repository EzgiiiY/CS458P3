import React, { Component } from 'react';
import { Button } from 'antd';
import 'antd/dist/antd.css';

class CityLocatorTextInput extends Component {
    constructor(props){
        super(props);
        this.state={
            width:""
        }
    }
    render(){
        return <div>
            <input 
                type="text"
                name="width" 
                onChange={(event)=>this.setState({[event.target.name]:event.target.value})}
            >

            </input>
        </div>
    }
}
export default CityLocatorTextInput;