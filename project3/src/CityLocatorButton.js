import React, { Component } from 'react';
import { Button } from 'antd';
import 'antd/dist/antd.css';

const CityLocatorButton = ({ buttonValue,buttonAction }) => (
    <div className="button-container" onClick={() => buttonAction()}>
      <p className="button-value">{buttonValue} </p>
    </div>
  );

export default CityLocatorButton;