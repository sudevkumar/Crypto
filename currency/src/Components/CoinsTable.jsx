import {
  Container,
  createTheme,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  ThemeProvider,
  Typography,
} from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import { makeStyles } from "@material-ui/styles";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { CryptoState } from "../CryptoContext";
import { numberWithCommas } from "./Banner/Carousal";

const CoinsTable = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const { currency, symbol, loading, coins, fetchCoinList } = CryptoState();
  const navigate = useNavigate();

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });

  useEffect(() => {
    fetchCoinList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currency]);

  const tHead = ["Coin", "Price", "24h Change", "Market Cap"];

  const handleSearch = () => {
    return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search) ||
        coin.symbol.toLowerCase().includes(search)
    );
  };

  const useStyles = makeStyles(() => ({
    row: {
      backgroundColor: "#16171a",
      cursor: "pointer",
      "& :hover": {
        backgroundColor: "#131111",
      },
      fontFamily: "Montserrat",
    },
    pagination: {
      "& .MuiPaginationItem-root": {
        color: "gold",
      },
    },
  }));

  const classes = useStyles();

  return (
    <ThemeProvider theme={darkTheme}>
      <Container style={{ textAlign: "center" }}>
        <Typography
          variant="h4"
          style={{ margin: 18, fontFamily: "Montserrat" }}
        >
          Crypto Currence Price By Market Cap
        </Typography>

        <TextField
          label="Srach For Your Crypto Currency..."
          variant="outlined"
          style={{ width: "100%", marginBottom: 20 }}
          onChange={(e) => setSearch(e.target.value)}
        />

        <TableContainer>
          {loading ? (
            <LinearProgress style={{ background: "gold" }} />
          ) : (
            <Table>
              <TableHead style={{ backgroundColor: "#EEBC1D" }}>
                <TableRow>
                  {tHead.map((ele, i) => (
                    <TableCell
                      key={i}
                      style={{
                        color: "black",
                        fontWeight: "700",
                        fontFamily: "Montserrat",
                      }}
                      align={ele === "Coin" ? "" : "right"}
                    >
                      {ele}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {handleSearch()
                  .slice((page - 1) * 10, (page - 1) * 10 + 10)
                  .map((row) => {
                    let profit = row?.price_change_percentage_24h >= 0;

                    return (
                      <TableRow
                        onClick={() => navigate(`/coin/${row.id}`)}
                        key={row.id}
                        className={classes.row}
                      >
                        <TableCell
                          component="th"
                          scope="row"
                          style={{
                            display: "flex",
                            gap: 15,
                          }}
                        >
                          <img
                            src={row?.image}
                            alt={row.name}
                            height="50"
                            style={{ marginBottom: 10 }}
                          />
                          <div
                            style={{ display: "flex", flexDirection: "column" }}
                          >
                            <span
                              style={{
                                textTransform: "uppercase",
                                fontSize: 22,
                              }}
                            >
                              {row.symbol}
                            </span>
                            <span style={{ color: "darkgray" }}>
                              {row.name}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell align="right">
                          {symbol}
                          {numberWithCommas(row.current_price.toFixed(2))}
                        </TableCell>

                        <TableCell
                          align="right"
                          style={{
                            color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                            fontWeight: "500",
                          }}
                        >
                          {profit && "+"}
                          {row.price_change_percentage_24h.toFixed(2)}%
                        </TableCell>

                        <TableCell align="right">
                          {symbol}
                          {numberWithCommas(
                            row.market_cap.toString().slice(0, -6)
                          )}
                          M
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          )}
        </TableContainer>
        <Pagination
          count={(handleSearch()?.length / 10).toFixed(0)}
          style={{
            padding: 20,
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
          classes={{ ul: classes.pagination }}
          onChange={(_, value) => {
            setPage(value);
            window.scroll(0, 450);
          }}
        />
      </Container>
    </ThemeProvider>
  );
};

export default CoinsTable;
