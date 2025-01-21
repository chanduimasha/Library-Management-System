// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import Header from "./Header";

// function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [errorMessage, setErrorMessage] = useState(""); // State for error message
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (localStorage.getItem("user-info")) {
//       navigate("/add");
//     }
//   }, []);

//   async function login() {
//     let item = { email, password };
//     try {
//       let result = await fetch("http://localhost:8000/api/login", {
//         method: "POST",
//         body: JSON.stringify(item),
//         headers: {
//           "Content-Type": "application/json",
//           Accept: "application/json",
//         },
//       });

//       if (!result.ok) {
//         // Handle HTTP errors
//         if (result.status === 401) {
//           setErrorMessage("Email or password is incorrect."); // Set error message
//         } else {
//           setErrorMessage("An unexpected error occurred. Please try again.");
//         }
//         return;
//       }

//       result = await result.json();
//       localStorage.setItem("user-info", JSON.stringify(result));
//       navigate("/add");
//     } catch (error) {
//       setErrorMessage("An error occurred. Please check your connection."); // Handle network errors
//     }
//   }

//   return (
//     <div>
//       <Header />
//       <div className="col-sm-6 offset-sm-3">
//         <h1>Login</h1>
//         {errorMessage && (
//           <div className="alert alert-danger" role="alert">
//             {errorMessage}
//           </div>
//         )}
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
//         <button onClick={login} className="btn btn-primary">
//           Login
//         </button>
//       </div>
//     </div>
//   );
// }

// export default Login;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Login.css"; // Custom CSS for further styling

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // State for error message
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("user-info")) {
      navigate("/add");
    }
  }, []);

  async function login() {
    let item = { email, password };
    try {
      let result = await fetch("http://localhost:8000/api/login", {
        method: "POST",
        body: JSON.stringify(item),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      if (!result.ok) {
        if (result.status === 401) {
          setErrorMessage("Email or password is incorrect."); // Set error message
        } else {
          setErrorMessage("An unexpected error occurred. Please try again.");
        }
        return;
      }

      result = await result.json();
      localStorage.setItem("user-info", JSON.stringify(result));
      navigate("/add");
    } catch (error) {
      setErrorMessage("An error occurred. Please check your connection.");
    }
  }

  return (
    <>
      <Header />
      <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
        <div className="card shadow-lg p-4" style={{ width: "400px", borderRadius: "10px" }}>
          <h2 className="text-center mb-4 text-dark">Login</h2>
          {errorMessage && (
            <div className="alert alert-danger" role="alert">
              {errorMessage}
            </div>
          )}
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
            onClick={login}
            className="btn btn-dark w-100 py-2"
          >
            Login
          </button>
          <div className="text-center mt-3">
            <small className="text-muted">
              Don't have an account? <a href="/register" className="text-decoration-none">Sign Up</a>
            </small>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
