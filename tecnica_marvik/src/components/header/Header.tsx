import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import logo from '../../logo__ml.png';

const pages = ['Usuario', 'Vendedor'];

function Header() {
  const [open, setOpen] = React.useState<undefined | HTMLElement>(undefined);

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(undefined);
  };

  return (
    <AppBar position="static" sx={{backgroundColor: '#fff159'}}>
      <Container>
        <Toolbar disableGutters>
          <Box sx={{display: { xs: 'none', md: 'flex' }, marginRight: 10}}>
            <img src={logo} alt="Logo" />
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' }}}>
            <IconButton
              size="large"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenMenu}
            >
              <MenuIcon sx={{color: '#333'}}/>
            </IconButton>
            
            <Menu
              id="menu-appbar"
              anchorEl={open}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(open)}
              onClose={handleCloseMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseMenu}>
                  <div style={{alignSelf: "center"}}>{page}</div>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Box sx={{display: { xs: 'flex', md: 'none' }}}>
            <img src={logo} alt="Logo" />
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseMenu}
                sx={{ my: 2, color: '#333', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;