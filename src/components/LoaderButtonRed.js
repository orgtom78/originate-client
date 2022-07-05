import React from "react";
import clsx from "clsx";
import { makeStyles } from "@mui/styles";
import CircularProgress from "@mui/material/CircularProgress";
import { red } from "@mui/material/colors";
import Button from "@mui/material/Button";

const useStyles = makeStyles({
  root: {
    display: "flex",
    alignItems: "center",
  },
  wrapper: {
    margin: "10px",
    position: "relative",
  },
  buttonSuccess: {
    backgroundColor: red[500],
    "&:hover": {
      backgroundColor: red[700],
    },
  },
  fabProgress: {
    color: red[500],
    position: "absolute",
    top: -6,
    left: -6,
    zIndex: 1,
  },
  buttonProgress: {
    color: red[500],
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
});

export default function LoaderButton({
  loading,
  success,
  disabled = false,
  ...props
}) {
  const classes = useStyles();
  const buttonClassname = clsx({
    [classes.buttonSuccess]: success,
  });

  return (
    <div className={classes.root}>
      <div className={classes.wrapper}>
        <Button
          variant="contained"
          color="primary"
          className={buttonClassname}
          disabled={disabled || loading}
          {...props}
        >
          {props.children}
        </Button>
        {loading && (
          <CircularProgress size={24} className={classes.buttonProgress} />
        )}
      </div>
    </div>
  );
}
