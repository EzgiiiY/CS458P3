import React, { Component } from 'react';
import { Button } from 'antd';
import 'antd/dist/antd.css';

const CityLocatorButton = ({ buttonValue,buttonAction }) => (
    <Button className="button-container" onClick={() => buttonAction()}>
      <p className="button-value">{buttonValue} </p>
    </Button>
  );

export default CityLocatorButton;