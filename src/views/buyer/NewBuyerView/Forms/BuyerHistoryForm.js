import React, { useEffect, useState } from "react";
import {
  InputField,
  DatePickerField,
} from "src/components/FormFields";
import NewUploadField from "src/components/FormFields/NewUploadField.js";
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
import { Storage, Auth } from "aws-amplify"; 
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

    const buyerId = props.vbuyer;
    const { values: formValues } = useFormikContext();
    const updatefields = { values: formValues };
    const buyeripu = updatefields.values.buyer_one_off_ipu_attachment;
  
    const [img, setImg ] = useState('');
    const [updateregcertpdf, setUpdateregcertpdf ] = useState(''); 
  
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const [userId, setUserId] = useState('');

    useEffect(() => {
    async function getsub() {
      let user = await Auth.currentAuthenticatedUser();
      const id = await user.attributes.sub
      setUserId(id)
    } getsub();
  }, []);
  
    useEffect(() => {
      if (buyeripu) {
        async function geturl () {
          var uploadext = buyeripu.split('.').pop(); 
          var imageExtensions = ["jpg", "jpeg", "bmp", "gif", "png"]
          const d  = imageExtensions.includes(uploadext)
          if (d === true){
          const u = await Storage.vault.get(buyeripu);
          setImg(u)
        } else {
          const h = await Storage.vault.get(buyeripu);
          setUpdateregcertpdf(h)
        }
        }; geturl()
      }
    }, 
    [buyeripu]);
  
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
                  <NewUploadField
                    name={buyer_one_off_ipu_attachment.name}
                    id={buyer_one_off_ipu_attachment.name}
                    accept="image/*,application/pdf"
                    style={{ display: "none" }}
                    ident={buyerId}
                    userid={userId}
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
  