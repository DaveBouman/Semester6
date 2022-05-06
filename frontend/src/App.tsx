import { Home } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { UserContext } from "./components/context/userContext";
import Drawer from "./components/drawer";
import KweetForm from "./components/KweetForm";

function App() {
  return (
    <div className="App">
      <Drawer>
        {/* <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            width: "100%",
          }}
        >
          <KweetForm />
        </div> */}
        <Routes>
          <Route
            path="/create"
            element={
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-evenly",
                  width: "100%",
                }}
              >
                <KweetForm />
              </div>
            }
          />
          <Route path="/" element={<div>test </div>} />
          <Route path="/profile" element={<div>sss </div>} />
        </Routes>
      </Drawer>
    </div>
  );
}

export default App;
