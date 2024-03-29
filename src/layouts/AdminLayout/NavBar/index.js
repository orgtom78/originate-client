import React, { useEffect } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { Avatar, Box, Divider, Drawer, Hidden, List, Typography } from "@mui/material";
import makeStyles from '@mui/styles/makeStyles';
import {
  BarChart as BarChartIcon,
  User as UserIcon,
  CreditCard as CreditCardIcon,
  DollarSign as DollarSignIcon,
  Briefcase as BriefcaseIcon,
  Truck as TruckIcon,
  BookOpen as BookOpenIcon,
  Shield as ShieldIcon,
  Repeat as RepeatIcon,
  Box as BoxIcon,
  Shuffle as ShuffleIcon,
} from "react-feather";
import NavItem from "./NavItem";

const items = [
  {
    href: "/admin/dashboard",
    icon: BarChartIcon,
    title: "Dashboard",
  },
  {
    href: "/admin/groups",
    icon: UserIcon,
    title: "Users",
  },
  {
    href: "/admin/spvs",
    icon: BoxIcon,
    title: "SPVs",
  },
  {
    href: "/admin/investors",
    icon: BriefcaseIcon,
    title: "Investors",
  },
  {
    href: "/admin/brokers",
    icon: ShuffleIcon,
    title: "Brokers",
  },
  {
    href: "/admin/suppliers",
    icon: TruckIcon,
    title: "Suppliers",
  },
  {
    href: "/admin/buyers",
    icon: DollarSignIcon,
    title: "Limit requests",
  },
  {
    href: "/admin/newinsurance",
    icon: ShieldIcon,
    title: "Insurance",
  },
  {
    href: "/admin/requests",
    icon: CreditCardIcon,
    title: "Invoices",
  },
  {
    href: "/admin/transactions",
    icon: RepeatIcon,
    title: "Transactions",
  },
  {
    href: "/admin/bookkeeping",
    icon: BookOpenIcon,
    title: "Bookkeeping",
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

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const avatar =
    "https://www.tinygraphs.com/squares/tinygraphs?theme=frogideas&numcolors=4&size=220&fmt=svg";
  const admin_name = "Admin";
  const admin_country = "Berlin, Hong Kong, Shanghai";

  const content = (
    <Box height="100%" display="flex" flexDirection="column">
      <Box alignItems="center" display="flex" flexDirection="column" p={2}>
        <Avatar
          className={classes.avatar}
          component={RouterLink}
          src={avatar}
          to="/app/account"
        />
        <Typography className={classes.name} color="textPrimary" variant="h5">
          {admin_name}
        </Typography>
        <Typography color="textSecondary" variant="body2">
          {admin_country}
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
