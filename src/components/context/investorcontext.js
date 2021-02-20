import React, { useState, createContext, useContext } from "react";
import { Auth, API, graphqlOperation } from "aws-amplify";
import * as queries from "src/graphql/queries.js";

// Create a context that will hold the values that we are going to expose to our components.
// Don't worry about the `null` value. It's gonna be *instantly* overriden by the component below
export const InvestorContext = createContext(null);

// Create a "controller" component that will calculate all the data that we need to give to our
// components bellow via the `UserContext.Provider` component. This is where the Amplify will be
// mapped to a different interface, the one that we are going to expose to the rest of the app.
export const UserProvider = ({ children }) => {
  const [sub, setSub] = useState("");
  const [identity, setIdentity] = useState("");
  const [username, setUsername] = useState("");

  //investor data:
  const [investorId, setInvestorId] = useState("");
  const [investor_logo, setInvestor_logo] = useState("");
  const [investor_name, setInvestor_name] = useState("");
  const [investor_type, setInvestor_type] = useState("");
  const [
    investor_date_of_incorporation,
    setInvestor_date_of_incorporation,
  ] = useState("");
  const [investor_address_city, setInvestor_address_city] = useState("");
  const [investor_address_street, setInvestor_address_street] = useState("");
  const [investor_address_number, setInvestor_address_number] = useState("");
  const [investor_website, setInvestor_website] = useState("");
  const [
    investor_address_postalcode,
    setInvestor_address_postalcode,
  ] = useState("");
  const [investor_country, setInvestor_country] = useState("");
  const [investor_industry, setInvestor_industry] = useState("");
  const [
    investor_registration_cert_attachment,
    setInvestor_registration_cert_attachment,
  ] = useState("");
  const [
    investor_articles_of_association_attachment,
    setInvestor_articles_of_association_attachment,
  ] = useState("");
  const [
    investor_director_list_attachment,
    setInvestor_director_list_attachment,
  ] = useState("");
  const [
    investor_shareholder_list_attachment,
    setInvestor_shareholder_list_attachment,
  ] = useState("");

  React.useEffect(() => {
    // attempt to fetch the info of the user that was already logged in
    async function loadUser() {
      let user = await Auth.currentAuthenticatedUser();
      console.log(user);
      const u = await user.username;
      setUsername(u);
      const { attributes = {} } = user;
      const b = attributes["custom:groupid"];
      if (b === null) {
        return;
      } else {
        return b;
      }
    }

    async function loadIdentity() {
      let identity = await Auth.currentUserCredentials();
      const ident = identity.identityId;
      return ident;
    }

    async function loadInvestor() {
      const id = await loadUser();
      const ident = await loadIdentity();
      setSub(id);
      setIdentity(ident);
      let filter = { userId: { eq: id }, sortkey: { contains: "investor-" } };
      const {
        data: {
          listsInvestor: { items: itemsPage1, nextToken },
        },
      } = await API.graphql(
        graphqlOperation(queries.listsInvestor, { filter: filter })
      );
      const n = { data: { listsInvestor: { items: itemsPage1, nextToken } } };
      const investor = n.data.listsInvestor.items[0];
      return investor;
    }

    async function onLoad() {
      const investordata = await loadInvestor();
      if (investordata === undefined) {
        return;
      } else {
        const {
          investorId,
          investor_logo,
          investor_name,
          investor_type,
          investor_date_of_incorporation,
          investor_address_city,
          investor_address_street,
          investor_address_number,
          investor_website,
          investor_address_postalcode,
          investor_country,
          investor_industry,
          investor_registration_cert_attachment,
          investor_articles_of_association_attachment,
          investor_director_list_attachment,
          investor_shareholder_list_attachment,
        } = investordata;
        setInvestorId(investorId);
        setInvestor_logo(investor_logo);
        setInvestor_name(investor_name);
        setInvestor_date_of_incorporation(investor_date_of_incorporation);
        setInvestor_type(investor_type);
        setInvestor_address_city(investor_address_city);
        setInvestor_address_street(investor_address_street);
        setInvestor_address_number(investor_address_number);
        setInvestor_website(investor_website);
        setInvestor_address_postalcode(investor_address_postalcode);
        setInvestor_country(investor_country);
        setInvestor_industry(investor_industry);
        setInvestor_registration_cert_attachment(
          investor_registration_cert_attachment
        );
        setInvestor_articles_of_association_attachment(
          investor_articles_of_association_attachment
        );
        setInvestor_director_list_attachment(investor_director_list_attachment);
        setInvestor_shareholder_list_attachment(
          investor_shareholder_list_attachment
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
      sub,
      identity,
      username,
      investorId,
      investor_logo,
      investor_name,
      investor_type,
      investor_date_of_incorporation,
      investor_address_city,
      investor_address_street,
      investor_address_number,
      investor_address_postalcode,
      investor_website,
      investor_country,
      investor_industry,
      investor_registration_cert_attachment,
      investor_articles_of_association_attachment,
      investor_director_list_attachment,
      investor_shareholder_list_attachment,
    }),
    [
      sub,
      identity,
      username,
      investorId,
      investor_logo,
      investor_name,
      investor_type,
      investor_date_of_incorporation,
      investor_address_city,
      investor_address_street,
      investor_address_number,
      investor_address_postalcode,
      investor_website,
      investor_country,
      investor_industry,
      investor_registration_cert_attachment,
      investor_articles_of_association_attachment,
      investor_director_list_attachment,
      investor_shareholder_list_attachment,
    ]
  );

  // Finally, return the interface that we want to expose to our other components
  return (
    <InvestorContext.Provider value={values}>
      {children}
    </InvestorContext.Provider>
  );
};

// We also create a simple custom hook to read these values from. We want our React components
// to know as little as possible on how everything is handled, so we are not only abtracting them from
// the fact that we are using React's context, but we also skip some imports.
export const useUser = () => {
  const context = useContext(InvestorContext);

  if (context === undefined) {
    throw new Error(
      "`useUser` hook must be used within a `UserProvider` component"
    );
  }
  return context;
};
