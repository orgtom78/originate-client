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
  const [user, setUser] = useState(null);
  const [sub, setSub] = useState("");
  const [identity, setIdentity] = useState("");

  //supplier data:
  const [supplierId, setSupplierId] = useState("");
  const [supplier_logo, setSupplier_logo] = useState("");
  const [supplier_name, setSupplier_name] = useState("");
  const [supplier_type, setSupplier_type] = useState("");
  const [supplier_date_of_incorporation, setSupplier_date_of_incorporation] = useState("");
  const [supplier_address_city, setSupplier_address_city] = useState("");
  const [supplier_address_street, setSupplier_address_street] = useState("");
  const [supplier_address_number, setSupplier_address_number] = useState("");
  const [supplier_website, setSupplier_website] = useState("");
  const [supplier_address_postalcode, setSupplier_address_postalcode] = useState("");
  const [supplier_country, setSupplier_country] = useState("");
  const [supplier_industry, setSupplier_industry] = useState("");
  const [supplier_registration_cert_attachment,setSupplier_registration_cert_attachment] = useState("");
  const [supplier_articles_of_association_attachment, setSupplier_articles_of_association_attachment] = useState("");
  const [supplier_director_list_attachment, setSupplier_director_list_attachment] = useState("");
  const [supplier_shareholder_list_attachment, setSupplier_shareholder_list_attachment] = useState("");
	

  //supplier director data:
  const [directorId, setDirectorId] = useState("");
  const [director_name, setDirector_name] = useState("");
  const [director_email, setDirector_email] = useState("");
  const [director_phone_number, setDirector_phone_number] = useState("");
  const [director_id_attachment, setDirector_id_attachment] = useState("");
  const [director_id_number, setDirector_id_number] = useState("");
  const [director_id_type, setDirector_id_type] = useState("");
  const [director_nationality, setDirector_nationality] = useState("");
  const [director_poa_attachment, setDirector_poa_attachment] = useState("");
  const [director_country_of_residence, setDirector_country_of_residence] = useState("");
  
  // supplier UBO data:
  const [uboId, setUboId] = useState("");
  const [ubo_name, setUbo_name] = useState("");
  const [ubo_email, setUbo_email] = useState("");
  const [ubo_phone_number, setUbo_phone_number] = useState("");
  const [ubo_id_attachment, setUbo_id_attachment] = useState("");
  const [ubo_id_number, setUbo_id_number] = useState("");
  const [ubo_id_type, setUbo_id_type] = useState("");
  const [ubo_nationality, setUbo_nationality] = useState("");
  const [ubo_poa_attachment, setUbo_poa_attachment] = useState("");
  const [ubo_country_of_residence, setUbo_country_of_residence] = useState("");

  //Financials:
  const [financialsId, setFinancialsId] = useState("");
  const [ebit, setEbit] = useState("");
  const [financials_attachment, setFinancials_attachment] = useState("");
  const [net_profit, setNet_profit] = useState("");
  const [financials_rating, setFinancials_rating] = useState("");
  const [financials_reporting_period, setFinancials_reporting_period] = useState("");
  const [sales, setSales] = useState("");
  const [total_assets, setTotal_assets] = useState("");
  const [total_liabilities, setTotal_liabilities] = useState("");


  React.useEffect(() => {
    // attempt to fetch the info of the user that was already logged in
    async function loadUser() {
      let user = await Auth.currentAuthenticatedUser();
      const { attributes = {} } = user;
      const a = attributes["sub"];
      return a;
    }

    async function loadIdentity() {
      let identity = await Auth.currentUserCredentials();
      const ident = identity.identityId
      return ident;
    }

    async function loadSupplier() {
      const id = await loadUser();
      const ident = await loadIdentity();
      setSub(id);
      setIdentity(ident);
      let filter = { userId: { eq: id }, sortkey: {contains: "supplier-"} };
      const { data: { listsSupplier: { items: itemsPage1, nextToken }, },
      } = await API.graphql(
        graphqlOperation(queries.listsSupplier, { filter: filter })
      );
      const n = { data: { listsSupplier: { items: itemsPage1, nextToken } } };
      const supplier = n.data.listsSupplier.items[0];
      return supplier;
    } 

    async function loadDirector() {
      const id = await loadUser();
      const ident = await loadIdentity();
      setSub(id);
      setIdentity(ident);
      let filter = { userId: { eq: id }, sortkey: {contains: "director-"} };
      const {
        data: {
          listsDirector: { items: itemsPage1, nextToken },
        },
      } = await API.graphql(
        graphqlOperation(queries.listsDirector, { filter: filter })
      );
      const m = { data: { listsDirector: { items: itemsPage1, nextToken } } };
      const director = m.data.listsDirector.items[0];
      return director;
    }

    async function loadUBO() {
      const id = await loadUser();
      const ident = await loadIdentity();
      setSub(id);
      setIdentity(ident);
      let filter = { userId: { eq: id }, sortkey: {contains: "ubo-"} };
      const {
        data: {
          listsUBO: { items: itemsPage1, nextToken },
        },
      } = await API.graphql(
        graphqlOperation(queries.listsUbo, { filter: filter })
      );
      const o = { data: { listsUbo: { items: itemsPage1, nextToken } } };
      const ubo = o.data.listsUbo.items[0];
      return ubo;
    }

    async function loadFinancials() {
      const id = await loadUser();
      const ident = await loadIdentity();
      setSub(id);
      setIdentity(ident);
      let filter = { userId: { eq: id }, sortkey: {contains: "financials-"} };
      const {
        data: {
          listsFinancials: { items: itemsPage1, nextToken },
        },
      } = await API.graphql(
        graphqlOperation(queries.listsFinancials, { filter: filter })
      );
      const o = { data: { listsFinancials: { items: itemsPage1, nextToken } } };
      const financials = o.data.listsFinancials.items[0];
      return financials;
    }

    async function onLoad() {
      const supplierdata = await loadSupplier(); 
      if (supplierdata === undefined){
        return }
        else {
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
          supplier_shareholder_list_attachment
        } = supplierdata;
        var a = supplier_country.replaceAll('=', '":"');
        var c = a.replaceAll('}' , '"}');
        var d = c.replaceAll('{' , '{"');
        var e = d.replace(/\s/g, '');
        const z = e;

        var f = supplier_industry.replaceAll('=', '":"');
        var g = f.replaceAll(',' , '","');
        var h = g.replaceAll('}' , '"}');
        var i = h.replaceAll('{' , '{"');
        var j = i.replace(/\s/g, '');
        var obj = JSON.parse(j);
        const y = obj.label;

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
        setSupplier_country(z);
        setSupplier_industry(y);
        setSupplier_registration_cert_attachment(supplier_registration_cert_attachment);
        setSupplier_articles_of_association_attachment(supplier_articles_of_association_attachment);
        setSupplier_director_list_attachment(supplier_director_list_attachment);
        setSupplier_shareholder_list_attachment(supplier_shareholder_list_attachment);}

    const supplierdirector = await loadDirector();
    const {
      directorId,
      director_name,
      director_email,
      director_phone_number, 
      director_id_attachment, 
      director_id_number, 
      director_id_type, 
      director_nationality,
      director_poa_attachment, 
      director_country_of_residence,
    } = supplierdirector;
    setDirectorId(directorId);
    setDirector_name(director_name);
    setDirector_email(director_email);
    setDirector_phone_number(director_phone_number);
    setDirector_id_attachment(director_id_attachment);
    setDirector_id_number(director_id_number);
    setDirector_id_type(director_id_type);
    setDirector_nationality(director_nationality);
    setDirector_poa_attachment(director_poa_attachment);
    setDirector_country_of_residence(director_country_of_residence);

    const supplierubo = await loadUBO();
    const {
      uboId,
      ubo_name,
      ubo_email,
      ubo_phone_number, 
      ubo_id_attachment, 
      ubo_id_number, 
      ubo_id_type, 
      ubo_nationality,
      ubo_poa_attachment, 
      ubo_country_of_residence,
    } = supplierubo;
    setUboId(uboId);
    setUbo_name(ubo_name);
    setUbo_email(ubo_email);
    setUbo_phone_number(ubo_phone_number);
    setUbo_id_attachment(ubo_id_attachment);
    setUbo_id_number(ubo_id_number);
    setUbo_id_type(ubo_id_type);
    setUbo_nationality(ubo_nationality);
    setUbo_poa_attachment(ubo_poa_attachment);
    setUbo_country_of_residence(ubo_country_of_residence);

    const supplierfinancials = await loadFinancials();
    const {
      financialsId,
      ebit,
      financials_attachment,
      net_profit,
      financials_rating,
      financials_reporting_period,
      sales,
      total_assets,
      total_liabilities,
    } = supplierfinancials;
    setFinancialsId(financialsId);
    setEbit(ebit);
    setFinancials_attachment(financials_attachment);
    setNet_profit(net_profit);
    setFinancials_rating(financials_rating);
    setFinancials_reporting_period(financials_reporting_period);
    setSales(sales);
    setTotal_assets(total_assets);
    setTotal_liabilities(total_liabilities);
  };
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
      user,
      sub,
      identity,
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
      directorId,
      director_name,
      director_email,
      director_phone_number, 
      director_id_attachment, 
      director_id_number, 
      director_id_type, 
      director_nationality,
      director_poa_attachment, 
      director_country_of_residence,
      uboId,
      ubo_name,
      ubo_email,
      ubo_phone_number, 
      ubo_id_attachment, 
      ubo_id_number, 
      ubo_id_type, 
      ubo_nationality,
      ubo_poa_attachment, 
      ubo_country_of_residence,
      financialsId,
      ebit,
      financials_attachment,
      net_profit,
      financials_rating,
      financials_reporting_period,
      sales,
      total_assets,
      total_liabilities,
    }),
    [
      user,
      sub,
      identity,
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
      directorId,
      director_name,
      director_email,
      director_phone_number, 
      director_id_attachment, 
      director_id_number, 
      director_id_type, 
      director_nationality,
      director_poa_attachment, 
      director_country_of_residence,
      uboId,
      ubo_name,
      ubo_email,
      ubo_phone_number, 
      ubo_id_attachment, 
      ubo_id_number, 
      ubo_id_type, 
      ubo_nationality,
      ubo_poa_attachment, 
      ubo_country_of_residence,
      financialsId,
      ebit,
      financials_attachment,
      net_profit,
      financials_rating,
      financials_reporting_period,
      sales,
      total_assets,
      total_liabilities,
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
