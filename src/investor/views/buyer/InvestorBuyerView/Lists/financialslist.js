import React, { useState, useEffect } from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  Container,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import makeStyles from '@mui/styles/makeStyles';
import PerfectScrollbar from "react-perfect-scrollbar";
import moment from "moment";
import getInitials from "src/utils/getInitials";
import NumberFormat from "react-number-format";
import { Storage } from "aws-amplify";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    maxHeight: "100%",
    maxWidth: "100%",
    margin: "auto",
    display: "block",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
  avatar: {
    marginRight: theme.spacing(2),
  },
  table: {
    minWidth: "100%",
    maxWidth: "100%",
  },
}));

const FinancialsListView = (value) => {
  const classes = useStyles();
  const [financials, setFinancials] = useState([]);

  const [selectedFinancialsIds, setSelectedFinancialsIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  useEffect(() => {
    const items = value.value;
    setFinancials(items);
  }, [value]);

  const geturl = async (input, id) => {
    if (input === "") {
      return;
    } else {
      const t = await Storage.get(input, {
        level: "private",
        identityId: id,
      });
      window.open(t, "_blank");
    }
  };

  const handleSelectAll = (event) => {
    let newSelectedFinancialsIds;

    if (event.target.checked) {
      newSelectedFinancialsIds = financials.map(
        (financials) => financials.financialsId
      );
    } else {
      newSelectedFinancialsIds = [];
    }

    setSelectedFinancialsIds(newSelectedFinancialsIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedFinancialsIds.indexOf(id);
    let newSelectedFinancialsIds = [];

    if (selectedIndex === -1) {
      newSelectedFinancialsIds = newSelectedFinancialsIds.concat(
        selectedFinancialsIds,
        id
      );
    } else if (selectedIndex === 0) {
      newSelectedFinancialsIds = newSelectedFinancialsIds.concat(
        selectedFinancialsIds.slice(1)
      );
    } else if (selectedIndex === selectedFinancialsIds.length - 1) {
      newSelectedFinancialsIds = newSelectedFinancialsIds.concat(
        selectedFinancialsIds.slice(0, -1)
      );
    } else if (selectedIndex > 0) {
      newSelectedFinancialsIds = newSelectedFinancialsIds.concat(
        selectedFinancialsIds.slice(0, selectedIndex),
        selectedFinancialsIds.slice(selectedIndex + 1)
      );
    }

    setSelectedFinancialsIds(newSelectedFinancialsIds);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <React.Fragment>
      <Container maxWidth={false}>
        <Card>
          <PerfectScrollbar>
            <Box maxWidth="100%" maxHeight="100%">
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={
                          selectedFinancialsIds.length === financials.length
                        }
                        color="primary"
                        indeterminate={
                          selectedFinancialsIds.length > 0 &&
                          selectedFinancialsIds.length < financials.length
                        }
                        onChange={handleSelectAll}
                      />
                    </TableCell>
                    <TableCell>Year</TableCell>
                    <TableCell>Revenue</TableCell>
                    <TableCell>Profit</TableCell>
                    <TableCell>Balance Sheet</TableCell>
                    <TableCell>Income Statement</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {financials.slice(0, limit).map((financials) => (
                    <TableRow
                      hover
                      key={financials.financialsId}
                      selected={
                        selectedFinancialsIds.indexOf(
                          financials.financialsId
                        ) !== -1
                      }
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={
                            selectedFinancialsIds.indexOf(
                              financials.financialsId
                            ) !== -1
                          }
                          onChange={(event) =>
                            handleSelectOne(event, financials.financialsId)
                          }
                          value="true"
                        />
                      </TableCell>
                      <TableCell>
                        <Box alignItems="center" display="flex">
                          <Avatar
                            className={classes.avatar}
                            src={financials.avatarUrl}
                          >
                            {getInitials(financials.financials_name)}
                          </Avatar>
                          <Typography color="textPrimary" variant="body1">
                            {moment(
                              financials.financials_reporting_period
                            ).format("YYYY")}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <NumberFormat
                          value={`${financials.sales}`}
                          displayType={"text"}
                          thousandSeparator={true}
                          prefix={"$"}
                        />
                      </TableCell>
                      <TableCell>
                        <NumberFormat
                          value={`${financials.net_profit}`}
                          displayType={"text"}
                          thousandSeparator={true}
                          prefix={"$"}
                        />
                      </TableCell>
                      <TableCell>
                        <Button
                          label="Download"
                          color="primary"
                          target="_blank"
                          onClick={() =>
                            geturl(
                              financials.balance_sheet_attachment,
                              financials.identityId
                            )
                          }
                        >
                          Download
                        </Button>
                      </TableCell>
                      <TableCell>
                        <Button
                          label="Download"
                          color="primary"
                          target="_blank"
                          onClick={() =>
                            geturl(
                              financials.income_statement_attachment,
                              financials.identityId
                            )
                          }
                        >
                          Download
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </PerfectScrollbar>
          <TablePagination
            component="div"
            count={financials.length}
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleLimitChange}
            page={page}
            rowsPerPage={limit}
            rowsPerPageOptions={[5, 10, 25]}
          />
        </Card>
      </Container>
    </React.Fragment>
  );
};

export default FinancialsListView;
