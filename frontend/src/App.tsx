import { Home } from "@mui/icons-material";
import { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { UserContext } from "./components/context/userContext";
import Drawer from "./components/drawer";

function App() {
  const userContext = useContext(UserContext);

  return (
    <div className="App">
      <Drawer>{userContext?.name?.givenName}</Drawer>
      <Routes>
        <Route path="/" element={<div>test </div>} />
        <Route path="/henk" element={<div>tester </div>} />
      </Routes>
    </div>
  );
}

export default App;
