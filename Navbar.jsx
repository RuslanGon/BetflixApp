import React from 'react'
import useState from 'react'

const Navbar = () => {

  const [isOpen, setIsOpen] = useState(false);

  const handleDrawerToggle = () => {
    setIsOpen((prevState) => !prevState);
  };  

  return (
    <AppBar position="static">
    <Toolbar>
      <IconButton
        color="inherit"
      >
        <MenuIcon />
      </IconButton>
      <List>
          <ListItem  disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
      </List>

    </Toolbar>
  </AppBar>
  )
}

export default Navbar