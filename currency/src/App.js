import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./Components/Header";
import Home from "./Pages/Home";
import Coin from "./Pages/Coin";
import { makeStyles } from "@material-ui/core";

function App() {
  const useStyle = makeStyles((theme) => ({
    App: {
      backgroundColor: "#14161A",
      color: "white",
      minHeight: "100vh",
    },
  }));

  const classes = useStyle();

  return (
    <BrowserRouter>
      <div className={classes.App}>
        <Header />
        <Routes>
          <Route path="/" Component={Home} exact />
          <Route path="/coin/:id" Component={Coin} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;


