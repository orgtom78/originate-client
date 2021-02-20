import React, { useState, useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Avatar,
  Button,
  Box,
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
  makeStyles,
} from "@material-ui/core";
import PerfectScrollbar from "react-perfect-scrollbar";
import * as queries from "src/graphql/queries.js";
import { API, graphqlOperation, Storage } from "aws-amplify";
import moment from "moment";
import getInitials from "src/utils/getInitials";
import AdminUpdateDocumentView from "src/admin/views/document/AdminUpdateDocumentView";

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
    width: 650,
  },
}));

const DocumentListView = (value) => {
  const classes = useStyles();
  const { id } = useParams();
  const { buyId } = useParams();
  const { ident } = useParams();
  const [document, setDocument] = useState([]);
  const [userId, setUserId] = useState("");
  const [documentId, setDocumentId] = useState("");
  const [isclicked, setIsclicked] = useState("");

  const [selectedDocumentIds, setSelectedDocumentIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  useEffect(() => {
    async function getDocument() {
      let filter = {
        userId: { eq: id },
        sortkey: { beginsWith: "document-buyer", contains: buyId },
      };
      const {
        data: {
          listsDocument: { items: itemsPage1, nextToken },
        },
      } = await API.graphql(
        graphqlOperation(queries.listsDocument, { filter: filter })
      );
      const n = { data: { listsDocument: { items: itemsPage1, nextToken } } };
      const items = n.data.listsDocument.items;
      setDocument(items);
    }
    getDocument();
  }, [id, buyId]);

  const handler = useCallback(() => {
    if (!document || !document.length) {
      return;
    } else {
      const d = document;
      return d;
    }
  }, [document]);

  const handleSelectAll = (event) => {
    let newSelectedDocumentIds;

    if (event.target.checked) {
      newSelectedDocumentIds = document.map((document) => document.documentId);
    } else {
      newSelectedDocumentIds = [];
    }

    setSelectedDocumentIds(newSelectedDocumentIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedDocumentIds.indexOf(id);
    let newSelectedDocumentIds = [];

    if (selectedIndex === -1) {
      newSelectedDocumentIds = newSelectedDocumentIds.concat(
        selectedDocumentIds,
        id
      );
    } else if (selectedIndex === 0) {
      newSelectedDocumentIds = newSelectedDocumentIds.concat(
        selectedDocumentIds.slice(1)
      );
    } else if (selectedIndex === selectedDocumentIds.length - 1) {
      newSelectedDocumentIds = newSelectedDocumentIds.concat(
        selectedDocumentIds.slice(0, -1)
      );
    } else if (selectedIndex > 0) {
      newSelectedDocumentIds = newSelectedDocumentIds.concat(
        selectedDocumentIds.slice(0, selectedIndex),
        selectedDocumentIds.slice(selectedIndex + 1)
      );
    }

    setSelectedDocumentIds(newSelectedDocumentIds);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  function getidandident(sortkey, userId) {
    setUserId(userId);
    setDocumentId(sortkey);
    setIsclicked(true);
  }

  const geturl = async (input) => {
    if (input === "") {
      return;
    } else {
      const t = await Storage.get(input, {
        level: "private",
        identityId: ident,
      });
      window.open(t, "_blank");
    }
  };

  return (
    <React.Fragment>
      {!isclicked ? (
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
                              selectedDocumentIds.length === document.length
                            }
                            color="primary"
                            indeterminate={
                              selectedDocumentIds.length > 0 &&
                              selectedDocumentIds.length < document.length
                            }
                            onChange={handleSelectAll}
                          />
                        </TableCell>
                        <TableCell>Document Type</TableCell>
                        <TableCell>Link</TableCell>
                        <TableCell>Created at</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {document.slice(0, limit).map((document) => (
                        <TableRow
                          hover
                          key={document.documentId}
                          selected={
                            selectedDocumentIds.indexOf(document.documentId) !==
                            -1
                          }
                        >
                          <TableCell padding="checkbox">
                            <Checkbox
                              checked={
                                selectedDocumentIds.indexOf(
                                  document.documentId
                                ) !== -1
                              }
                              onChange={(event) =>
                                handleSelectOne(event, document.documentId)
                              }
                              value="true"
                            />
                          </TableCell>
                          <TableCell>
                            <Box alignItems="center" display="flex">
                              <Avatar
                                className={classes.avatar}
                                src={document.avatarUrl}
                                onClick={() =>
                                  getidandident(
                                    document.sortkey,
                                    document.userId
                                  )
                                }
                              >
                                {getInitials(document.document_type)}
                              </Avatar>
                              <Typography color="textPrimary" variant="body1">
                                {document.document_type}
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Button
                              label="Download"
                              color="primary"
                              target="_blank"
                              onClick={() =>
                                geturl(document.document_attachment)
                              }
                            >
                              Download
                            </Button>
                          </TableCell>
                          <TableCell>
                            {moment(document.document_createdAt).format(
                              "DD/MM/YYYY"
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Box>
              </PerfectScrollbar>
              <TablePagination
                component="div"
                count={document.length}
                onChangePage={handlePageChange}
                onChangeRowsPerPage={handleLimitChange}
                page={page}
                rowsPerPage={limit}
                rowsPerPageOptions={[5, 10, 25]}
              />
            </Card>
          </Container>
        </React.Fragment>
      ) : (
        <>
          <Container maxWidth={false}>
            <Card>
              <AdminUpdateDocumentView value={{ userId, documentId }} />
            </Card>
          </Container>
        </>
      )}
    </React.Fragment>
  );
};

export default DocumentListView;
