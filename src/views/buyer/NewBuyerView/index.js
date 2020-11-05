import React from 'react';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  Divider,
  Box,
  Grid,
  makeStyles,
  Step,
  Stepper,
  StepLabel
} from '@material-ui/core';
import Page from 'src/components/Page';
import AddressForm from './AddressForm';
import ShareholderForm from './ShareholderForm';
import FinancialsForm from './FinancialsForm';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const steps = ['Company details', 'Shareholder details', 'Financial details'];

function getStepContent(step) {
  switch (step) {
    case 0:
      return <AddressForm  />;
    case 1:
      return <ShareholderForm />;
    case 2:
      return <FinancialsForm  />;
    default:
      throw new Error('Unknown step');
  }
}

export default function NewBuyer() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <Page
      className={classes.root}
      title="NewAccount"
    >
      <Container maxWidth="lg">
      <Card>
        <CardHeader subheader="new" title="Create A Company Profile">
              </CardHeader>
        <CardContent>
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            lg={12}
            md={6}
            xs={12}
          >
          </Grid>
          <Divider />
        <Box display="flex" justifyContent="right" alignItems="right" p={2}>
        <React.Fragment>
            {getStepContent(activeStep)}
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} className={classes.button}>
                      Back
                    </Button>
                  )}
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.button}
                  >
                    {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                  </Button>
                </React.Fragment>
        </Box>
          </Grid>
        </CardContent>
        </Card>
      </Container>
    </Page>
  );
};

