import React, { useState } from 'react';
import clsx from 'clsx';
import moment from 'moment';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
  makeStyles
} from '@material-ui/core';
import { API, graphqlOperation } from "aws-amplify";
import * as queries from 'src/graphql/queries.js';

export  default  function Profile({ className, ...rest }){
const [company_name, setCompany_name] = useState('');
const [company_address_city, setCompany_address_city] = useState('');
const [company_avatar, setCompany_avatar] = useState('');
const [company_timezone, setCompany_timezone] = useState('');
const [company_country, setCompany_country] = useState('');
const [company_industry, setCompany_industry] = useState('')

  const useStyles = makeStyles(() => ({
    root: {},
    avatar: {
      height: 100,
      width: 100
    }
  }));
  const classes = useStyles()

  async function user() {
  const user = await loadCompany()
  const city = user.company_address_city
  const country = user.company_country
  const industry = user.company_industry
  const name = user.company_name
  const avatar = 'https://www.gravatar.com/avatar/dcd44927-2efd-4fc0-b955-0c676d04f738?d=identicon'
  const timezone = 'GTM-7'
  setCompany_name(name)
  setCompany_address_city(city)
  setCompany_country(country)
  setCompany_industry(industry)
  setCompany_timezone(timezone)
  setCompany_avatar(avatar)
 }user();

 async function loadCompany() {
  let filter = { userId: {eq:'dcd44927-2efd-4fc0-b955-0c676d04f738'}};
    const { data: { listsCompany: { items: itemsPage1, nextToken } } } = await API.graphql(graphqlOperation(queries.listsCompany, { filter: filter }));
    const n  = { data: { listsCompany: { items: itemsPage1, nextToken }}};
    const company = n.data.listsCompany.items[0]
    return company
  }

  return (
    <Card
    className={clsx(classes.root, className)}
    {...rest}
    >
      <CardContent>
        <Box
          alignItems="center"
          display="flex"
          flexDirection="column"
        >
          <Avatar
            className={classes.avatar}
            src={company_avatar}
          />
          <Typography
            color="textPrimary"
            gutterBottom
            variant="h3"
          >
            {company_name}
          </Typography>
          <Typography
            color="textSecondary"
            variant="body1"
          >
            {`${company_address_city} ${company_country}`}
          </Typography>
          <Typography
            className={classes.dateText}
            color="textSecondary"
            variant="body1"
          >
            {`${moment().format('hh:mm A')} ${company_timezone}`}
          </Typography>
        </Box>
      </CardContent>
      <Divider />
      <CardActions>
        <Button
          color="primary"
          fullWidth
          variant="text"
        >
          Upload company logo
        </Button>
      </CardActions>
    </Card>
  );
}
