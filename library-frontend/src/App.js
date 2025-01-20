import "./App.css";
import Header from "./Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import AddRecord from "./AddRecord";
import UpdateRecord from "./UpdateRecord";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <h1>Library</h1>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/add" element={<AddRecord />} />
          <Route path="/update" element={<UpdateRecord />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;