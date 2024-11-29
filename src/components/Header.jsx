import React from 'react';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import logo from '../assets/images/logo-nlc.jpeg'; // Assurez-vous d'avoir un logo dans ce chemin

const Header = () => {
  return (
	<AppBar position="static">
	  <Toolbar>
		<img src={logo} alt="Logo" style={{ marginRight: '10px', height: '40px' }} />
		<Typography variant="h6">
		  New Level Back Office
		</Typography>
	  </Toolbar>
	</AppBar>
  );
};

export default Header;