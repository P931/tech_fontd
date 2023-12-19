import {
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
  InputAdornment,
  IconButton,
  Alert,
  Stack,

} from "@mui/material";

import React, { useState } from 'react';
import { useNavigate, } from "react-router-dom";
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';

import axios from "axios";
import { BASE_URL } from "../Service/helper";

import { makeStyles } from '@mui/styles';


const useStyles = makeStyles({

  loginData: {

    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    "&>div": {

      // paper div
      "&>div": {

        top: "8%",

        left: "12%",
        width: "74%",

        display: "flex",
        padding: "17px 10px 17px 10px",
        position: "absolute",
        boxShadow: "0px 11px 74px 0px rgba(0, 0, 0, 0.35)",
        alignItems: "center",
        borderRadius: "21px",
        flexDirection: "column",
        justifyContent: "center",

        "&>div": {

          width: "100%",
          padding: "0px 22px 0px 23px",

          "&>div:first-child": {
            width: "100%",
            marginBottom: "15px",

            // customer Registration...
            "&>div:first-child": {
              width: "100%",
              marginBottom: "15px",

              "&>p": {
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "800",
              }
            },


            "&>div": {
              width: "100%",
              marginBottom: "15px",

              // labels .........
              "&>p": {
                position: "relative",
                fontSize: "15px",
                fontWeight: "500",
                marginBottom: "5px",
              },

              "&>div": {
                width: "100%",

                "&>div": {
                  color: "rgba(0, 0, 0, 0.8)",
                  border: "1px solid #DDD",
                  height: "auto",
                  fontSize: "14px",
                  boxShadow: "0px 4px 12px 0px rgba(0, 0, 0, 0.07)",
                  fontWeight: "400",
                  borderRadius: "10px",

                  "&>svg": {
                    margin: "0px 9px 0px 0px",
                  }
                }
              }
            }
          },

          // login btn ........
          "&>div:nth-child(2)": {

            width: "100%",

            "&>button": {

              color: "#fff",
              width: "fit-content",
              border: "none",
              margin: "0 auto 20px",
              display: "block",
              padding: "12px 30px",
              zIndex: "2",
              position: "relative",
              fontSize: "15px",
              background: "#191919",
              textAlign: "center",
              transition: "all 0.5s ease-out",
              fontWeight: "600",
              whiteSpace: "nowrap",
              borderRadius: "5px",
              letterSpacing: "1.5px",

            },

            // registration with customer or admin 
            "&>p": {
              display: "flex",
              alignItems: "center",
              justifyContent: "center",

              // customer or admin
              "&>p": {
                margin: "0px 5px 0px 5px",
                cursor: "pointer",
              }
            }
          }
        }
      }
    }
  },

})

const Login = () => {

  const emailValidation = /^[a-z0-9._%+-]+@[a-z.-]+\.[a-z]{2,4}$/i;

  const classes = useStyles();
  const navigate = useNavigate();

  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: ""
  })

  const [loginValidation, setLoginValidation] = useState(false)

  const [LoginSuccessMsg, setLoginSuccessMsg] = useState('')
  const [loginErrorMsg, setLoginErrorMsg] = useState('')


  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);


  const handlerloginDetails = (e) => {

    setLoginDetails({
      ...loginDetails,
      [e.target.name]: e.target.value
    })
  }

  const handlerLoginbutton = async () => {

    const userDetails = {

      userEmail: loginDetails.email,
      userPassword: loginDetails.password,
    }

    try {

      if (
        emailValidation.test(loginDetails.email)
        && loginDetails.password !== "") {

        const res = await axios.post(`${BASE_URL}/user/user_registration`, userDetails)

        // console.log("res is :- ", res);
        setLoginSuccessMsg(res.data.message)

        setLoginDetails(res.data.payload)

        if (res.status === 200 && res.data.message === "Success") {

          setLoginDetails({
            email: "",
            password: ""
          })

          setLoginValidation(false)

        } else {
          console.log("error in user registration api response")
        }


      } else {
        setLoginValidation(true)
      }

    } catch (error) {
      setLoginValidation(true)

      setLoginErrorMsg(error.response.data.message)

      // console.log("error handlerLoginbutton is :- ", error)
    }
  }

  const handleUserClickCustomerOpt = () => {

    try {

      navigate('/customer')

    } catch (error) {
      console.log("error handleUserClickCustomerOpt is :- ", error)
    }
  }

  const handleUserClickAdminOpt = () => {

    try {

      navigate('/admin')

    } catch (error) {
      console.log("error handleUserClickAdminOpt is :- ", error)
    }
  }

  const handlerCloseSuccessMsg = () => {

    setLoginSuccessMsg('')

  }

  const handlerCloseErrorMsg = () => {

    setLoginErrorMsg('')

  }


  return (
    <Grid className={classes.loginData}>

      <Grid>

        <Paper>

          <Grid>

            <Grid>

              <Grid>

                <Typography>
                  Admin Login
                </Typography>

              </Grid>

              <Grid>

                <Typography>
                  Email*
                </Typography>

                <TextField
                  error={loginValidation === false ? "" : !emailValidation.test(loginDetails.email)}
                  helperText={loginValidation === false ? "" : !emailValidation.test(loginDetails.email) && "Please enter valid email address"}
                  variant="outlined"
                  placeholder="Enter your Email Address"

                  name="email"
                  value={loginDetails.email}
                  onChange={(e) => handlerloginDetails(e)}


                  InputProps={{
                    startAdornment: (
                      <MailOutlineIcon />
                    ),
                  }}
                />

              </Grid>

              <Grid>

                <Typography>
                  Password*
                </Typography>

                <TextField
                  error={loginValidation === false ? "" : !loginDetails.password}
                  helperText={loginValidation === false ? "" : !loginDetails.password && "Please enter password"}
                  variant="outlined"
                  placeholder="Enter your password"

                  type={showPassword ? "text" : "password"}

                  name="password"
                  value={loginDetails.password}
                  onChange={(e) => handlerloginDetails(e)}

                  InputProps={{
                    startAdornment: (
                      <LockOutlinedIcon />
                    ),

                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => handleClickShowPassword()}
                        >
                          {showPassword ? <VisibilityOutlinedIcon /> : <VisibilityOffOutlinedIcon />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

              </Grid>

            </Grid>

            <Grid>

              <Button
                variant="outlined"
                onClick={() => handlerLoginbutton()}
              >
                Login
              </Button>

              <Typography>
                Registration with

                <Typography
                  onClick={() => handleUserClickCustomerOpt()}
                >
                  Customer
                </Typography>

                or

                <Typography
                  onClick={() => handleUserClickAdminOpt()}
                >
                  Admin
                </Typography>
                ?

              </Typography>

              {
                loginErrorMsg !== "" &&
                <Stack sx={{ width: '100%', margin: "10px 0px 0px 0px" }} spacing={2}>
                  <Alert
                    severity="error"
                    onClose={() => handlerCloseErrorMsg()}
                  >
                    {loginErrorMsg}
                  </Alert>
                </Stack>
              }

              {
                LoginSuccessMsg !== "" &&
                <Stack sx={{ width: '100%', margin: "10px 0px 0px 0px" }} spacing={2}>
                  <Alert
                    severity="success"
                    onClose={() => handlerCloseSuccessMsg()}
                  >
                    You are {LoginSuccessMsg} to login
                  </Alert>
                </Stack>
              }

            </Grid>

          </Grid>

        </Paper>

      </Grid>

    </Grid>
  );
}

export default Login;
