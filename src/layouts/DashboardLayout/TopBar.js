import React, { useState } from "react";
import { Auth } from "aws-amplify";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import clsx from "clsx";
import PropTypes from "prop-types";
import {
  AppBar,
  Badge,
  Box,
  Hidden,
  IconButton,
  Toolbar
} from "@mui/material";
import { makeStyles } from '@mui/styles'
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/NotificationsOutlined";
import InputIcon from "@mui/icons-material/Input";
import Logo from "src/components/Logo";

const useStyles = makeStyles(() => ({
  root: {},
  avatar: {
    width: 60,
    height: 60,
  },
}));

const TopBar = ({ className, onMobileNavOpen, ...rest }) => {
  const classes = useStyles();
  const [notifications] = useState([]);
  const navigate = useNavigate();

  const [isAuthenticated, userHasAuthenticated] = useState();

  async function handleLogout() {
    await Auth.signOut();
    userHasAuthenticated(false);
    navigate("/");
    window.location.reload();
  }

  return (
    <AppBar className={clsx(classes.root, className)} elevation={0} {...rest}>
      <Toolbar>
        <RouterLink to="/">
          <Logo />
        </RouterLink>
        <Box flexGrow={1} />
        <Hidden mdDown>
          <IconButton color="inherit">
            <Badge
              badgeContent={notifications.length}
              color="primary"
              variant="dot"
            >
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <IconButton color="inherit" onClick={handleLogout}>
            <InputIcon />
          </IconButton>
        </Hidden>
        <Hidden lgUp>
          <IconButton color="inherit" onClick={onMobileNavOpen}>
            <MenuIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

TopBar.propTypes = {
  className: PropTypes.string,
  onMobileNavOpen: PropTypes.func,
};

export default TopBar;
