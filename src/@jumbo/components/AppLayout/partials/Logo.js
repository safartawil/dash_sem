import React from 'react';
import Hidden from '@material-ui/core/Hidden';
import { Box } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import CmtImage from '../../../../@coremat/CmtImage';

const Logo = ({ color, ...props }) => {

  return (
    <Box className="pointer" {...props}>
      <Hidden xsDown>
        <NavLink to="/">
          <CmtImage src="/images/mycolis-logo-19.png" alt="logo" style={{ height: '30px' }} />
        </NavLink>
      </Hidden>
      <Hidden smUp>
        <NavLink to="/">
          <CmtImage src="/images/mycolis-logo-19.png" alt="logo" style={{ height: '30px' }} />
        </NavLink>
      </Hidden>
    </Box>
  );
};

export default Logo;
