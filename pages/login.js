import {
  Dialog,
  withStyles,
  Box,
  Typography,
  makeStyles,
  List,
  ListItem,
} from "@material-ui/core";
import React from "react";
import Button from "@material-ui/core/Button";
import { FcGoogle } from "react-icons/fc";
import { BsFacebook } from "react-icons/bs";
import { auth, provider } from "../firebase";

const useStyles = makeStyles({
  component: {
    display: "flex",
    "@media (max-width: 1000px)": {
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      columnWidth: "auto",
    },
  },
  leftComponent: { padding: "56px 0 56px 56px" },
  rightComponent: {
    height: 264,
    width: "100%",
    display: "flex",
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 27,
    marginBottom: 25,
    color: "#525252",
    fontFamily:
      "Segoe UI,Helvetica Neue,Helvetica,Lucida Grande,Arial,Ubuntu,Cantarell,Fira Sans,sans-serif",
    fontWeight: 300,
  },
  list: {
    "&  > *": {
      padding: 0,
      marginTop: 15,
      fontSize: 18,
      lineHeight: "28px",
      color: "#4a4a4a",
    },
  },
});

const style = {
  dialogPaper: {
    height: "95%",
    width: "50%",
    marginTop: "12%",
    maxWidth: "200vh",
    maxHeight: "200vh",
    "@media (max-width: 1824px)": {
      height: "95%",
      width: "65%",
    },
    "@media (max-width: 1400px)": {
      height: "100%",
      width: "90%",
      boxShadow: "none",
    },
  },
};

const Login = ({ classes }) => {
  const classname = useStyles();

  const singIn = () => {
    auth.signInWithPopup(provider).catch(alert);
  };

  return (
    <Dialog
      open={true}
      classes={{ paper: classes.dialogPaper }}
      BackdropProps={{ style: { backgroundColor: "unset" } }}
    >
      <Box className={classname.component}>
        <Box className={classname.leftComponent}>
          <Typography className={classname.title}>
            To Use WhatApp On Your Device:
          </Typography>
          <List className={classname.list}>
            <ListItem> 1. To Use WhatApp you need Login </ListItem>{" "}
            <ListItem>
              2. Click on the button Google Button to register with Google{" "}
            </ListItem>
            <ListItem>
              3. Click on the button Facebook Button to register with Facebook{" "}
            </ListItem>
          </List>
        </Box>
        <Box className={classname.rightComponent} alignContent={"center"}>
          <List>
            <ListItem>
              <Button
                onClick={singIn}
                variant="contained"
                style={{ backgroundColor: "white" }}
              >
                <FcGoogle size={20} style={{ marginRight: 10 }} />
                Sign In With Google
              </Button>
            </ListItem>
            <ListItem>
              <Button variant="contained" style={{ backgroundColor: "white" }}>
                <BsFacebook
                  size={20}
                  color="#4867aa"
                  style={{ marginRight: 10 }}
                />
                Sign In With Facebook
              </Button>
            </ListItem>
          </List>
        </Box>
      </Box>
      <Box
        style={{
          display: "flex",
          alignSelf: "center",
        }}
      >
        <img
          src="https://assets.stickpng.com/images/580b57fcd9996e24bc43c543.png"
          alt="placeholder"
          style={{ width: "100%", maxWidth: "400px" }}
        />
      </Box>
    </Dialog>
  );
};

export default withStyles(style)(Login);
