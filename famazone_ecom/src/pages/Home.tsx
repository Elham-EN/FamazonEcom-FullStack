import React from "react";
import { useAppDispatch, useAppSelector } from "../hooks/redux/hooks";
import { logout, selectedUser } from "../features/auth/authSlice";
import { Button } from "@mui/material";

export default function HomePage() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(selectedUser);

  const logoutHandler = () => {
    dispatch(logout());
  };
  return (
    <div
      style={{
        margin: 20,
        fontFamily: "sans-serif",
        fontSize: 24,
        width: "50%",
      }}
    >
      <h1>Home Page</h1>
      <p>
        <b>User Name:</b> {user?.name}
      </p>
      <p>
        <b>User Email:</b> {user?.email}
      </p>
      <Button fullWidth onClick={logoutHandler} variant="contained">
        Logout
      </Button>
    </div>
  );
}
