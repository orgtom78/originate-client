import React, { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  InputField,
  CheckboxField,
  SelectField,
  DatePickerField,
  UploadField,
} from "../FormFields";
import {
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
  Link,
  Button,
  makeStyles
} from "@material-ui/core";
import {
  Upload as UploadIcon
} from 'react-feather';
import { useFormikContext } from 'formik';
import { Storage } from "aws-amplify"; 

const country = [
  {
    value: "germany",
    label: "Germany",
  },
  {
    value: "china",
    label: "China",
  },
  {
    value: "usa",
    label: "USA",
  },
];
const industry = [
  {
    value: "textile",
    label: "Textile",
  },
  {
    value: "fmcg",
    label: "FMCG",
  },
  {
    value: "automotive",
    label: "Automotive",
  },
];

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
}));


export default function AddressForm(props) {
  const classes = useStyles();
  const {
    formField: {
      company_name,
      company_address_city,
      company_address_street,
      company_address_postalcode,
      company_country,
      company_industry,
      date_of_incorporation,
      registration_cert_attachment,
      termsandconditions,
    },
  } = props;

  const { values: formValues } = useFormikContext();
  const updatefields = { values: formValues };
  const updateregcert = updatefields.values.registration_cert_attachment;
  console.log(updateregcert)

  const [img, setImg ] = useState('');

  useEffect(() => {
    if (updateregcert) {
      async function geturl () { 
        const u = await Storage.vault.get(updateregcert)
        setImg(u)
      }; geturl()
    }
  }, 
  [updateregcert]);

  console.log(updateregcert)
  console.log(img)


  return (
    <React.Fragment>
      <Card>
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <InputField
                name={company_name.name}
                label={company_name.label}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputField
                name={company_address_city.name}
                label={company_address_city.label}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputField
                name={company_address_street.name}
                label={company_address_street.label}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputField
                name={company_address_postalcode.name}
                label={company_address_postalcode.label}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <SelectField
                name={company_country.name}
                label={company_country.label}
                data={country}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <DatePickerField
                name={date_of_incorporation.name}
                label={date_of_incorporation.label}
                format="dd/MM/yyyy"
                minDate={new Date("1500/12/31")}
                maxDate={new Date()}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <SelectField
                name={company_industry.name}
                label={company_industry.label}
                data={industry}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={6}>
            {updateregcert ?  
            
            (
              <>
              <img className={classes.img} alt="complex" src={img}/>
              </>
            )   :    

             (
              <>
              <UploadField
                name = {registration_cert_attachment.name}
                accept="image/*,application/pdf"
                style={{ display: 'none' }}
              />
              <label htmlFor="registration_cert_attachment">
              <Button
                id="registration_cert_attachment"
                fullWidth
                color="primary"
                component="span"
                variant="contained"
                startIcon={<UploadIcon />}
              >
                {" "}
                Company registration certificate*
              </Button>
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
