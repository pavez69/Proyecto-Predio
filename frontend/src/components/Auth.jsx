import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

export const LoginButton = ({ onLogin }) => {
  const { loginWithRedirect } = useAuth0();

  const handleLogin = () => {
    loginWithRedirect();
  };

  return (
    <div style={{
      backgroundColor: 'black',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <div style={{
        marginBottom: '20px',
      }}>
        <i className="fas fa-user"></i>
      </div>
      <button
        onClick={handleLogin}
        className="btn btn-primary btn-block"
        style={{
          fontSize: '20px',
          padding: '10px 20px',
          borderRadius: '5px',
          border: 'none',
          boxShadow: '0px 8px 15px rgba(0, 0, 0, 0.1)',
          transition: 'all 0.3s ease 0s',
          cursor: 'pointer',
          outline: 'none',
        }}
      >
        Log In
      </button>
    </div>
  );
};