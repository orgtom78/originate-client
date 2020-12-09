import React, { useEffect, useState } from 'react';
import {
  InputField,
  SelectField,
  UploadField
} from "../FormFields";
import {
  Card,
  CardContent,
  Divider,
  Grid,
  makeStyles
} from '@material-ui/core';
import {
  Upload as UploadIcon
} from 'react-feather';
import { useFormikContext } from 'formik';
import { Storage } from "aws-amplify"; 
import LoaderButton from 'src/components/LoaderButton.js';
import { green } from '@material-ui/core/colors';
import countries from 'src/components/countries.js';
import FormikAutocomplete from 'src/views/account/NewAccountView/FormFields/AutocompleteField.js';
import { Field } from 'formik';

const cr = countries
const auto = FormikAutocomplete

const idtype = [
  {
    value: "Passport",
    label: "Passport",
  },
  {
    value: "Identification Card",
    label: "Identification Card",
  },
  {
    value: "Driver's  License",
    label: "Driver's  License",
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

  export default function ShareholderForm(props) {
    const classes = useStyles();
    const {
      formField: {
        director_name,
        director_email,
        director_phone_number, 
        director_id_attachment, 
        director_id_number, 
        director_id_type, 
        director_nationality,
        director_poa_attachment, 
        director_country_of_residence,
        ubo_name,
        ubo_email,
        ubo_phone_number, 
        ubo_id_attachment, 
        ubo_id_number, 
        ubo_id_type, 
        ubo_nationality,
        ubo_poa_attachment, 
        ubo_country_of_residence,
      },
    } = props;

    console.log(props)

    const { values: formValues } = useFormikContext();
    const updatefields = { values: formValues };
    console.log(updatefields)
    
    const director_updatepoa = updatefields.values.director_poa_attachment;
    const director_updateid = updatefields.values.director_id_attachment;
    const ubo_updatepoa = updatefields.values.ubo_poa_attachment;
    const ubo_updateid = updatefields.values.ubo_id_attachment;
  
    const [dpoaimg, setDpoaimg ] = useState('');
    const [didimg, setDidimg ] = useState('');
    const [upoaimg, setUpoaimg ] = useState('');
    const [uidimg, setUidimg ] = useState('');

    const [directoridloading, setDirectoridLoading] = useState(false);
    const [directoridsuccess, setDirectoridSuccess] = useState(false);
    const [directorpoaloading, setDirectorpoaLoading] = useState(false);
    const [directorpoasuccess, setDirectorpoaSuccess] = useState(false);
    const [uboidloading, setUboidLoading] = useState(false);
    const [uboidsuccess, setUboidSuccess] = useState(false);
    const [ubopoaloading, setUbopoaLoading] = useState(false);
    const [ubopoasuccess, setUbopoaSuccess] = useState(false);
  
    useEffect(() => {
      if (director_updateid) {
        async function getdirectoridurl() { 
          const u = await Storage.vault.get(director_updateid)
          setDidimg(u)
        }; getdirectoridurl()
      }
    }, 
    [director_updateid]);

    useEffect(() => {
      if (director_updatepoa) {
        async function getdirectorpoaurl() { 
          const u = await Storage.vault.get(director_updatepoa)
          setDpoaimg(u)
        }; getdirectorpoaurl()
      }
    }, 
    [director_updatepoa]);

    useEffect(() => {
      if (ubo_updateid) {
        async function getuboidurl() { 
          const u = await Storage.vault.get(ubo_updateid)
          setUidimg(u)
        }; getuboidurl()
      }
    }, 
    [ubo_updateid]);

    useEffect(() => {
      if (ubo_updatepoa) {
        async function getubopoaurl() { 
          const u = await Storage.vault.get(ubo_updatepoa)
          setUpoaimg(u)
        }; getubopoaurl()
      }
    }, 
    [ubo_updatepoa]);
  
    async function handleDirectorIdClick(){
        setDirectoridSuccess(false);
        setDirectoridLoading(true);
        const b = await didimg;
        if (b) {
          setDirectoridSuccess(true);
          setDirectoridLoading(false);
        }
      }
    async function handleDirectorPoaClick(){
        setDirectorpoaSuccess(false);
        setDirectorpoaLoading(true);
        const b = await dpoaimg;
        if (b) {
          setDirectorpoaSuccess(true);
          setDirectorpoaLoading(false);
        }
      }

      async function handleUboIdClick(){
        setUboidSuccess(false);
        setUboidLoading(true);
        const b = await uidimg;
        if (b) {
          setUboidSuccess(true);
          setUboidLoading(false);
        }
      }
    async function handleUboPoaClick(){
        setUbopoaSuccess(false);
        setUbopoaLoading(true);
        const b = await upoaimg;
        if (b) {
          setUbopoaSuccess(true);
          setUbopoaLoading(false);
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
              name={director_name.name}
              label={director_name.label}
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <InputField
              name={director_email.name}
              label={director_email.label}
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <InputField
              name={director_phone_number.name}
              label={director_phone_number.label}
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid
              item
              md={6}
              xs={12}
            >
              <Field
                name={director_nationality.name}
                label={director_nationality.label}
                component={auto}
                options={cr}
                getOptionLabel={(option) => option.label}
                textFieldProps={{
                  name: director_nationality.name,
                  label: director_nationality.label,
                  fullWidth: true,
                  variant: "outlined",
                  autoComplete: 'new-password', // disable autocomplete and autofill
                }}
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <Field
                name={director_country_of_residence.name}
                label={director_country_of_residence.label}
                component={auto}
                options={cr}
                getOptionLabel={(option) => option.label}
                textFieldProps={{
                  name: director_country_of_residence.name,
                  label: director_country_of_residence.label,
                  fullWidth: true,
                  variant: "outlined",
                  autoComplete: 'new-password', // disable autocomplete and autofill
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
            <SelectField
              name={director_id_type.name}
              label={director_id_type.label}
              data={idtype}
              fullWidth
              variant="outlined"
            />
          </Grid>
            <Grid item xs={6}>
            {director_updateid ?  
            
            (
              <>
              <img className={classes.img} alt="complex" src={didimg}/>
              </>
            )   :    

             (
              <>
              <UploadField
                name = {director_id_attachment.name}
                id = {director_id_attachment.name}
                accept="image/*"
                style={{ display: 'none' }}
              />
              <label htmlFor={director_id_attachment.name}>
              <LoaderButton
                id={director_id_attachment.name}
                fullWidth
                component="span"
                startIcon={<UploadIcon />}
                disabled={directoridloading}
                success={directoridsuccess}
                loading={directoridloading}
                onClick={handleDirectorIdClick}
              >
                {" "}
                Director's ID*
              </LoaderButton>
              </label>
              </>
              ) 
              }
            </Grid>

            <Grid item xs={6}>
            {director_updatepoa ?  
            
            (
              <>
              <img className={classes.img} alt="complex" src={dpoaimg}/>
              </>
            )   :    

             (
              <>
              <UploadField
                name = {director_poa_attachment.name}
                id = {director_poa_attachment.name}
                accept="image/*"
                style={{ display: 'none' }}
              />
              <label htmlFor={director_poa_attachment.name}>
              <LoaderButton
                id={director_poa_attachment.name}
                fullWidth
                component="span"
                startIcon={<UploadIcon />}
                disabled={directorpoaloading}
                success={directorpoasuccess}
                loading={directorpoaloading}
                onClick={handleDirectorPoaClick}
              >
                {" "}
                Director's proof of address*
              </LoaderButton>
              </label>
              </>
              ) 
              }
            </Grid>

            <Grid item xs={12} sm={6}>
            <InputField
              name={ubo_name.name}
              label={ubo_name.label}
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <InputField
              name={ubo_email.name}
              label={ubo_email.label}
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <InputField
              name={ubo_phone_number.name}
              label={ubo_phone_number.label}
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid
              item
              md={6}
              xs={12}
            >
              <Field
                name={ubo_nationality.name}
                label={ubo_nationality.label}
                component={auto}
                options={cr}
                getOptionLabel={(option) => option.label}
                textFieldProps={{
                  name: ubo_nationality.name,
                  label: ubo_nationality.label,
                  fullWidth: true,
                  variant: "outlined",
                  autoComplete: 'new-password', // disable autocomplete and autofill
                }}
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <Field
                name={ubo_country_of_residence.name}
                label={ubo_country_of_residence.label}
                component={auto}
                options={cr}
                getOptionLabel={(option) => option.label}
                textFieldProps={{
                  name: ubo_country_of_residence.name,
                  label: ubo_country_of_residence.label,
                  fullWidth: true,
                  variant: "outlined",
                  autoComplete: 'new-password', // disable autocomplete and autofill
                }}
              />
            </Grid>
          <Grid item xs={12} sm={6}>
            <SelectField
              name={ubo_id_type.name}
              label={ubo_id_type.label}
              data={idtype}
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item xs={6}>
            {ubo_updateid ?  
            
            (
              <>
              <img className={classes.img} alt="complex" src={uidimg}/>
              </>
            )   :    

             (
              <>
              <UploadField
                name = {ubo_id_attachment.name}
                id = {ubo_id_attachment.name}
                accept="image/*"
                style={{ display: 'none' }}
              />
              <label htmlFor={ubo_id_attachment.name}>
              <LoaderButton
                id={ubo_id_attachment.name}
                fullWidth
                component="span"
                startIcon={<UploadIcon />}
                disabled={uboidloading}
                success={uboidsuccess}
                loading={uboidloading}
                onClick={handleUboIdClick}
              >
                {" "}
                Owners's ID*
              </LoaderButton>
              </label>
              </>
              ) 
              }
            </Grid>

            <Grid item xs={6}>
            {ubo_updatepoa ?  
            
            (
              <>
              <img className={classes.img} alt="complex" src={upoaimg}/>
              </>
            )   :    

             (
              <>
              <UploadField
                name = {ubo_poa_attachment.name}
                id = {ubo_id_attachment.name}
                accept="image/*"
                style={{ display: 'none' }}
              />
              <label htmlFor={ubo_id_attachment.name}>
              <LoaderButton
                id={ubo_id_attachment.name}
                fullWidth
                component="span"
                startIcon={<UploadIcon />}
                disabled={ubopoaloading}
                success={ubopoasuccess}
                loading={ubopoaloading}
                onClick={handleUboPoaClick}
              >
                {" "}
                Owner's proof of address*
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
  