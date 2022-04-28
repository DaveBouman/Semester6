import { Home } from "@mui/icons-material";
import {
  BrowserRouter as Router,
  Route,
  Link,
  BrowserRouter,
  Routes
} from "react-router-dom";
import "./App.css";
import Drawer from "./components/drawer";

function App() {
  return (
    <div className="App">
      <Drawer>
      <BrowserRouter>
    <Routes>
      <Route path="/" element={<div>test </div>} />
      <Route path="/henk" element={<div>henk </div>} />
    </Routes>
  </BrowserRouter>
      </Drawer>
    </div>
  );
}

export default App;
