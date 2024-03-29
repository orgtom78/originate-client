import React, { useState, useEffect } from "react";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import { Auth } from "aws-amplify";
import PropTypes from "prop-types";
import { Avatar, Box, Divider, Drawer, Hidden, List, Paper, Typography } from "@mui/material";
import makeStyles from '@mui/styles/makeStyles';
import {
  BarChart as BarChartIcon,
  Settings as SettingsIcon,
  User as UserIcon,
  UserPlus as UserPlusIcon,
  CreditCard as CreditCardIcon,
  DollarSign as DollarSignIcon,
} from "react-feather";
import NavItem from "./NavItem";
import { Storage } from "aws-amplify";
import { useUser } from "src/components/context/usercontext.js";
import { grey } from '@mui/material/colors';

const items = [
  {
    href: "/app/dashboard",
    icon: BarChartIcon,
    title: "Dashboard",
  },
  {
    href: "/app/account",
    icon: UserIcon,
    title: "My Profile",
  },
  {
    href: "/app/newbuyer",
    icon: UserPlusIcon,
    title: "New Buyer",
  },
  {
    href: "/app/buyers",
    icon: DollarSignIcon,
    title: "New Invoice",
  },
  {
    href: "/app/requests",
    icon: CreditCardIcon,
    title: "Invoice Status",
  },
  {
    href: "/app/settings",
    icon: SettingsIcon,
    title: "Settings",
  },
];

const useStyles = makeStyles((theme) => ({
  mobileDrawer: {
    width: 256,
  },
  desktopDrawer: {
    width: 256,
    top: 64,
    height: "calc(100% - 64px)",
  },
  avatar: {
    cursor: "pointer",
    width: 64,
    height: 64,
  },
}));

const NavBar = ({ onMobileClose, openMobile }) => {
  const classes = useStyles();
  const location = useLocation();
  const navigate = useNavigate();
  const [isAuthenticated, userHasAuthenticated] = useState();

  async function handleLogout() {
    await Auth.signOut();
    userHasAuthenticated(false);
    navigate("/");
    window.location.reload();
  }

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const [avatar, setAvatar] = useState("");
  const [supplier_name, setSupplier_name] = useState("");
  const [supplier_country, setSupplier_country] = useState("");
  //const [supplier_industry, setSupplier_industry] = useState("");
  const [supplier_logo, setSupplier_logo] = useState("");
  const context = useUser();

  React.useEffect(() => {
    // attempt to fetch the info of the user that was already logged in
    async function onLoad() {
      const data = await context;
      const {
        supplier_name,
        supplier_country,
        //supplier_industry,
        supplier_logo,
      } = data;
      setSupplier_name(supplier_name);
      setSupplier_country(supplier_country);
      //setSupplier_industry(supplier_industry);
      setSupplier_logo(supplier_logo);
      const z = await Storage.vault.get(supplier_logo);
      setAvatar(z);
    }
    onLoad();
  }, [context]);

  const content = (
    <Box height="100%" display="flex" flexDirection="column">
      <Box
        alignItems="center"
        display="flex"
        flexDirection="column"
        justifyContent="flex-start"
        p={2}
      >
        <Avatar
          className={classes.avatar}
          component={RouterLink}
          src={avatar}
          to="/app/account"
        />
        <Typography className={classes.name} color="textPrimary" variant="h5">
          {supplier_name}
        </Typography>
        <Typography color="textSecondary" variant="body2">
          {supplier_country}
        </Typography>
      </Box>
      <Divider />
      <Box p={2}>
        <List>
          {items.map((item) => (
            <NavItem
              href={item.href}
              key={item.title}
              title={item.title}
              icon={item.icon}
            />
          ))}
        </List>
      </Box>
      <Box alignItems="center" display="flex" justifyContent="flex-start" p={4}>
        <Paper style={{ backgroundColor: grey.A200 }} variant="outlined">
          <Typography variant="h6"> An Issue? Contact us. </Typography>
          <Typography variant="body"> admin@originatecapital.co</Typography>
        </Paper>
      </Box>
    </Box>
  );

  return <>
    <Hidden lgUp>
      <Drawer
        anchor="left"
        classes={{ paper: classes.mobileDrawer }}
        onClose={onMobileClose}
        open={openMobile}
        variant="temporary"
      >
        {content}
      </Drawer>
    </Hidden>
    <Hidden lgDown>
      <Drawer
        anchor="left"
        classes={{ paper: classes.desktopDrawer }}
        open
        variant="persistent"
      >
        {content}
      </Drawer>
    </Hidden>
  </>;
};

NavBar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool,
};

NavBar.defaultProps = {
  onMobileClose: () => {},
  openMobile: false,
};

export default NavBar;
