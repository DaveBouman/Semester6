import { Home } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { UserContext } from "./components/context/userContext";
import Drawer from "./components/drawer";
import KweetForm from "./components/KweetForm";

function App() {
  const userContext = useContext(UserContext);

  const fetchcall = () => {
    fetch("http://localhost/api/v1/users/users/test", {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": "true",
      },
    });
  };

  return (
    <div className="App">
      <Drawer>
        <div>{userContext?.name?.givenName}</div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            width: "100%",
          }}
        >
          <Button onClick={fetchcall}>hello</Button>
          <KweetForm />
        </div>
      </Drawer>
      <Routes>
        <Route path="/" element={<div>test </div>} />
        <Route path="/henk" element={<div>tester </div>} />
      </Routes>
    </div>
  );
}

export default App;
