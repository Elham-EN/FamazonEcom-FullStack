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
import useInput from "../../../hooks/input/user-input";
import {
  validateEmail,
  validatePasswordLength,
} from "../../../shared/utils/validation/validations";

export default function SignInForm() {
  const {
    text: email,
    shouldDisplayError: emailHasError,
    textChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    clearHandler: emailClearHandler,
  } = useInput(validateEmail);

  const {
    text: password,
    shouldDisplayError: passwordHasError,
    textChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    clearHandler: passwordClearHandler,
  } = useInput(validatePasswordLength);

  const clearForm = () => {
    emailClearHandler();
    passwordClearHandler();
  };

  const onSumbitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (emailHasError || passwordHasError) return;
    if (email?.length === 0 || password?.length === 0) return;

    clearForm();
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
            label="Your Email"
            placeholder="Enter your email"
            sx={{ marginTop: 3 }}
            value={email}
            onChange={emailChangeHandler}
            onBlur={emailBlurHandler}
            error={emailHasError}
            helperText={emailHasError ? "Email input is invalid" : ""}
          />
          <TextField
            type="password"
            name="password"
            id="password"
            label="Your Password"
            placeholder="Minimum 6 characters required"
            sx={{ marginTop: 3 }}
            value={password}
            onChange={passwordChangeHandler}
            onBlur={passwordBlurHandler}
            error={passwordHasError}
            helperText={passwordHasError ? "Password input is invalid" : ""}
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
