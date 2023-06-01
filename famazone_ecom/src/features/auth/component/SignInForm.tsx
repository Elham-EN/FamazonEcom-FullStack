/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { FormEvent, useEffect } from "react";
import {
  Box,
  Grid,
  TextField,
  Typography,
  Button,
  Divider,
  CircularProgress,
} from "@mui/material";
import { Link } from "react-router-dom";
import useInput from "../../../hooks/input/user-input";
import {
  validateEmail,
  validatePasswordLength,
} from "../../../shared/utils/validation/validations";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux/hooks";
import { login, reset } from "../authSlice";
import { LoginUser } from "../models/LoginUser.interface";

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

  const dispatch = useAppDispatch();
  const { isLoading, isSuccess, isAuthenticated } = useAppSelector(
    (state) => state.auth
  );

  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) {
      dispatch(reset());
      clearForm();
    }
  }, [isSuccess, dispatch]);

  useEffect(() => {
    if (!isAuthenticated) return;
    navigate("/");
  }, [isAuthenticated]);

  const onSumbitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (emailHasError || passwordHasError) return;
    if (email?.length === 0 || password?.length === 0) return;

    if (email && password) {
      const loginUser: LoginUser = { email, password };
      dispatch(login(loginUser));
    }
  };

  if (isLoading)
    return <CircularProgress sx={{ marginTop: "64px" }} color="primary" />;

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
