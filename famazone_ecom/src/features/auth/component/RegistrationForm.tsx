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

export default function RegistrationForm() {
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
            Create account
          </Typography>
          <TextField
            type="text"
            name="name"
            id="name"
            label="name"
            placeholder="Enter your name"
            sx={{ marginTop: 3 }}
          />
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
          <TextField
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            label="confirm password"
            placeholder="Confirm your password"
            sx={{ marginTop: 3 }}
          />
          <Button type="submit" variant="contained" sx={{ marginTop: 5 }}>
            Register
          </Button>
        </Grid>
      </form>
      <div style={{ marginTop: 30 }}>
        <small>
          <span>By creating an account, you agree to FamazoneEcom's</span>
        </small>
      </div>
      <div>
        <small>
          <a href="#" style={{ textDecoration: "none" }}>
            {" "}
            Conditions of use
          </a>{" "}
          <a href="#" style={{ textDecoration: "none" }}>
            {" "}
            Privacy policy
          </a>
        </small>
      </div>
      <Divider sx={{ marginTop: 2 }} />
      <div style={{ marginTop: 10 }}>
        <small>
          Already have an account?{" "}
          <Link
            to={"/signin"}
            style={{
              textDecoration: "none",
              fontWeight: "bold",
              color: "#FF9900",
            }}
          >
            Sign-in
          </Link>
        </small>
      </div>
    </Box>
  );
}
