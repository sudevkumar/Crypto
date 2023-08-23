import {
  AppBar,
  Container,
  createTheme,
  MenuItem,
  Select,
  Toolbar,
  Typography,
  ThemeProvider,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React from "react";
import { useNavigate } from "react-router-dom";
import { CryptoState } from "../CryptoContext";
import AuthModal from "./Authentications/AuthModal";
import UserSideBar from "./Authentications/UserSideBar";

const useStyles = makeStyles((theme) => ({
  title: {
    flex: 1,
    color: "gold",
    fontFamily: "Poppins",
    fontWeight: "bold",
    cursor: "pointer",
  },
}));

const darkTheme = createTheme({
  palette: {
    primary: {
      main: "#fff",
    },
    type: "dark",
  },
});

const Header = () => {
  const navigate = useNavigate();
  const classes = useStyles();
  const { currency, setCurrency, user } = CryptoState();

  console.log(user);

  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar color="transparent" position="static">
        <Container>
          <Toolbar>
            <Typography
              className={classes.title}
              onClick={() => navigate("/")}
              variant="h6"
            >
              Crypto Bar
            </Typography>
            <Select
              variant="outlined"
              style={{ width: 100, height: 40, marginRight: 15 }}
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
            >
              <MenuItem value={"INR"}>INR</MenuItem>
              <MenuItem value={"USD"}>USD</MenuItem>
            </Select>
            {user ? <UserSideBar /> : <AuthModal />}
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
};

export default Header;
