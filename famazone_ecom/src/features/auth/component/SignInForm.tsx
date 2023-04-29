/* eslint-disable jsx-a11y/anchor-is-valid */
import { FormEvent } from "react";
import {
  Box,
  Grid,
  TextField,
  Typography,
  Button,
  Divider,
} from "@mui/material";
import { Link } from "react-router-dom";

export default function SignInForm() {
  const onSumbitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("====================================");
    console.log("Form Submitted");
    console.log("====================================");
  };
  return (
    <Box
      sx={{
        border: 1,
        padding: 2,
        borderColor: "#cccccc",
        width: "350px",
        marginTop: 5,
      }}
    >
      <form onSubmit={onSumbitHandler}>
        <Grid container direction={"column"} justifyContent={"flex-start"}>
          <Typography variant="h4" component={"h1"}>
            Sign In
          </Typography>

          <TextField
            type="email"
            name="email"
            id="email"
            label="email"
            placeholder="Enter your email"
            sx={{ marginTop: 3 }}
          />
          <TextField
            type="password"
            name="password"
            id="password"
            label="password"
            placeholder="Minimum 6 characters required"
            sx={{ marginTop: 3 }}
          />

          <Button type="submit" variant="contained" sx={{ marginTop: 5 }}>
            Sign In
          </Button>
        </Grid>
      </form>

      <Divider sx={{ marginTop: 2 }} />
      <div style={{ marginTop: 10 }}>
        <small>
          Don't have an account?{" "}
          <Link
            to={"/register"}
            style={{
              textDecoration: "none",
              fontWeight: "bold",
              color: "#FF9900",
            }}
          >
            Register
          </Link>
        </small>
      </div>
    </Box>
  );
}
