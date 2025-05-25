import React, { useState } from "react";
import MovieIcon from '@mui/icons-material/Movie';
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
  Box
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleDrawerToggle = () => {
    setIsOpen((prevState) => !prevState);
  };

  const trigger = useScrollTrigger({
    target: typeof window !== "undefined" ? window : undefined,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      <AppBar position="sticky">
        <Container maxWidth="lg">
          <Toolbar>
            <IconButton color="inherit" onClick={handleDrawerToggle}>
              <MenuIcon />
            </IconButton>
            <Drawer anchor="left" open={isOpen} onClose={handleDrawerToggle}>
              <Box sx={{width: 250}} onClick={handleDrawerToggle}>
              <List>
                <ListItem disablePadding>
                  <ListItemIcon>
                   <MovieIcon />
                  </ListItemIcon>
                  <ListItemButton>
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
