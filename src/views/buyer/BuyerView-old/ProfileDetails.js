import React, { useState, useEffect} from "react";
import "date-fns";
import PropTypes from "prop-types";
import { Container } from "@material-ui/core";
import { useUser } from "src/components/usercontext.js";

import CompanyForm from "./Forms/CompanyForm";
import CompanyUploads from "./Forms/CompanyUploads";

const Profile = ({ className, ...rest }) => {
const context = useUser();
const [sub, setSub] = useState("");
useEffect(() => {
  // attempt to fetch the info of the user that was already logged in
  async function onLoad() {
    const data = await context;
    const {
      sub,
    } = data;
    setSub(sub);
  }
  onLoad();
}, [context]);

  return (
    <Container maxWidth="lg">
      <CompanyForm vuser={sub}/>
      <br></br>
      <CompanyUploads />
    </Container>
  );
};

Profile.propTypes = {
  className: PropTypes.string,
};

export default Profile;
