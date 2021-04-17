import React, { Component, View } from 'react';
import { Button } from 'antd';
import 'antd/dist/antd.css';

const DistanceCalculatorButton = ({ buttonValue, buttonAction }) => (

  <Button className="button-container" style={styles.button}


    onClick={() => buttonAction()}>
    <p className="button-value">{buttonValue} </p>
  </Button>

);
let styles = {
  button: {
    minHeight: "40px",
    fontWeight: "bold",
    fontSize: "17px",
    borderRadius: "11px",
    backgroundColor: "#CC99FF",
    color: "#fff",
    marginRight: "25"
  }
}

export default DistanceCalculatorButton;