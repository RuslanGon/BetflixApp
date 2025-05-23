import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../../Navbar.jsx";
import Footer from "./Footer.jsx";
import { Container } from "@mui/material";

const Layout = () => {
  return (
    <Container fixed>
      <Navbar />
      <Outlet />
      <Footer />
    </Container>
  );
};

export default Layout;
