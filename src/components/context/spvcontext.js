import React, { useState, createContext, useContext } from "react";
import { Auth, API, graphqlOperation } from "aws-amplify";
import * as queries from "src/graphql/queries.js";

// Create a context that will hold the values that we are going to expose to our components.
// Don't worry about the `null` value. It's gonna be *instantly* overriden by the component below
export const SpvContext = createContext(null);

// Create a "controller" component that will calculate all the data that we need to give to our
// components bellow via the `UserContext.Provider` component. This is where the Amplify will be
// mapped to a different interface, the one that we are going to expose to the rest of the app.
export const SpvProvider = ({ children }) => {
  const [sub, setSub] = useState("");
  const [identity, setIdentity] = useState("");
  const [username, setUsername] = useState("");

  //spv data:
  const [id, setId] = useState("");
  const [spvId, setSpvId] = useState("");
  const [spv_logo, setSpv_logo] = useState("");
  const [spv_name, setSpv_name] = useState("");
  const [spv_type, setSpv_type] = useState("");
  const [
    spv_date_of_incorporation,
    setSpv_date_of_incorporation,
  ] = useState("");
  const [spv_address_city, setSpv_address_city] = useState("");
  const [spv_address_street, setSpv_address_street] = useState("");
  const [spv_address_number, setSpv_address_number] = useState("");
  const [spv_website, setSpv_website] = useState("");
  const [
    spv_address_postalcode,
    setSpv_address_postalcode,
  ] = useState("");
  const [spv_country, setSpv_country] = useState("");
  const [spv_industry, setSpv_industry] = useState("");
  const [
    spv_registration_cert_attachment,
    setSpv_registration_cert_attachment,
  ] = useState("");
  const [
    spv_articles_of_association_attachment,
    setSpv_articles_of_association_attachment,
  ] = useState("");
  const [
    spv_director_list_attachment,
    setSpv_director_list_attachment,
  ] = useState("");
  const [
    spv_shareholder_list_attachment,
    setSpv_shareholder_list_attachment,
  ] = useState("");

  React.useEffect(() => {
    // attempt to fetch the info of the user that was already logged in
    async function loadUser() {
      let user = await Auth.currentAuthenticatedUser();
      const u = await user.username;
      setUsername(u);
      const { attributes = {} } = user;
      const b = attributes["custom:groupid"];
      return b;
    }

    async function loadIdentity() {
      let identity = await Auth.currentUserCredentials();
      const ident = identity.identityId;
      return ident;
    }

    async function loadSpv() {
      const groupid = await loadUser();
      setSub(groupid);
      let filter = { userId: { eq: groupid } };
      const {
        data: {
          listSpvs: { items: itemsPage1, nextToken },
        },
      } = await API.graphql(
        graphqlOperation(queries.listSpvs, { filter: filter })
      );
      const n = { data: { listSpvs: { items: itemsPage1, nextToken } } };
      const spv = n.data.listSpvs.items[0];
      if (spv) {
        setIdentity(spv.identityId);
      } else {
        const ident = await loadIdentity();
        setIdentity(ident);
      }
      return spv;
    }

    async function onLoad() {
      const spvdata = await loadSpv();
      if (spvdata === undefined) {
        return;
      } else {
        const {
          id,
          spvId,
          spv_logo,
          spv_name,
          spv_type,
          spv_date_of_incorporation,
          spv_address_city,
          spv_address_street,
          spv_address_number,
          spv_website,
          spv_address_postalcode,
          spv_country,
          spv_industry,
          spv_registration_cert_attachment,
          spv_articles_of_association_attachment,
          spv_director_list_attachment,
          spv_shareholder_list_attachment,
        } = spvdata;
        setId(id);
        setSpvId(spvId);
        setSpv_logo(spv_logo);
        setSpv_name(spv_name);
        setSpv_date_of_incorporation(spv_date_of_incorporation);
        setSpv_type(spv_type);
        setSpv_address_city(spv_address_city);
        setSpv_address_street(spv_address_street);
        setSpv_address_number(spv_address_number);
        setSpv_website(spv_website);
        setSpv_address_postalcode(spv_address_postalcode);
        setSpv_country(spv_country);
        setSpv_industry(spv_industry);
        setSpv_registration_cert_attachment(
          spv_registration_cert_attachment
        );
        setSpv_articles_of_association_attachment(
          spv_articles_of_association_attachment
        );
        setSpv_director_list_attachment(spv_director_list_attachment);
        setSpv_shareholder_list_attachment(
          spv_shareholder_list_attachment
        );
      }
    }
    onLoad();
  }, []);

  // Make sure to not force a re-render on the components that are reading these values,
  // unless the `user` value has changed. This is an optimisation that is mostly needed in cases
  // where the parent of the current component re-renders and thus the current component is forced
  // to re-render as well. If it does, we want to make sure to give the `UserContext.Provider` the
  // same value as long as the user data is the same. If you have multiple other "controller"
  // components or Providers above this component, then this will be a performance booster.
  const values = React.useMemo(
    () => ({
      id,
      sub,
      identity,
      username,
      spvId,
      spv_logo,
      spv_name,
      spv_type,
      spv_date_of_incorporation,
      spv_address_city,
      spv_address_street,
      spv_address_number,
      spv_address_postalcode,
      spv_website,
      spv_country,
      spv_industry,
      spv_registration_cert_attachment,
      spv_articles_of_association_attachment,
      spv_director_list_attachment,
      spv_shareholder_list_attachment,
    }),
    [
      id,
      sub,
      identity,
      username,
      spvId,
      spv_logo,
      spv_name,
      spv_type,
      spv_date_of_incorporation,
      spv_address_city,
      spv_address_street,
      spv_address_number,
      spv_address_postalcode,
      spv_website,
      spv_country,
      spv_industry,
      spv_registration_cert_attachment,
      spv_articles_of_association_attachment,
      spv_director_list_attachment,
      spv_shareholder_list_attachment,
    ]
  );

  // Finally, return the interface that we want to expose to our other components
  return (
    <SpvContext.Provider value={values}>
      {children}
    </SpvContext.Provider>
  );
};

// We also create a simple custom hook to read these values from. We want our React components
// to know as little as possible on how everything is handled, so we are not only abtracting them from
// the fact that we are using React's context, but we also skip some imports.
export const useUser = () => {
  const context = useContext(SpvContext);

  if (context === undefined) {
    throw new Error(
      "`useUser` hook must be used within a `UserProvider` component"
    );
  }
  return context;
};
