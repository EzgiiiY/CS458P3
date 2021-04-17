import React, { Component } from 'react';
import { Button } from 'antd';
import 'antd/dist/antd.css';

const GeoLocatorButton = ({ buttonValue,buttonAction }) => (
    <Button id="geo-locate" className="button-container" style={styles.geoLocatorButton}onClick={() => buttonAction()}>
      <p className="button-value">{buttonValue} </p>
    </Button>
  );
  let styles = {
    geoLocatorButton: {
      minHeight: "40px",
      fontWeight: "bold",
      fontSize: "17px",
      borderRadius: "11px",
      backgroundColor: "#CC99FF",
      color: "#fff",
      marginRight: "25"
    }
  }
export default GeoLocatorButton;