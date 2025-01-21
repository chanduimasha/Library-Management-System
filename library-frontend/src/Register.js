// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import Header from "./Header";

// function Register() {
//   useEffect(() => {
//     if (localStorage.getItem("user-info")) {
//       navigate("/add");
//     }
//   }, []);

//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   async function signUp() {
//     let item = { name, email, password };
//     console.warn(item);

//     let result = await fetch("http://localhost:8000/api/register", {
//       method: "POST",
//       body: JSON.stringify(item),
//       headers: {
//         "Content-Type": "application/json",
//         Accept: "application/json",
//       },
//     });
//     result = await result.json();
//     localStorage.setItem("user-info", JSON.stringify(result));
//     navigate("/add");
//   }
//   return (
//     <>
//       <Header />
//       <div className="col-sm-6 offset-sm-3">
//         <h1>Register</h1>
//         <input
//           type="text"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           placeholder="Name"
//           className="form-control"
//         />
//         <br />
//         <input
//           type="text"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           placeholder="Email"
//           className="form-control"
//         />
//         <br />
//         <input
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           placeholder="Password"
//           className="form-control"
//         />
//         <br />
//         <button onClick={signUp} className="btn btn-primary">
//           Sign Up
//         </button>
//       </div>
//     </>
//   );
// }

// export default Register;


import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Register.css"; // Custom CSS for further styling

function Register() {
  useEffect(() => {
    if (localStorage.getItem("user-info")) {
      navigate("/add");
    }
  }, []);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function signUp() {
    let item = { name, email, password };
    console.warn(item);

    let result = await fetch("http://localhost:8000/api/register", {
      method: "POST",
      body: JSON.stringify(item),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    result = await result.json();
    localStorage.setItem("user-info", JSON.stringify(result));
    navigate("/add");
  }

  return (
    <>
      <Header />
      <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
        <div className="card shadow-lg p-4" style={{ width: "400px", borderRadius: "10px" }}>
          <h2 className="text-center mb-4 text-dark">Create an Account</h2>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="form-control"
              id="name"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="form-control"
              id="email"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="form-control"
              id="password"
            />
          </div>
          <button
            onClick={signUp}
            className="btn btn-dark w-100 py-2"
          >
            Sign Up
          </button>
          <div className="text-center mt-3">
            <small className="text-muted">
              Already have an account? <a href="/login" className="text-decoration-none">Login</a>
            </small>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;