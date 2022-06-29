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
  Truck as TruckIcon,
} from "react-feather";
import NavItem from "./NavItem";
import { Storage } from "aws-amplify";
import { Auth, API, graphqlOperation } from "aws-amplify";
import * as queries from "src/graphql/queries.js";

const items = [
  {
    href: "/broker/dashboard",
    icon: BarChartIcon,
    title: "Dashboard",
  },
  {
    href: "/broker/suppliers",
    icon: TruckIcon,
    title: "1. Add Supplier",
  },
  {
    href: "/broker/limits",
    icon: DollarSignIcon,
    title: "2. Request Limits",
  },
  {
    href: "/broker/obligors",
    icon: UserIcon,
    title: "Debtor List",
  },
  {
    href: "/broker/requests",
    icon: CreditCardIcon,
    title: "Invoice List",
  },
  {
    href: "/broker/settings",
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
  const [broker_name, setBroker_name] = useState("");
  const [broker_country, setBroker_country] = useState("");
  //const [broker_industry, setBroker_industry] = useState("");
  //const [broker_logo, setBroker_logo] = useState("");

  useEffect(() => {
    // attempt to fetch the info of the user that was already logged in
    async function onLoad() {
      let user = await Auth.currentAuthenticatedUser();
      const { attributes = {} } = user;
      const b = attributes["custom:groupid"];
      let filter = { userId: { eq: b } };
      const {
        data: {
          listBrokers: { items: itemsPage1, nextToken },
        },
      } = await API.graphql(
        graphqlOperation(queries.listBrokers, { filter: filter })
      );
      const n = { data: { listBrokers: { items: itemsPage1, nextToken } } };
      const broker = n.data.listBrokers.items[0];
      if (broker) {
        const {
          broker_name,
          broker_country,
          //broker_industry,
          broker_logo,
        } = broker;
        setBroker_name(broker_name);
        setBroker_country(broker_country);
        //setBroker_industry(broker_industry);
        //setBroker_logo(broker_logo);
        const z = await Storage.vault.get(broker_logo);
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
          to="/broker"
        />
        <Typography className={classes.name} color="textPrimary" variant="h5">
          {broker_name}
        </Typography>
        <Typography color="textSecondary" variant="body2">
          {broker_country}
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
