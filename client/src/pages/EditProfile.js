import React, { useState, useEffect } from "react";
import axios from "axios";

import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Snackbar, IconButton, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';

import MenuList from "@material-ui/core/MenuList";
import MenuItem from "@material-ui/core/MenuItem";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

import Navbar from "../components/Navbar";
import SideNavigationBar from "../components/SideNavBar";

const EditProfileStyles = makeStyles(theme => ({
  root: {
    marginTop: 100,
  },
  title: {
    marginBottom: 50,
    [theme.breakpoints.down('xs')]: {
      fontSize: 35
    },
  },
  card: {
    width: "60%",
    margin: "auto",
    padding: 50,
    textAlign: "center",
    [theme.breakpoints.down('md')]: {
      width: "80%",
      padding: 10
    },
    [theme.breakpoints.down('xs')]: {
      width: "90%",
    },
  },
  sideNav: {
    width: "70%",
    margin: "auto",
    [theme.breakpoints.down('md')]: {
      width: "100%",
    },
    [theme.breakpoints.down('xs')]: {
      width: "40%",
      marginLeft: 15
    },
  },
  error: {
    color: "red",
    textAlign: "left"
  }
}));

const EditProfile = (props) => {
  const classes = EditProfileStyles();
  const [userInput, setUserInput] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    birthDate: "",
    email: "",
    phone: "",
    address: "",
    description: "",
    date: ""
  });
  const [profile, setProfile] = useState("");
  const [errors, setErrors] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMsg, setSnackBarMsg] = useState("");
  const [formChange, setFormChange] = useState(false);
  const token = localStorage.getItem("jwtToken");
  const userId = localStorage.getItem("userId");
 
  
  useEffect(() => {
    axios.get(`profile/get/${userId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => {
      setProfile(res.data.profile);
      setUserInput({
        firstName: res.data.profile.firstName,
        lastName: res.data.profile.lastName,
        gender: res.data.profile.gender,
        birthDate: res.data.profile.birthDate,
        email: res.data.profile.email,
        phone: res.data.profile.phone,
        address: res.data.profile.address,
        description: res.data.profile.description,
        date: res.data.profile.date
      })
    })
    .catch(err => {
      console.log(err);
    });
  }, []);

 
  const createProfile = () => {
    axios.post("profile/create", userInput, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(res => {
        setSnackBarMsg("Profile Saved" );
        setSnackbarOpen(true);
      })
      .catch(err => {
        setSnackBarMsg("Please fill up all the fields!");
        setSnackbarOpen(true);
        setErrors(err.response.data);
      });
  }

  const updateProfile = () => {
    axios.put(`profile/update/${userId}`, userInput, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(res => {
        setSnackBarMsg("Profile Saved" );
        setSnackbarOpen(true);
      })
      .catch(err => {
        setSnackBarMsg("Please fill up all the fields!");
        setSnackbarOpen(true);
        setErrors(err.response.data);
      });
  }

  const handleInputChange = e => {
    setUserInput({...userInput, [e.target.name]: e.target.value })
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (profile) {
      updateProfile();
    } else {
      createProfile();
    }
  };

  const snackbarClose = event => {
    setSnackbarOpen(false);
  };
  
  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "center"
        }}
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={snackbarClose}
        message={<span id="message-id">{snackbarMsg}</span>}
        action={[
          <IconButton
            key="close"
            arial-label="Close"
            color="inherit"
            onClick={snackbarClose}
          ></IconButton>
        ]}
      />
      <Navbar/>
      <Grid container className={classes.root}>
        <Grid item xs={12} sm={2} md={2} >
          <div className={classes.sideNav}>
            <SideNavigationBar/>
          </div>
        </Grid>
        <Grid item xs={12} sm={10} md={10}>
          <Card className={classes.card}>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <Typography  className={classes.title} variant="h3">Edit Profile</Typography>
                <Grid container spacing={3}>
                  {/* First Name */}
                  <Grid item xs={3}>
                    <p>FIRST NAME</p>
                  </Grid>
                  <Grid item xs={9}>
                    <TextField
                      name="firstName"
                      id="standard-firstName"
                      placeholder="John"
                      value={userInput.firstName}
                      onChange={handleInputChange}
                      margin="normal"
                      variant="outlined"
                      fullWidth
                    />
                    {errors ? (
                      <div className={classes.error}>
                        {errors.firstName}
                      </div>
                    ) : null}
                  </Grid>
                  {/* Last name */}
                  <Grid item xs={3}>
                    <p>LAST NAME</p>
                  </Grid>
                  <Grid item xs={9}>
                    <TextField
                      name="lastName"
                      id="standard-lastName"
                      placeholder="Doe"
                      value={userInput.lastName}
                      onChange={handleInputChange}
                      margin="normal"
                      variant="outlined"
                      fullWidth
                    />
                    {errors ? (
                      <div className={classes.error}>
                        {errors.lastName}
                      </div>
                    ) : null}
                  </Grid>
                  {/* Gender */}
                  <Grid item xs={3}>
                    <p>GENDER</p>
                  </Grid>
                  <Grid item xs={9}>
                    <TextField
                      select
                      name="gender"
                      id="standard-gender"
                      label="gender"
                      value={userInput.gender}
                      onChange={handleInputChange}
                      margin="normal"
                      variant="outlined"
                      fullWidth
                    >
                      <MenuItem value="">
                        <em>Gender</em>
                      </MenuItem>
                      <MenuItem value={"male"}>Male</MenuItem>
                      <MenuItem value={"female"}>Female</MenuItem>
                    </TextField>
                    {errors ? (
                      <div className={classes.error}>
                        {errors.gender}
                      </div>
                    ) : null}
                  </Grid>
                  {/* DOB */}
                  <Grid item xs={3}>
                    <p>BIRTH DATE</p>
                  </Grid>
                  <Grid item xs={9}>
                    <TextField
                      type="date"
                      name="birthDate"
                      id="standard-birthDate"
                      value={userInput.birthDate}
                      onChange={handleInputChange}
                      margin="normal"
                      variant="outlined"
                      fullWidth
                    />
                    {errors ? (
                      <div className={classes.error}>
                        {errors.birthDate}
                      </div>
                    ) : null}
                  </Grid>
                  {/* Email */}
                  <Grid item xs={3}>
                    <p>EMAIL ADDRESS</p>
                  </Grid>
                  <Grid item xs={9}>
                    <TextField
                      name="email"
                      placeholder="john-doe.s@gmail.com"
                      id="standard-email"
                      value={userInput.email}
                      onChange={handleInputChange}
                      margin="normal"
                      variant="outlined"
                      fullWidth
                    />
                    {errors ? (
                      <div className={classes.error}>
                        {errors.email}
                      </div>
                    ) : null}
                  </Grid>
                  {/* Phone number */}
                  <Grid item xs={3}>
                    <p>PHONE NUMBER</p>
                  </Grid>
                  <Grid item xs={9}>
                    <TextField
                      name="phone"
                      id="standard-phone"
                      value={userInput.phone}
                      onChange={handleInputChange}
                      margin="normal"
                      variant="outlined"
                      fullWidth
                    />
                    {errors ? (
                      <div className={classes.error}>
                        {errors.phone}
                      </div>
                    ) : null}
                  </Grid>
                  {/* Address */}
                  <Grid item xs={3}>
                    <p>WHERE YOU LIVE</p>
                  </Grid>
                  <Grid item xs={9}>
                    <TextField
                      name="address"
                      placeholder="Address"
                      id="standard-address"
                      value={userInput.address}
                      onChange={handleInputChange}
                      margin="normal"
                      variant="outlined"
                      fullWidth
                    />
                    {errors ? (
                      <div className={classes.error}>
                        {errors.address}
                      </div>
                    ) : null}
                  </Grid>
                  {/* Description */}
                  <Grid item xs={3}>
                    <p>DESCRIBE YOURSELF</p>
                  </Grid>
                  <Grid item xs={9}>
                    <TextField
                      name="description"
                      placeholder="About you"
                      id="standard-description"
                      value={userInput.description}
                      onChange={handleInputChange}
                      margin="normal"
                      variant="outlined"
                      fullWidth
                    />
                    {errors ? (
                      <div className={classes.error}>
                        {errors.description}
                      </div>
                    ) : null}
                  </Grid>
                  {/*Hourly Rate*/}
                  <Grid item xs={3}>
                    <p>YOUR HOURLY RATE</p>
                  </Grid>
                  <Grid item xs={9}>
                    <TextField
                      name="rate"
                      placeholder="Your hourly rate"
                      id="standard-rate"
                      type="number"
                      value={userInput.rate}
                      onChange={handleInputChange}
                      margin="normal"
                      variant="outlined"
                      fullWidth
                    />
                    {errors ? (
                      <div className={classes.error}>
                        {errors.rate}
                      </div>
                    ) : null}
                  </Grid>
                  <Grid item xs={12}>
                    <Button type="submit" variant="contained" size="large" color="secondary">
                      Submit
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}

export default EditProfile;