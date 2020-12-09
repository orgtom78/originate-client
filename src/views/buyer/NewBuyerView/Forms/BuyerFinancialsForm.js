import React, { useEffect, useState } from 'react';
import {
  InputField,
  DatePickerField,
  UploadField,
} from "../FormFields";
import {
  Card,
  CardContent,
  Divider,
  Grid,
  makeStyles
} from '@material-ui/core';
import { useFormikContext } from 'formik';
import { Storage } from "aws-amplify"; 
import LoaderButton from 'src/components/LoaderButton.js';
import { green } from '@material-ui/core/colors';
import { Upload as UploadIcon } from 'react-feather';


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

  export default function BuyerFinancialsForm(props) {
    const classes = useStyles();
    const {
      formField: {
        ebit,
        financials_attachment,
        net_profit,
        financials_rating,
        financials_reporting_period,
        sales,
        total_assets
      },
    } = props;

    const { values: formValues } = useFormikContext();
    const updatefields = { values: formValues };
    const finattachment = updatefields.values.financials_attachment;
  
    const [img, setImg ] = useState('');
    const [updateregcertpdf, setUpdateregcertpdf ] = useState(''); 
  
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
      if (finattachment) {
        async function geturl () {
          var uploadext = finattachment.split('.').pop(); 
          var imageExtensions = ["jpg", "jpeg", "bmp", "gif", "png"]
          const d  = imageExtensions.includes(uploadext)
          if (d === true){
          const u = await Storage.vault.get(finattachment);
          setImg(u)
        } else {
          const h = await Storage.vault.get(finattachment);
          setUpdateregcertpdf(h)
        }
        }; geturl()
      }
    }, 
    [finattachment]);
  
    async function handleClick(){
        setSuccess(false);
        setLoading(true);
        const b = await img;
        if (b) {
          setSuccess(true);
          setLoading(false);
        }
      }
      function isimageorpdf(){
        if (img) {
          return(
            <>
            <img className={classes.img} alt="complex" src={img} />
            </>
            )
        } 
        else {
          return (
            <>
            <iframe
            title="file"
            style={{ width: '100%', height: '100%' }}
            src={updateregcertpdf}
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
              <InputField
                name={ebit.name}
                label={ebit.label}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputField
                name={net_profit.name}
                label={net_profit.label}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputField
                name={financials_rating.name}
                label={financials_rating.label}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputField
                name={sales.name}
                label={sales.label}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputField
                name={total_assets.name}
                label={total_assets.label}
                fullWidth
                variant="outlined"
              />
            </Grid>
          <Grid item xs={12} sm={6}>
          <DatePickerField
            name={financials_reporting_period.name}
            label={financials_reporting_period.label}
            format="yyyy"
            views={["year"]}
            minDate={new Date("2000/12/31")}
            maxDate={new Date()}
            fullWidth
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
            {finattachment ?            
            (
              <>
                {isimageorpdf()}
              </>
            )   :    

             (
              <>
              <UploadField
                name = {financials_attachment.name}
                id = {financials_attachment.name}
                accept="image/*,application/pdf"
                style={{ display: 'none' }}
              />
              <label htmlFor={financials_attachment.name}>
              <LoaderButton
                id={financials_attachment.name}
                fullWidth
                component="span"
                startIcon={<UploadIcon />}
                disabled={loading}
                success={success}
                loading={loading}
                onClick={handleClick}
              >
                {" "}
                Buyer financial report*
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