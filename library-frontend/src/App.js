import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import AddRecord from "./AddRecord";
import UpdateRecord from "./UpdateRecord";
import Protected from "./Protected";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/add" element={<Protected Cmp={AddRecord} />} />
          <Route path="/update" element={<Protected Cmp={UpdateRecord} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
