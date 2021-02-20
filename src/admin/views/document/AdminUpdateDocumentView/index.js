import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Container,
  Divider,
  Grid,
  MenuItem,
  Select,
  Typography,
  makeStyles,
} from "@material-ui/core";
import Page from "src/components/Page";
import * as queries from "src/graphql/queries.js";
import { API, graphqlOperation } from "aws-amplify";
import * as mutations from "src/graphql/mutations.js";
import LoaderButton from "src/components/LoaderButton.js";
import { UploadCloud as UploadIcon } from "react-feather";
import { onError } from "src/libs/errorLib.js";
import { Storage } from "aws-amplify";
import { green } from "@material-ui/core/colors";

const type = [
  {
    value: "Company Credit Report",
    label: "Company Credit Report",
  },
  {
    value: "Industry Report",
    label: "Industry Report",
  },
  {
    value: "RPA",
    label: "RPA",
  },
  {
    value: "IPU",
    label: "IPU",
  },
  {
    value: "Servicing Agreement",
    label: "Servicing Agreement",
  },
];

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
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
  },
  wrapper: {
    margin: "auto",
    position: "relative",
  },
  buttonSuccess: {
    backgroundColor: green[500],
    "&:hover": {
      backgroundColor: green[700],
    },
  },
  buttonProgress: {
    color: green[500],
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
}));

const UpdateDocumentForm = ({ className, value, ...rest }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const sub = value.userId;
  const buyid = useParams();
  const docid = value.documentId;

  const [identityId, setIdentityId] = useState("");
  const [documentId, setDocumentId] = useState("");
  const [document_type, setDocument_type] = useState("");
  const [document_attachment, setDocument_attachment] = useState("");

  const [documentloading, setDocumentLoading] = useState(false);
  const [documentsuccess, setDocumentSuccess] = useState(false);

  const [documentimg, setDocumentImg] = useState("");
  const [documentpdf, setDocumentpdf] = useState("");
  const file = useRef(null);

  const doclabel = "document_attachment";
  const docname = "Document";

  useEffect(() => {
    var userId = sub;
    var sortkey = docid;
    getDocument({ userId, sortkey });
  }, [docid, sub]);

  async function getDocument(input) {
    try {
      const document = await API.graphql(
        graphqlOperation(queries.getDocument, input)
      );
      const {
        data: {
          getDocument: {
            identityId,
            documentId,
            document_attachment,
            document_type,
          },
        },
      } = document;
      setIdentityId(identityId);
      setDocumentId(documentId);
      setDocument_attachment(document_attachment);
      setDocument_type(document_type);
    } catch (err) {
      console.log("error fetching data..", err);
    }
  }

  function updateDocument(input) {
    return API.graphql(
      graphqlOperation(mutations.updateDocument, { input: input })
    );
  }

  useEffect(() => {
    if (document_attachment) {
      async function getdocumentimgurl() {
        var uploadext = document_attachment.split(".").pop();
        var imageExtensions = [
          "jpg",
          "jpeg",
          "bmp",
          "gif",
          "png",
          "tiff",
          "eps",
          "svg",
        ];
        var x = imageExtensions.includes(uploadext);
        if (x === true) {
          var y = await Storage.get(document_attachment, {
            level: "private",
            identityId: identityId,
          });
          setDocumentImg(y);
        }
      }
      getdocumentimgurl();
    }
  }, [document_attachment, sub, identityId]);

  useEffect(() => {
    if (document_attachment) {
      async function getdocumentpdfurl() {
        var uploadext = document_attachment.split(".").pop();
        var imageExtensions = ["pdf", "PDF"];
        var x = imageExtensions.includes(uploadext);
        if (x === true) {
          var y = await Storage.get(document_attachment, {
            level: "private",
            identityId: identityId,
          });
          setDocumentpdf(y);
        }
      }
      getdocumentpdfurl();
    }
  }, [document_attachment, sub, identityId]);

  function documentisimageorpdf(label, name) {
    var regex = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-/]))?/;
    if (regex.test(documentimg)) {
      return (
        <>
          <img className={classes.img} alt="complex" src={documentimg} />
          <div>
            <input
              id={documentimg}
              accept="image/*,application/pdf"
              style={{ display: "none" }}
              type="file"
              onChange={(event) => handledocumentChange(event)}
            />
            <label htmlFor={documentimg}>
              <LoaderButton
                id={documentimg}
                fullWidth
                component="span"
                startIcon={<UploadIcon />}
                disabled={documentloading}
                success={documentsuccess}
                loading={documentloading}
              >
                {" "}
                Update File
              </LoaderButton>
            </label>
          </div>
        </>
      );
    } else if (regex.test(documentpdf)) {
      return (
        <>
          <iframe
            title="file"
            style={{ width: "100%", height: "100%" }}
            allowFullScreen
            src={documentpdf}
          />
          <div>
            <input
              id={documentpdf}
              accept="image/*,application/pdf"
              style={{ display: "none" }}
              type="file"
              onChange={(event) => handledocumentChange(event)}
            />
            <label htmlFor={documentpdf}>
              <LoaderButton
                id={documentpdf}
                fullWidth
                component="span"
                startIcon={<UploadIcon />}
                disabled={documentloading}
                success={documentsuccess}
                loading={documentloading}
              >
                {" "}
                Update File
              </LoaderButton>
            </label>
          </div>
        </>
      );
    } else {
      return (
        <>
          <input
            name={label}
            id={label}
            accept="image/*,application/pdf"
            style={{ display: "none" }}
            type="file"
            onChange={(event) => handledocumentChange(event)}
          />
          <label htmlFor={label}>
            <LoaderButton
              id={label}
              fullWidth
              component="span"
              startIcon={<UploadIcon />}
              disabled={documentloading}
              success={documentsuccess}
              loading={documentloading}
            >
              {" "}
              {name}
            </LoaderButton>
          </label>
        </>
      );
    }
  }

  function handledocumentChange(event) {
    file.current = event.target.files[0];
    const newdocumentfile = file.current;
    ondocumentChange(newdocumentfile);
  }

  async function s3Up(file) {
    var userid = sub;
    var name = document_type;
    var sectorid = buyid;
    var fileExtension = file.name.split(".").pop();
    const filename = `${userid}${sectorid}${name}.${fileExtension}`;
    const stored = await Storage.put(filename, file, {
      level: "private",
      identityId: identityId,
      contentType: file.type,
    });
    return stored.key;
  }

  async function ondocumentChange(newfile) {
    setDocumentSuccess(false);
    setDocumentLoading(true);
    try {
      const u = newfile ? await s3Up(newfile) : null;
      var document_attachment = u;
      const sortkey = documentId;
      const userId = sub;
      await updateDocument({
        sortkey,
        userId,
        document_attachment,
        document_type,
      });
    } catch (e) {
      onError(e);
    }
    setDocumentSuccess(true);
    setDocumentLoading(false);
    navigate("/admin/buyers");
  }

  return (
    <Page title="Update Document">
      <Container maxWidth={false}>
        <Grid container spacing={3}>
          <Grid item sm={12} xs={12}>
            <Select
              fullWidth
              label="Document Type"
              name="document_type"
              onChange={(e) => setDocument_type(e.target.value)}
              required
              value={document_type || ""}
              variant="outlined"
            >
              {type.map((item, index) => (
                <MenuItem key={index} value={item.value}>
                  {item.label}
                </MenuItem>
              ))}
            </Select>
          </Grid>
        </Grid>
        <Divider />
        <Grid item sm={12} xs={12}>
          <>
            <Typography>Document:</Typography>
            {documentisimageorpdf(doclabel, docname)}
          </>
        </Grid>
      </Container>
    </Page>
  );
};

export default UpdateDocumentForm;
