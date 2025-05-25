import React, { useState } from "react";
import MovieIcon from "@mui/icons-material/Movie";
import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Container,
  Slide,
  useScrollTrigger,
  Box,
  Typography
} from "@mui/material";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleDrawerToggle = () => {
    setIsOpen((prev) => !prev);
  };

  const trigger = useScrollTrigger({
    target: typeof window !== "undefined" ? window : undefined,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      <AppBar position="sticky">
        <Container maxWidth="lg">
          <Toolbar>
            <IconButton
              color="inherit"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>

            <Typography
              component={Link}
              to="/"
              variant="h6"
              color="inherit"
              sx={{ textDecoration: "none", flexGrow: 1 }}
            >Betflix
            </Typography>
            <Drawer anchor="left" open={isOpen} onClose={handleDrawerToggle}>
              <Box sx={{ width: 250 }} role="presentation" onClick={handleDrawerToggle}>
                <List>
                  <ListItem disablePadding>
                    <ListItemButton component={Link} to="/movie">
                      <ListItemIcon>
                        <MovieIcon />
                      </ListItemIcon>
                      <ListItemText primary="Фильмы" />
                    </ListItemButton>
                  </ListItem>
                </List>
              </Box>
            </Drawer>
          </Toolbar>
        </Container>
      </AppBar>
    </Slide>
  );
};

export default Navbar;
