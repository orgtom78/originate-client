import React, { useState, createContext, useContext } from "react";
import { Auth, API, graphqlOperation } from "aws-amplify";
import * as queries from "src/graphql/queries.js";

// Create a context that will hold the values that we are going to expose to our components.
// Don't worry about the `null` value. It's gonna be *instantly* overriden by the component below
export const UserContext = createContext(null);

// Create a "controller" component that will calculate all the data that we need to give to our
// components bellow via the `UserContext.Provider` component. This is where the Amplify will be
// mapped to a different interface, the one that we are going to expose to the rest of the app.
export const UserProvider = ({ children }) => {
  const [sub, setSub] = useState("");
  const [identity, setIdentity] = useState("");
  const [username, setUsername] = useState("");

  //supplier data:
  const [supplierId, setSupplierId] = useState("");
  const [supplier_logo, setSupplier_logo] = useState("");
  const [supplier_name, setSupplier_name] = useState("");
  const [supplier_type, setSupplier_type] = useState("");
  const [
    supplier_date_of_incorporation,
    setSupplier_date_of_incorporation,
  ] = useState("");
  const [supplier_address_city, setSupplier_address_city] = useState("");
  const [supplier_address_street, setSupplier_address_street] = useState("");
  const [supplier_address_number, setSupplier_address_number] = useState("");
  const [supplier_website, setSupplier_website] = useState("");
  const [
    supplier_address_postalcode,
    setSupplier_address_postalcode,
  ] = useState("");
  const [supplier_country, setSupplier_country] = useState("");
  const [supplier_industry, setSupplier_industry] = useState("");
  const [
    supplier_registration_cert_attachment,
    setSupplier_registration_cert_attachment,
  ] = useState("");
  const [
    supplier_articles_of_association_attachment,
    setSupplier_articles_of_association_attachment,
  ] = useState("");
  const [
    supplier_director_list_attachment,
    setSupplier_director_list_attachment,
  ] = useState("");
  const [
    supplier_shareholder_list_attachment,
    setSupplier_shareholder_list_attachment,
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

    async function loadSupplier() {
      const id = await loadUser();
      const ident = await loadIdentity();
      setSub(id);
      setIdentity(ident);
      let filter = { userId: { eq: id }, sortkey: { contains: "supplier-" } };
      const {
        data: {
          listsSupplier: { items: itemsPage1, nextToken },
        },
      } = await API.graphql(
        graphqlOperation(queries.listsSupplier, { filter: filter })
      );
      const n = { data: { listsSupplier: { items: itemsPage1, nextToken } } };
      const supplier = n.data.listsSupplier.items[0];
      return supplier;
    }

    async function onLoad() {
      const supplierdata = await loadSupplier();
      if (supplierdata === undefined) {
        return;
      } else {
        const {
          supplierId,
          supplier_logo,
          supplier_name,
          supplier_type,
          supplier_date_of_incorporation,
          supplier_address_city,
          supplier_address_street,
          supplier_address_number,
          supplier_website,
          supplier_address_postalcode,
          supplier_country,
          supplier_industry,
          supplier_registration_cert_attachment,
          supplier_articles_of_association_attachment,
          supplier_director_list_attachment,
          supplier_shareholder_list_attachment,
        } = supplierdata;
        setSupplierId(supplierId);
        setSupplier_logo(supplier_logo);
        setSupplier_name(supplier_name);
        setSupplier_date_of_incorporation(supplier_date_of_incorporation);
        setSupplier_type(supplier_type);
        setSupplier_address_city(supplier_address_city);
        setSupplier_address_street(supplier_address_street);
        setSupplier_address_number(supplier_address_number);
        setSupplier_website(supplier_website);
        setSupplier_address_postalcode(supplier_address_postalcode);
        setSupplier_country(supplier_country);
        setSupplier_industry(supplier_industry);
        setSupplier_registration_cert_attachment(
          supplier_registration_cert_attachment
        );
        setSupplier_articles_of_association_attachment(
          supplier_articles_of_association_attachment
        );
        setSupplier_director_list_attachment(supplier_director_list_attachment);
        setSupplier_shareholder_list_attachment(
          supplier_shareholder_list_attachment
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
      supplierId,
      supplier_logo,
      supplier_name,
      supplier_type,
      supplier_date_of_incorporation,
      supplier_address_city,
      supplier_address_street,
      supplier_address_number,
      supplier_address_postalcode,
      supplier_website,
      supplier_country,
      supplier_industry,
      supplier_registration_cert_attachment,
      supplier_articles_of_association_attachment,
      supplier_director_list_attachment,
      supplier_shareholder_list_attachment,
    }),
    [
      sub,
      identity,
      username,
      supplierId,
      supplier_logo,
      supplier_name,
      supplier_type,
      supplier_date_of_incorporation,
      supplier_address_city,
      supplier_address_street,
      supplier_address_number,
      supplier_address_postalcode,
      supplier_website,
      supplier_country,
      supplier_industry,
      supplier_registration_cert_attachment,
      supplier_articles_of_association_attachment,
      supplier_director_list_attachment,
      supplier_shareholder_list_attachment,
    ]
  );

  // Finally, return the interface that we want to expose to our other components
  return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
};

// We also create a simple custom hook to read these values from. We want our React components
// to know as little as possible on how everything is handled, so we are not only abtracting them from
// the fact that we are using React's context, but we also skip some imports.
export const useUser = () => {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error(
      "`useUser` hook must be used within a `UserProvider` component"
    );
  }
  return context;
};
