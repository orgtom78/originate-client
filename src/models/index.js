// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Spv, Bank, Broker, Buyer, Bookkeeping, Director, Document, Financials, Investor, Originate, Plaidauth, Request, SOFR, Supplier, Transaction, UBO, Usergroup, Insurance } = initSchema(schema);

export {
  Spv,
  Bank,
  Broker,
  Buyer,
  Bookkeeping,
  Director,
  Document,
  Financials,
  Investor,
  Originate,
  Plaidauth,
  Request,
  SOFR,
  Supplier,
  Transaction,
  UBO,
  Usergroup,
  Insurance
};