import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Box, Typography, Alert } from "@mui/material";
import { Loginadapter } from "../Adapters/LoginAdapter.js";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async () => {
    const response = await Loginadapter({ email, password });

    if (response.success) {
      // Redirect to the dashboard or a specific URL
      navigate(response.redirectUrl || "/");
    } else {
      setError(response.error);
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      padding={3}
    >
      <Typography variant="h4" gutterBottom>
        Login
      </Typography>
      {error && <Alert severity="error">{error}</Alert>}
      <Box width="300px" mt={2}>
        <TextField
          fullWidth
          className="loginEmail"
          label="Email"
          variant="outlined"
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          fullWidth
          className="loginPass"
          label="Password"
          type="password"
          variant="outlined"
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleLogin}
          style={{ marginTop: "16px" }}
        >
          Login
        </Button>
      </Box>
    </Box>
  );
};

export default Login;