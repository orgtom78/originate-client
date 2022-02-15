import React, { useState } from "react";
import {
  Avatar,
  Box,
  Card,
  Container,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  makeStyles,
} from "@material-ui/core";
import PerfectScrollbar from "react-perfect-scrollbar";
import Page from "src/components/Page";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
  avatar: {
    marginRight: theme.spacing(2),
  },
}));

const AdminCompanyIDListView = (input) => {
  const classes = useStyles();
  const [selectedCompanyIds, setSelectedCompanyIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [company, setCompany] = useState([]);
  const [companyName, setCompanyName] = useState("");
  const [companyCreation, setCompanyCreation] = useState("");

  React.useEffect(() => {
    const getData = async () => {
      if (Object.keys(input).length === 0 && input.constructor === Object) {
        console.log("test");
      } else {
        Object.entries(input).forEach(([key, value]) => {
          const {
            legalData: { creationDate },
          } = input;
          const {
            legalData: { companyName },
          } = input;
          setCompanyCreation(creationDate);
          setCompanyName(companyName);
          if (key === "companyId") {
            setCompany(`${value}`);
          }
        });
        //const res = Object.entries(input);
        //console.log(res);
      }
    };
    getData();
  }, [input]);

  const handleSelectAll = (event) => {
    let newSelectedCompanyIds;

    if (event.target.checked) {
      newSelectedCompanyIds = company.map((company) => company.companyId);
    } else {
      newSelectedCompanyIds = [];
    }

    setSelectedCompanyIds(newSelectedCompanyIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedCompanyIds.indexOf(id);
    let newSelectedCompanyIds = [];

    if (selectedIndex === -1) {
      newSelectedCompanyIds = newSelectedCompanyIds.concat(
        selectedCompanyIds,
        id
      );
    } else if (selectedIndex === 0) {
      newSelectedCompanyIds = newSelectedCompanyIds.concat(
        selectedCompanyIds.slice(1)
      );
    } else if (selectedIndex === selectedCompanyIds.length - 1) {
      newSelectedCompanyIds = newSelectedCompanyIds.concat(
        selectedCompanyIds.slice(0, -1)
      );
    } else if (selectedIndex > 0) {
      newSelectedCompanyIds = newSelectedCompanyIds.concat(
        selectedCompanyIds.slice(0, selectedIndex),
        selectedCompanyIds.slice(selectedIndex + 1)
      );
    }

    setSelectedCompanyIds(newSelectedCompanyIds);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <Page title="Company IDs">
      <React.Fragment>
        <Container maxWidth="lg">
          <Card>
            <PerfectScrollbar>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Company's Name</TableCell>
                    <TableCell>Euler ID</TableCell>
                    <TableCell>Incorporation Date</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <Box alignItems="center" display="flex">
                        <Avatar
                          className={classes.avatar}
                          src={`${company.company_logo}`}
                        ></Avatar>
                        <Typography color="textPrimary" variant="body1">
                          {companyName}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{`${company}`}</TableCell>
                    <TableCell>
                      {moment(companyCreation).format("DD/MM/YYYY")}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </PerfectScrollbar>
            <TablePagination
              component="div"
              count={company.length}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleLimitChange}
              page={page}
              rowsPerPage={limit}
              rowsPerPageOptions={[5, 10, 25]}
            />
          </Card>
        </Container>
      </React.Fragment>
    </Page>
  );
};

export default AdminCompanyIDListView;
