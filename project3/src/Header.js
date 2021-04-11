import { AppBar, Toolbar } from "@material-ui/core";
import React from "react";

export default function Header() {
  const displayDesktop = () => {
    return <Toolbar>Locator</Toolbar>;
  };
  
  return (
    <header>
      <AppBar position="static">{displayDesktop()}</AppBar>
          <h1>Find Locations</h1>
    </header>
  );
}