import React, { useState, useEffect } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import {
  Avatar,
  Box,
  Collapse,
  Divider,
  Drawer,
  Hidden,
  List,
  ListItemButton,
  Typography,
  makeStyles,
} from "@material-ui/core";
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
    href: "/investor/dashboard",
    icon: BarChartIcon,
    title: "Dashboard",
  },
  {
    href: "/investor/requests",
    icon: DollarSignIcon,
    title: "New Limits",
  },
  {
    href: "/investor/obligors",
    icon: UserIcon,
    title: "Obligors",
  },
  {
    href: "/investor/transactions",
    icon: CreditCardIcon,
    title: "Transactions",
  },
  {
    href: "/investor/bank",
    icon: HomeIcon,
    title: "Bank",
  },
  {
    href: "/investor/settings",
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const [avatar, setAvatar] = useState("");
  const [investor_name, setInvestor_name] = useState("");
  const [investor_country, setInvestor_country] = useState("");
  //const [investor_industry, setInvestor_industry] = useState("");
  //const [investor_logo, setInvestor_logo] = useState("");

  useEffect(() => {
    // attempt to fetch the info of the user that was already logged in
    async function onLoad() {
      let user = await Auth.currentAuthenticatedUser();
      const { attributes = {} } = user;
      const b = attributes["custom:groupid"];
      let filter = { userId: { eq: b } };
      const {
        data: {
          listInvestors: { items: itemsPage1, nextToken },
        },
      } = await API.graphql(
        graphqlOperation(queries.listInvestors, { filter: filter })
      );
      const n = { data: { listInvestors: { items: itemsPage1, nextToken } } };
      const investor = n.data.listInvestors.items[0];
      if (investor) {
        const {
          investor_name,
          investor_country,
          //investor_industry,
          investor_logo,
        } = investor;
        setInvestor_name(investor_name);
        setInvestor_country(investor_country);
        //setInvestor_industry(investor_industry);
        //setInvestor_logo(investor_logo);
        const z = await Storage.vault.get(investor_logo);
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
          to="/investor"
        />
        <Typography className={classes.name} color="textPrimary" variant="h5">
          {investor_name}
        </Typography>
        <Typography color="textSecondary" variant="body2">
          {investor_country}
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

           <NavItem
              href={''}
              key={''}
              title={'Test'}
              icon={''}
            />
        </List>
      </Box>
    </Box>
  );

  return (
    <>
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
      <Hidden mdDown>
        <Drawer
          anchor="left"
          classes={{ paper: classes.desktopDrawer }}
          open
          variant="persistent"
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
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
