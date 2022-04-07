import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import clsx from "clsx";
import { Box, Button } from "@mui/material";

import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
  root: {},
  importButton: {
    marginRight: theme.spacing(1),
  },
  exportButton: {
    marginRight: theme.spacing(1),
  },
}));

const Toolbar = ({ className, ...rest }) => {
  const classes = useStyles();

  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <Box display="flex" justifyContent="flex-end">
        <Link to={`/admin/newbuyer/`}>
          <Button color="primary" variant="contained">
            Add Buyer
          </Button>
        </Link>
      </Box>
    </div>
  );
};

Toolbar.propTypes = {
  className: PropTypes.string,
};

export default Toolbar;
