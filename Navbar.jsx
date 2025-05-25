import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Container,
  Slide,
  useScrollTrigger
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleDrawerToggle = () => {
    setIsOpen((prevState) => !prevState);
  };

  // Скрытие AppBar при скролле
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
            <Drawer
              anchor="left"
              open={isOpen}
              onClose={handleDrawerToggle}
            >
              <List sx={{ width: 250 }}>
                <ListItem disablePadding>
                  <ListItemButton sx={{ textAlign: "center" }}>
                    <ListItemText primary="Фильмы" />
                  </ListItemButton>
                </ListItem>
              </List>
            </Drawer>
          </Toolbar>
        </Container>
      </AppBar>
    </Slide>
  );
};

export default Navbar;
