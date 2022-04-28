import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Button } from "@mui/material";
import Drawer from "./components/drawer";
import Grid from "./components/grid";

function App() {
  return (
    <div className="App">
      <Drawer>
        <Grid />
      </Drawer>
    </div>
  );
}

export default App;
