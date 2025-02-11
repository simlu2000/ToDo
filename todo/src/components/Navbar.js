import { AppBar, Toolbar, IconButton, Typography, Stack, Button } from "@mui/material";
import todoLogo from '../utils/TODO.png';
import { Link } from "react-router-dom";  // Solo Link, niente Router

function Navbar() {
  return (
    <div>
      <AppBar position='static'
        sx={{
          width: "auto",
          marginLeft: "1%",
          marginRight: "1%",
          marginTop: "1%",
          backgroundColor: "#DF2935",
          borderRadius: "25px"
        }}>
        <Toolbar >
          <IconButton size='large' edge='start' color='inherit' aria-label='logo' sx={{ width: 80 }}>
            <img id="logoNavBar" src={todoLogo} style={{ width: '100%' }} />
          </IconButton>
          <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
            TODO
          </Typography>
          <Stack direction='row' spacing={8} sx={{ fontSize: 50}} >
            <Button component={Link} to="/" color='inherit' style={{fontSize: '1.2rem'}}>Dashboard</Button>
            <Button component={Link} to="/graphs" color='inherit' style={{fontSize: '1.2rem'}}>Graphs</Button>
            <Button component={Link} to="/about" color='inherit' style={{fontSize: '1.2rem'}}>About</Button>
            <Button component={Link} to="/login" color='inherit' style={{fontSize: '1.2rem'}}>Login</Button>
          </Stack>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Navbar;
