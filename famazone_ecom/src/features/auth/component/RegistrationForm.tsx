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
  validateNameLength,
  validatePasswordLength,
  validateEmail,
} from "../../../shared/utils/validation/validations";
import { NewUser } from "../models/NewUser";

export default function RegistrationForm() {
  const {
    text: name,
    shouldDisplayError: nameHasError,
    textChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    clearHandler: nameClearHandler,
  } = useInput(validateNameLength);

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

  const {
    text: confirmPassword,
    shouldDisplayError: confirmPasswordHasError,
    textChangeHandler: confirmPasswordChangeHandler,
    inputBlurHandler: confirmPasswordBlurHandler,
    clearHandler: confirmPasswordClearHandler,
  } = useInput(validatePasswordLength);

  const clearForm = () => {
    nameClearHandler();
    emailClearHandler();
    passwordClearHandler();
    confirmPasswordClearHandler();
  };

  const onSumbitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (password !== confirmPassword) return;
    if (
      nameHasError ||
      emailHasError ||
      passwordHasError ||
      confirmPasswordHasError
    )
      return;
    if (
      name?.length === 0 ||
      email?.length === 0 ||
      password?.length === 0 ||
      confirmPassword?.length === 0
    )
      return;
    if (name && email && password) {
      const newUser: NewUser = { name, email, password };
      console.log("====================================");
      console.log(newUser);
      console.log("====================================");
      clearForm();
    }
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
            label="Your Name"
            placeholder="Enter your name"
            sx={{ marginTop: 3 }}
            value={name}
            onChange={nameChangeHandler}
            onBlur={nameBlurHandler}
            error={nameHasError}
            helperText={nameHasError ? "Name input invalid" : ""}
          />
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
          <TextField
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            label="Confirm password"
            placeholder="Confirm your password"
            sx={{ marginTop: 3 }}
            value={confirmPassword}
            onChange={confirmPasswordChangeHandler}
            onBlur={confirmPasswordBlurHandler}
            error={password !== confirmPassword}
            helperText={
              password !== confirmPassword ? "Passwords must match" : ""
            }
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
