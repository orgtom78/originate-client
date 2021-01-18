import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  InputField,
  DatePickerField,
  UploadField,
} from "src/components/FormFields";
import {
  Card,
  CardContent,
  Divider,
  Grid,
  makeStyles,
} from "@material-ui/core";
import {
  Upload as UploadIcon
} from 'react-feather';
import { useFormikContext } from 'formik';
import { Storage } from "aws-amplify"; 
import LoaderButton from 'src/components/LoaderButton.js';
import { green } from '@material-ui/core/colors';

const useStyles = makeStyles(() => ({
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
  root: {
    display: 'flex',
    alignItems: 'center',
  },
  wrapper: {
    margin: 'auto',
    position: 'relative',
  },
  buttonSuccess: {
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700],
    },
  },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
}));

  export default function HistoryForm(props) {
    const classes = useStyles();
    const {
      formField: {
        buyer_insurance_name,
        buyer_one_off_ipu_attachment,
        buyer_next_year_projected_transaction_amount,
        buyer_previous_year_transaction_amount,
        buyer_reporting_year,
        buyer_reporting_year_transaction_amount,
        buyer_previous_year_number_invoices,
      },
    } = props;

    const { id } = useParams();
    const dirId = props.dir;
    const uboId = props.ubo;
    const { ident } = useParams();
    const { values: formValues } = useFormikContext();
    const updatefields = { values: formValues };
    const buyeripu = updatefields.values.buyer_one_off_ipu_attachment;
    const [ipuimg, setIpuimg ] = useState('');
    const [ipupdf, setIpupdf ] = useState(''); 
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
  
    useEffect(() => {
      if (buyeripu) {
        async function geturl() {
          var uploadext = buyeripu.split(".").pop();
          var imageExtensions = ["jpg", "jpeg", "bmp", "gif", "png"];
          const d = imageExtensions.includes(uploadext);
          if (d === true) {
            const u = await Storage.get(buyeripu, {
              level: "private",
              identityId: ident,
            });
            setIpuimg(u);
          } else {
            const h = await Storage.get(buyeripu, {
              level: "private",
              identityId: ident,
            });
            setIpupdf(h);
          }
        }
        geturl();
      }
    }, [buyeripu, ident]);
  
    async function handleClick(){
        setSuccess(false);
        setLoading(true);
        const b = await buyeripu;
        if (b) {
          setSuccess(true);
          setLoading(false);
        }
      }
      
      function isimageorpdf(){
        if (ipuimg) {
          return(
            <>
            <img className={classes.img} alt="complex" src={ipuimg} />
            </>
            )
        } 
        else {
          return (
            <>
            <iframe
            title="file"
            style={{ width: '100%', height: '100%' }}
            src={ipupdf}
            />
            </>
          ) 
        }
      }
    
    return (
      <React.Fragment>
          <Card>
          <Divider />
          <CardContent>
        <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <DatePickerField
            name={buyer_reporting_year.name}
            label={buyer_reporting_year.label}
            format="yyyy"
            views={["year"]}
            minDate={new Date("2000/12/31")}
            maxDate={new Date()}
            fullWidth
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
            <InputField
              name={buyer_next_year_projected_transaction_amount.name}
              label={buyer_next_year_projected_transaction_amount.label}
              fullWidth
              variant="outlined"
            />
          </Grid>

        <Grid item xs={12} sm={6}>
            <InputField
              name={buyer_reporting_year_transaction_amount.name}
              label={buyer_reporting_year_transaction_amount.label}
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <InputField
              name={buyer_previous_year_transaction_amount.name}
              label={buyer_previous_year_transaction_amount.label}
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <InputField
              name={buyer_previous_year_number_invoices.name}
              label={buyer_previous_year_number_invoices.label}
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <InputField
              name={buyer_insurance_name.name}
              label={buyer_insurance_name.label}
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
              {buyeripu ? 
              (
                <>
                  {isimageorpdf()}
                </>
              ) 
              : 
              (
                <>
                  <UploadField
                    name={buyer_one_off_ipu_attachment.name}
                    id={buyer_one_off_ipu_attachment.name}
                    accept="image/*,application/pdf"
                    style={{ display: "none" }}
                  />
                  <label htmlFor={buyer_one_off_ipu_attachment.name}>
                    <LoaderButton
                      id={buyer_one_off_ipu_attachment.name}
                      fullWidth
                      component="span"
                      startIcon={<UploadIcon />}
                      disabled={loading}
                      success={success}
                      loading={loading}
                      onClick={handleClick}
                    >
                      {" "}
                      Executed Irrevocable Payment Undertaking*
                    </LoaderButton>
                  </label>
                </>
              )
              }
            </Grid>
        </Grid>
        </CardContent>
        </Card>
      </React.Fragment>
    );
  }
  