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

import { makeStyles } from '@mui/styles';


const useStyles = makeStyles({

  adminRegistration: {

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

            }
          }
        }
      }
    }
  },

})

const Admin = () => {


  const emailValidation = /^[a-z0-9._%+-]+@[a-z.-]+\.[a-z]{2,4}$/i;

  const classes = useStyles();
  const navigate = useNavigate();

  const [adminLoginDetails, setAdminLoginDetails] = useState({
    FistName: "",
    LastName: "",
    email: "",
    password: ""
  })

  const [adminLoginValidation, setAdminLoginValidation] = useState(false)


  const [adminShowPassword, setAdminShowPassword] = useState(false);

  const handleAdminClickShowPassword = () => setAdminShowPassword((show) => !show);


  const handlerAdminLoginDetails = (e) => {

    setAdminLoginDetails({
      ...adminLoginDetails,
      [e.target.name]: e.target.value
    })
  }

  const handlerAdminLoginbtn = async () => {

    const adminDetails = {

      adminFirstName: adminLoginDetails.FistName,
      adminLastName: adminLoginDetails.LastName,
      adminEmail: adminLoginDetails.email,
      adminPassword: adminLoginDetails.password
    }

    try {

      if (
        adminLoginDetails.FistName !== "" && adminLoginDetails.LastName !== "" &&
        emailValidation.test(adminLoginDetails.email)
        && adminLoginDetails.password !== "") {


        const res = await axios.post(`${BASE_URL}/admin/admin_registration`, adminDetails)

        // console.log("res is :- ", res);

        setAdminLoginDetails(res.data.payload)

        if (res.status === 200 && res.data.message === "Success" &&
          res.data.payload.adminEmail !== "" && res.data.payload.adminPassword !== "") {

          setAdminLoginDetails({
            FistName: "",
            LastName: "",
            email: "",
            password: ""
          })

          setAdminLoginValidation(false)

          navigate('/')

        } else {
          console.log("error in admin registraion api response")
        }

      } else {
        setAdminLoginValidation(true)
      }

    } catch (error) {
      setAdminLoginValidation(true)
      console.log("error handlerAdminLoginbtn is :- ", error)
    }

  }

  return (
    <Grid className={classes.adminRegistration}>

      <Grid>

        <Paper>

          <Grid>

            <Grid>

              <Grid>

                <Typography>
                  Admin Registration
                </Typography>

              </Grid>

              <Grid>

                <Typography>
                  First Name*
                </Typography>

                <TextField
                  error={adminLoginValidation === false ? "" : !adminLoginDetails.FistName}
                  helperText={adminLoginValidation === false ? "" : !adminLoginDetails.FistName && "Please enter first name"}
                  variant="outlined"
                  placeholder="Enter your First Name"

                  name="FistName"
                  value={adminLoginDetails.FistName}
                  onChange={(e) => handlerAdminLoginDetails(e)}

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
                  error={adminLoginValidation === false ? "" : !adminLoginDetails.LastName}
                  helperText={adminLoginValidation === false ? "" : !adminLoginDetails.LastName && "Please enter last name"}
                  variant="outlined"
                  placeholder="Enter your Last Name"

                  name="LastName"
                  value={adminLoginDetails.LastName}
                  onChange={(e) => handlerAdminLoginDetails(e)}

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
                  error={adminLoginValidation === false ? "" : !emailValidation.test(adminLoginDetails.email)}
                  helperText={adminLoginValidation === false ? "" : !emailValidation.test(adminLoginDetails.email) && "Please enter valid email address"}
                  variant="outlined"
                  placeholder="Enter your Email Address"

                  name="email"
                  value={adminLoginDetails.email}
                  onChange={(e) => handlerAdminLoginDetails(e)}


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
                  error={adminLoginValidation === false ? "" : !adminLoginDetails.password}
                  helperText={adminLoginValidation === false ? "" : !adminLoginDetails.password && "Please enter password"}
                  variant="outlined"
                  placeholder="Enter your password"

                  type={adminShowPassword ? "text" : "password"}

                  name="password"
                  value={adminLoginDetails.password}
                  onChange={(e) => handlerAdminLoginDetails(e)}

                  InputProps={{
                    startAdornment: (
                      <LockOutlinedIcon />
                    ),

                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => handleAdminClickShowPassword()}
                        >
                          {adminShowPassword ? <VisibilityOutlinedIcon /> : <VisibilityOffOutlinedIcon />}
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
                onClick={() => handlerAdminLoginbtn()}
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

export default Admin;
