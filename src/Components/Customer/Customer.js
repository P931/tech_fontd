import {
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
  InputAdornment,
  IconButton,

} from "@mui/material";

import React, { useState } from 'react';
import { useNavigate, } from "react-router-dom";
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';

import axios from "axios";
import { BASE_URL } from "../Service/helper";

import { makeStyles, styled } from '@mui/styles';


const useStyles = makeStyles({

  customerRegistration: {

    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    "&>div": {

      // paper div
      "&>div": {

        top: "8%",

        left: "12%",
        width: "74%",

        // left: "29%",
        // width: "45%",

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

            }
          }
        }
      }
    }
  },


})

const Customer = () => {

  const emailValidation = /^[a-z0-9._%+-]+@[a-z.-]+\.[a-z]{2,4}$/i;

  const classes = useStyles();
  const navigate = useNavigate();


  const [customerLoginDetails, setCustomerLoginDetails] = useState({
    FistName: "",
    LastName: "",
    email: "",
    password: ""
  })

  const [customerLoginValidation, setCustomerLoginValidation] = useState(false)

  // const [customerRegistrationDetails, setCustomerRegistrationDetails] = useState([])


  const [custmoerShowPassword, setCustmoerShowPassword] = useState(false);

  const handleCustomerClickShowPassword = () => setCustmoerShowPassword((show) => !show);


  const handlerCustomerLoginDetails = (e) => {

    setCustomerLoginDetails({
      ...customerLoginDetails,
      [e.target.name]: e.target.value
    })
  }

  const handlerCustomerLoginbtn = async () => {

    const customerDetails = {

      customerFirstName: customerLoginDetails.FistName,
      customerLastName: customerLoginDetails.LastName,
      customerEmail: customerLoginDetails.email,
      customerPassword: customerLoginDetails.password

    }

    try {

      if (
        customerLoginDetails.FistName !== "" && customerLoginDetails.LastName !== "" &&
        emailValidation.test(customerLoginDetails.email)
        && customerLoginDetails.password !== "") {


        const res = await axios.post(`${BASE_URL}/customer/customer_registration`, customerDetails)

        // console.log("res is :- ", res);

        setCustomerLoginDetails(res.data.payload)

        if (res.status === 200 && res.data.message === "Success" &&
          res.data.payload.customerEmail !== "" && res.data.payload.customerPassword !== "") {

          setCustomerLoginDetails({
            FistName: "",
            LastName: "",
            email: "",
            password: ""
          })

          setCustomerLoginValidation(false)

          navigate('/')

        } else {
          console.log("error in customer registraion api response")
        }


      } else {
        setCustomerLoginValidation(true)
      }

    } catch (error) {
      setCustomerLoginValidation(true)
      console.log("error handlerCustomerLoginbtn is :- ", error)
    }

  }


  return (
    <Grid className={classes.customerRegistration}>

      <Grid>

        <Paper>

          <Grid>

            <Grid>

              <Grid>

                <Typography>
                  Customer Registration
                </Typography>

              </Grid>


              <Grid>

                <Typography>
                  First Name*
                </Typography>

                <TextField
                  error={customerLoginValidation === false ? "" : !customerLoginDetails.FistName}
                  helperText={customerLoginValidation === false ? "" : !customerLoginDetails.FistName && "Please enter first name"}
                  variant="outlined"
                  placeholder="Enter your First Name"

                  name="FistName"
                  value={customerLoginDetails.FistName}
                  onChange={(e) => handlerCustomerLoginDetails(e)}

                  InputProps={{
                    startAdornment: (
                      <PersonOutlineIcon />
                    ),
                  }}
                />

              </Grid>

              <Grid>

                <Typography>
                  Last Name*
                </Typography>

                <TextField
                  error={customerLoginValidation === false ? "" : !customerLoginDetails.LastName}
                  helperText={customerLoginValidation === false ? "" : !customerLoginDetails.LastName && "Please enter last name"}
                  variant="outlined"
                  placeholder="Enter your Last Name"

                  name="LastName"
                  value={customerLoginDetails.LastName}
                  onChange={(e) => handlerCustomerLoginDetails(e)}

                  InputProps={{
                    startAdornment: (
                      <PersonOutlineIcon />
                    ),
                  }}
                />

              </Grid>

              <Grid>

                <Typography>
                  Email*
                </Typography>

                <TextField
                  error={customerLoginValidation === false ? "" : !emailValidation.test(customerLoginDetails.email)}
                  helperText={customerLoginValidation === false ? "" : !emailValidation.test(customerLoginDetails.email) && "Please enter valid email address"}
                  variant="outlined"
                  placeholder="Enter your Email Address"

                  name="email"
                  value={customerLoginDetails.email}
                  onChange={(e) => handlerCustomerLoginDetails(e)}


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
                  error={customerLoginValidation === false ? "" : !customerLoginDetails.password}
                  helperText={customerLoginValidation === false ? "" : !customerLoginDetails.password && "Please enter password"}
                  variant="outlined"
                  placeholder="Enter your password"

                  type={custmoerShowPassword ? "text" : "password"}

                  name="password"
                  value={customerLoginDetails.password}
                  onChange={(e) => handlerCustomerLoginDetails(e)}

                  InputProps={{
                    startAdornment: (
                      <LockOutlinedIcon />
                    ),

                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => handleCustomerClickShowPassword()}
                        // onMouseDown={() => handleMouseDownPassword()}
                        >
                          {custmoerShowPassword ? <VisibilityOutlinedIcon /> : <VisibilityOffOutlinedIcon />}
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
                onClick={() => handlerCustomerLoginbtn()}
              >
                Registration
              </Button>

            </Grid>

          </Grid>

        </Paper>

      </Grid>

    </Grid>
  );
}

export default Customer;
