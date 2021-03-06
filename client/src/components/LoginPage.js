import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import hilogo from "../images/hilogo.png";
import Auth from "../utils/auth";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { Navigate } from 'react-router-dom';

const LoginForm = () => {
  const [userFormData, setUserFormData] = useState({ email: "", password: "" });
  const [validated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const [login, { error, data }] = useMutation(LOGIN_USER);

  useEffect(() => {
    if (error) {
      setShowAlert(true);
    } else {
      setShowAlert(false);
    }
  }, [error]);

  useEffect(() => {
    console.log(error)
  }, [userFormData])

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // const form = event.currentTarget;
    // if (form.checkValidity() === false) {
    //   event.preventDefault();
    //   event.stopPropagation();
    // }
    console.log(userFormData) 
    try {
      const { data } = await login({
        variables: { ...userFormData },
      });

      console.log(data);
      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setUserFormData({
      email: "",
      password: "",
    });
  };

  return (
    <div>
      {Auth.loggedIn() ? ( 
        <Navigate to={{ pathname: '/projects'}}/>
      ) : (
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="space-between"
        style={{ minHeight: "100vh" }}
      >
        <img src={hilogo} alt="hi-logo" style={{ width: "60vh"}}/>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
          onSubmit={handleFormSubmit}
        >
          <div>
            <TextField fullWidth required id="outlined-required"
            label="Email"
            onChange={handleInputChange}
            name="email" 
            value={userFormData.email}
            />
            <br></br>
            <TextField
              fullWidth
              id="filled-password-input"
              label="Password"
              type="password"
              autoComplete="current-password"
              variant="filled"
              onChange={handleInputChange}
              name="password"
              value={userFormData.password}
            />
          </div>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Login
          </Button>
        </Box>
        <div></div>
      </Grid>
      )}
    </div>
  );
};

export default LoginForm;
