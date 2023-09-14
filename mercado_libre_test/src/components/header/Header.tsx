import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';

import logo from '../../logo__ml.png';

const pages = ['Usuario', 'Vendedor'];

function Header() {
  const handleNavigate = (page: string) => {
    if (page === "Vendedor") window.history.pushState({sellerId: "181758050"}, "", `http://localhost:3000/seller_info`);
    else window.history.pushState({}, "", "http://localhost:3000/");

    window.history.go();
  };

  return (
    <AppBar position="static" sx={{backgroundColor: '#fff159'}}>
      <Container>
        <Toolbar disableGutters>
          <Box sx={{display: { xs: 'none', md: 'flex' }, marginRight: 10}}>
            <img src={logo} alt="Logo" />
          </Box>

          <Box sx={{display: { xs: 'flex', md: 'none' }}}>
            <img src={logo} alt="Logo" />
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={() => handleNavigate(page)}
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