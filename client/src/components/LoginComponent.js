import React, { useEffect, useState } from "react";


import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { loginUser } from "../redux/actions/userActions";

const LoginComponent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const selector = useSelector((state) => state.user.user);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (selector?.token){
      navigate('/dashboard');
    }
  }, [selector]);

  const handleSubmit = () => {
    dispatch(
      loginUser({
        email: email,
        password: password,
        navigate: navigate
      })
    );
  };

  return (
      <div
        className="auth-form-container"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          background: "#16171b",
          paddingTop: "30px",
          paddingBottom: "60px",
          paddingLeft: "50px",
          paddingRight: "50px",
          borderRadius: "10px",
          width:"24%"
        }}
      >
        <form
          onSubmit={handleSubmit}
          className="login-form"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
            marginTop: "20px",
          }}
        >
          <input
            value={email}
            type="email"
            placeholder="Email"
            id="email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            style={{
              backgroundColor: "#2d2737",
              padding: "10px",
              borderRadius: "8px",
              color: "white",
              marginBottom: "10px",
              fontFamily: "MontserratRegular",
              width: "100%",
            }}
          />
          <input
            value={password}
            type="password"
            placeholder="Password"
            id="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            style={{
              backgroundColor: "#2d2737",
              padding: "10px",
              borderRadius: "8px",
              color: "white",
              marginBottom: "10px",
              fontFamily: "MontserratRegular",
              width: "100%",
            }}
          />
        </form>

        <button
          type="submit"
          style={{
            backgroundColor: "#b785f6",
            width: "100%",
            padding: "10px",
            borderRadius: "4px",
            color: "white",
            fontFamily: "MontserratRegular",
            marginTop: "15px",
            fontSize: "18px",
          }}
          onClick={() => {
            handleSubmit();
          }}
        >
          Login
        </button>

        <div
          style={{
            color: "white",
            fontFamily: "MontserratRegular",
            fontSize: "16px",
            marginTop: "15px",
          }}
        >
          Don’t have an account?{" "}
          <a
            style={{
              color: "#B785F6",
            }}
            onClick={() => {
                navigate('/signup')
            }}
          >
            Sign up
          </a>
        </div>
      </div>
  );
};

export default LoginComponent;
