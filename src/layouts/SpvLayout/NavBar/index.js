import React, { useState, useEffect } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { Avatar, Box, Divider, Drawer, Hidden, List, Typography } from "@mui/material";
import makeStyles from '@mui/styles/makeStyles';
import {
  BarChart as BarChartIcon,
  Settings as SettingsIcon,
  User as UserIcon,
  CreditCard as CreditCardIcon,
  DollarSign as DollarSignIcon,
  Home as HomeIcon,
} from "react-feather";
import NavItem from "./NavItem";
import { Storage } from "aws-amplify";
import { Auth, API, graphqlOperation } from "aws-amplify";
import * as queries from "src/graphql/queries.js";

const items = [
  {
    href: "/spv/dashboard",
    icon: BarChartIcon,
    title: "Dashboard",
  },
  {
    href: "/spv/limits",
    icon: DollarSignIcon,
    title: "New Limits",
  },
  {
    href: "/spv/obligors",
    icon: UserIcon,
    title: "Obligors",
  },
  {
    href: "/spv/requests",
    icon: CreditCardIcon,
    title: "Invoices",
  },
  {
    href: "/spv/bank",
    icon: HomeIcon,
    title: "Bank",
  },
  {
    href: "/spv/settings",
    icon: SettingsIcon,
    title: "Settings",
  },
];

const useStyles = makeStyles(() => ({
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
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
  }, [location.pathname]);

  const [avatar, setAvatar] = useState("");
  const [spv_name, setSpv_name] = useState("");
  const [spv_country, setSpv_country] = useState("");
  //const [spv_industry, setSpv_industry] = useState("");
  //const [spv_logo, setSpv_logo] = useState("");

  useEffect(() => {
    // attempt to fetch the info of the user that was already logged in
    async function onLoad() {
      let user = await Auth.currentAuthenticatedUser();
      const { attributes = {} } = user;
      const b = attributes["custom:groupid"];
      let filter = { userId: { eq: b } };
      const {
        data: {
          listSpvs: { items: itemsPage1, nextToken },
        },
      } = await API.graphql(
        graphqlOperation(queries.listSpvs, { filter: filter })
      );
      const n = { data: { listSpvs: { items: itemsPage1, nextToken } } };
      const spv = n.data.listSpvs.items[0];
      if (spv) {
        const {
          spv_name,
          spv_country,
          //spv_industry,
          spv_logo,
        } = spv;
        setSpv_name(spv_name);
        setSpv_country(spv_country);
        //setSpv_industry(spv_industry);
        //setSpv_logo(spv_logo);
        const z = await Storage.vault.get(spv_logo);
        setAvatar(z);
      } else {
        return;
      }
    }
    onLoad();
  }, []);

  const content = (
    <Box height="100%" display="flex" flexDirection="column">
      <Box alignItems="center" display="flex" flexDirection="column" p={2}>
        <Avatar
          className={classes.avatar}
          component={RouterLink}
          src={avatar}
          to="/spv"
        />
        <Typography className={classes.name} color="textPrimary" variant="h5">
          {spv_name}
        </Typography>
        <Typography color="textSecondary" variant="body2">
          {spv_country}
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
