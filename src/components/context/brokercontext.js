import React, { useState, createContext, useContext } from "react";
import { Auth, API, graphqlOperation } from "aws-amplify";
import * as queries from "src/graphql/queries.js";

// Create a context that will hold the values that we are going to expose to our components.
// Don't worry about the `null` value. It's gonna be *instantly* overriden by the component below
export const BrokerContext = createContext(null);

// Create a "controller" component that will calculate all the data that we need to give to our
// components bellow via the `UserContext.Provider` component. This is where the Amplify will be
// mapped to a different interface, the one that we are going to expose to the rest of the app.
export const BrokerProvider = ({ children }) => {
  const [sub, setSub] = useState("");
  const [identity, setIdentity] = useState("");
  const [username, setUsername] = useState("");

  //broker data:
  const [id, setId] = useState("");
  const [brokerId, setBrokerId] = useState("");
  const [broker_logo, setBroker_logo] = useState("");
  const [broker_name, setBroker_name] = useState("");
  const [broker_type, setBroker_type] = useState("");
  const [
    broker_date_of_incorporation,
    setBroker_date_of_incorporation,
  ] = useState("");
  const [broker_address_city, setBroker_address_city] = useState("");
  const [broker_address_street, setBroker_address_street] = useState("");
  const [broker_address_number, setBroker_address_number] = useState("");
  const [broker_website, setBroker_website] = useState("");
  const [
    broker_address_postalcode,
    setBroker_address_postalcode,
  ] = useState("");
  const [broker_country, setBroker_country] = useState("");
  const [broker_industry, setBroker_industry] = useState("");
  const [
    broker_registration_cert_attachment,
    setBroker_registration_cert_attachment,
  ] = useState("");
  const [
    broker_articles_of_association_attachment,
    setBroker_articles_of_association_attachment,
  ] = useState("");
  const [
    broker_director_list_attachment,
    setBroker_director_list_attachment,
  ] = useState("");
  const [
    broker_shareholder_list_attachment,
    setBroker_shareholder_list_attachment,
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

    async function loadBroker() {
      const groupid = await loadUser();
      setSub(groupid);
      let filter = { userId: { eq: groupid } };
      const {
        data: {
          listBrokers: { items: itemsPage1, nextToken },
        },
      } = await API.graphql(
        graphqlOperation(queries.listBrokers, { filter: filter })
      );
      const n = { data: { listBrokers: { items: itemsPage1, nextToken } } };
      const broker = n.data.listBrokers.items[0];
      if (broker) {
        setIdentity(broker.identityId);
      } else {
        const ident = await loadIdentity();
        setIdentity(ident);
      }
      return broker;
    }

    async function onLoad() {
      const brokerdata = await loadBroker();
      if (brokerdata === undefined) {
        return;
      } else {
        const {
          id,
          brokerId,
          broker_logo,
          broker_name,
          broker_type,
          broker_date_of_incorporation,
          broker_address_city,
          broker_address_street,
          broker_address_number,
          broker_website,
          broker_address_postalcode,
          broker_country,
          broker_industry,
          broker_registration_cert_attachment,
          broker_articles_of_association_attachment,
          broker_director_list_attachment,
          broker_shareholder_list_attachment,
        } = brokerdata;
        setId(id);
        setBrokerId(brokerId);
        setBroker_logo(broker_logo);
        setBroker_name(broker_name);
        setBroker_date_of_incorporation(broker_date_of_incorporation);
        setBroker_type(broker_type);
        setBroker_address_city(broker_address_city);
        setBroker_address_street(broker_address_street);
        setBroker_address_number(broker_address_number);
        setBroker_website(broker_website);
        setBroker_address_postalcode(broker_address_postalcode);
        setBroker_country(broker_country);
        setBroker_industry(broker_industry);
        setBroker_registration_cert_attachment(
          broker_registration_cert_attachment
        );
        setBroker_articles_of_association_attachment(
          broker_articles_of_association_attachment
        );
        setBroker_director_list_attachment(broker_director_list_attachment);
        setBroker_shareholder_list_attachment(
          broker_shareholder_list_attachment
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
      brokerId,
      broker_logo,
      broker_name,
      broker_type,
      broker_date_of_incorporation,
      broker_address_city,
      broker_address_street,
      broker_address_number,
      broker_address_postalcode,
      broker_website,
      broker_country,
      broker_industry,
      broker_registration_cert_attachment,
      broker_articles_of_association_attachment,
      broker_director_list_attachment,
      broker_shareholder_list_attachment,
    }),
    [
      id,
      sub,
      identity,
      username,
      brokerId,
      broker_logo,
      broker_name,
      broker_type,
      broker_date_of_incorporation,
      broker_address_city,
      broker_address_street,
      broker_address_number,
      broker_address_postalcode,
      broker_website,
      broker_country,
      broker_industry,
      broker_registration_cert_attachment,
      broker_articles_of_association_attachment,
      broker_director_list_attachment,
      broker_shareholder_list_attachment,
    ]
  );

  // Finally, return the interface that we want to expose to our other components
  return (
    <BrokerContext.Provider value={values}>
      {children}
    </BrokerContext.Provider>
  );
};

// We also create a simple custom hook to read these values from. We want our React components
// to know as little as possible on how everything is handled, so we are not only abtracting them from
// the fact that we are using React's context, but we also skip some imports.
export const useUser = () => {
  const context = useContext(BrokerContext);

  if (context === undefined) {
    throw new Error(
      "`useUser` hook must be used within a `UserProvider` component"
    );
  }
  return context;
};
