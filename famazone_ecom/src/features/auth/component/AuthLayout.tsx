import React from "react";
import { Grid } from "@mui/material";

interface PropType {
  children: React.ReactNode;
}

// children - wrapping our signing and register component
export default function AuthLayout({ children }: PropType) {
  return (
    <Grid
      sx={{ p: 2 }}
      container
      direction={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      minHeight={"100vh"}
    >
      <img src="FamazoneEcom-logos.jpeg" alt="logo" height={150} />
      <main>{children}</main>
    </Grid>
  );
}
