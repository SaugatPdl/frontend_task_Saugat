import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import { AppBar, Toolbar, Typography, Button, CssBaseline, Container, IconButton, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import store from './app/store';
import ServicesList from './features/services/ServicesList';
import theme from './theme';
import './App.css';

function App() {
  const [menuAnchor, setMenuAnchor] = useState(null);

  const handleMenuOpen = (event) => {
    setMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
  };

  const handleScroll = (id) => {
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
    handleMenuClose();
  };

  const navItems = [
    'Frontier Technologies',
    'Training & Capacity Building',
    'GIS Mapping & Analysis',
    'Data Collection & Visualization',
    'Creative Graphic Design',
    'ICT & Digital Development Research',
    'Software & Apps Development'
  ];

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="App">
          <AppBar position="static" sx={{ backgroundColor: '#2c3e50' }}>
            <Toolbar>
              <Typography variant="h6" sx={{ flexGrow: 1, textAlign: 'center' }}>
                Our Services
              </Typography>
              <IconButton
                color="inherit"
                onClick={handleMenuOpen}
                sx={{ display: { xs: 'block', sm: 'none' }, position: 'absolute', right: 0 }}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                anchorEl={menuAnchor}
                open={Boolean(menuAnchor)}
                onClose={handleMenuClose}
              >
                {navItems.map((title, index) => (
                  <MenuItem key={index} onClick={() => handleScroll(`service-${index + 1}`)}>
                    {title}
                  </MenuItem>
                ))}
              </Menu>
              <div sx={{ display: { xs: 'none', sm: 'block' } }}>
                {navItems.map((title, index) => (
                  <Button key={index} color="inherit" onClick={() => handleScroll(`service-${index + 1}`)}>
                    {title}
                  </Button>
                ))}
              </div>
            </Toolbar>
          </AppBar>
          <Container sx={{ mt: 4 }}>
            <ServicesList />
          </Container>
        </div>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
