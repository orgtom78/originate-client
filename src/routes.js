import React, { lazy } from 'react';
import { Navigate } from 'react-router-dom';

const DashboardLayout = lazy(() => import('src/layouts/DashboardLayout'));
const MainLayout = lazy(() => import('src/layouts/MainLayout'));
const InvestorLayout = lazy(() => import('src/layouts/InvestorLayout'));
const SpvLayout = lazy(() => import('src/layouts/SpvLayout'));
const BrokerLayout = lazy(() => import('src/layouts/BrokerLayout'));

const SupplierView = lazy(() => import('src/supplier/views/account/SupplierView'));
const RequestListView = lazy(() => import('src/supplier/views/request/RequestListView'));
const RequestOptionView = lazy(() => import('src/supplier/views/request/RequestOptionView'));
const NewRequestView = lazy(() => import('src/supplier/views/request/NewRequestView'));
const NewMultiRequestView = lazy(() => import('src/supplier/views/request/NewMultiRequestView'));
const DashboardView = lazy(() => import('src/supplier/views/reports/DashboardView'));

const LoginView = lazy(() => import('src/supplier/views/auth/LoginView'));
const AdminLoginView = lazy(() => import('src/admin/views/auth/AdminLoginView'));
const NotFoundView = lazy(() => import('src/investor/views/errors/NotFoundView'));
const BuyerListView = lazy(() => import('src/supplier/views/buyer/BuyerListView'));
const RegisterView = lazy(() => import('src/supplier/views/auth/RegisterView'));
const SettingsView = lazy(() => import('src/supplier/views/settings/SettingsView'));
const NewSupplierView = lazy(() => import('src/supplier/views/account/NewSupplierView'));
const NewBuyerView = lazy(() => import('src/supplier/views/buyer/NewBuyerView'));
const NewSupplierDirectorView = lazy(() => import('src/supplier/views/director/NewSupplierDirectorView'));
const NewSupplierUboView = lazy(() => import('src/supplier/views/ubo/NewSupplierUboView'));
const UpdateDirectorView = lazy(() => import('src/supplier/views/director/UpdateDirectorView'));
const UpdateUboView = lazy(() => import('src/supplier/views/ubo/UpdateUboView'));
const SupplierSuccessView = lazy(() => import('src/supplier/views/account/SupplierSuccessView'));

const AdminDashboardView = lazy(() => import('src/admin/views/reports/AdminDashboardView'));
const AdminLayout = lazy(() => import('src/layouts/AdminLayout'));

const AdminInvestorListView = lazy(() => import('src/admin/views/investor/AdminInvestorListView'));
const AdminInvestorGroupListView = lazy(() => import('src/admin/views/investor/AdminInvestorGroupListView'));
const AdminNewInvestorView = lazy(() => import('src/admin/views/investor/AdminNewInvestorView'));
const AdminInvestorView = lazy(() => import('src/admin/views/investor/AdminInvestorView'));
const AdminNewInvestorDirectorView = lazy(() => import('src/admin/views/director/AdminNewInvestorDirectorView'));
const AdminNewInvestorUboView = lazy(() => import('src/admin/views/ubo/AdminNewInvestorUboView'));

const AdminSpvListView = lazy(() => import('src/admin/views/spv/AdminSpvListView'));
const AdminSpvGroupListView = lazy(() => import('src/admin/views/spv/AdminSpvGroupListView'));
const AdminNewSpvView = lazy(() => import('src/admin/views/spv/AdminNewSpvView'));
const AdminSpvView = lazy(() => import('src/admin/views/spv/AdminSpvView'));
const AdminNewSpvDirectorView = lazy(() => import('src/admin/views/director/AdminNewSpvDirectorView'));
const AdminNewSpvUboView = lazy(() => import('src/admin/views/ubo/AdminNewSpvUboView'));

const AdminBrokerListView = lazy(() => import('src/admin/views/broker/AdminBrokerListView'));
const AdminBrokerGroupListView = lazy(() => import('src/admin/views/broker/AdminBrokerGroupListView'));
const AdminNewBrokerView = lazy(() => import('src/admin/views/broker/AdminNewBrokerView'));
const AdminBrokerView = lazy(() => import('src/admin/views/broker/AdminBrokerView'));
const AdminNewBrokerDirectorView = lazy(() => import('src/admin/views/director/AdminNewBrokerDirectorView'));
const AdminNewBrokerUboView = lazy(() => import('src/admin/views/ubo/AdminNewBrokerUboView'));

const AdminSupplierListView = lazy(() => import('src/admin/views/supplier/AdminSupplierListView'));
const AdminSupplierView = lazy(() => import('src/admin/views/supplier/AdminSupplierView'));
const AdminNewSupplierView = lazy(() => import('src/admin/views/supplier/AdminNewSupplierView'));
const AdminSupplierGroupListView = lazy(() => import('src/admin/views/supplier/AdminSupplierGroupListView'));
const AdminNewSupplierDirectorView = lazy(() => import('src/admin/views/director/AdminNewSupplierDirectorView'));
const AdminNewSupplierUboView = lazy(() => import('src/admin/views/ubo/AdminNewSupplierUboView'));

const AdminBuyerListView = lazy(() => import('src/admin/views/buyer/AdminBuyerListView'));
const AdminNewBuyerUboView = lazy(() => import('src/admin/views/ubo/AdminNewBuyerUboView'));
const AdminNewBuyerDirectorView = lazy(() => import('src/admin/views/director/AdminNewBuyerDirectorView'));
const AdminNewBuyerView = lazy(() => import('src/admin/views/buyer/AdminNewBuyerView'));
const AdminBuyerView = lazy(() => import('src/admin/views/buyer/AdminBuyerView'));

const AdminUpdateDirectorView = lazy(() => import('src/admin/views/director/AdminUpdateDirectorView'));
const AdminUpdateUboView = lazy(() => import('src/admin/views/ubo/AdminUpdateUboView'));

const AdminNewSupplierBuyerView = lazy(() => import('src/admin/views/supplier/AdminSupplierBuyerListView'));

const AdminRequestView = lazy(() => import('src/admin/views/request/AdminRequestView'));
const AdminRequestListView = lazy(() => import('src/admin/views/request/AdminRequestListView'));
const AdminNewRequestView = lazy(() => import('src/admin/views/request/AdminNewRequestView'));
const AdminRequestOptionView = lazy(() => import('src/admin/views/request/AdminRequestOptionView'));
const AdminNewMultiRequestView = lazy(() => import('src/admin/views/request/AdminNewMultiRequestView'));
const AdminBuyerTransactionListView = lazy(() => import('src/admin/views/buyer/AdminBuyerTransactionListView'));
const AdminSupplierTransactionListView = lazy(() => import('src/admin/views/supplier/AdminSupplierTransactionListView'));

const AdminNewFinancialsView = lazy(() => import('src/admin/views/financials/AdminNewFinancialsView'));
const AdminFinancialsView = lazy(() => import("src/admin/views/financials/AdminUpdateFinancialsView"));

const AdminNewSupplierDocumentView = lazy(() => import('src/admin/views/document/AdminNewSupplierDocumentView'));
const AdminNewDocumentView = lazy(() => import('src/admin/views/document/AdminNewDocumentView'));
const AdminDocumentView = lazy(() => import('src/admin/views/document/AdminUpdateDocumentView'));

const AdminSignatureView = lazy(() => import('src/admin/views/document/AdminSignatureTemplateView'));

const AdminGroupListView = lazy(() => import('src/admin/views/user/AdminGroupListView'));
const AdminGroupView = lazy(() => import('src/admin/views/user/AdminGroupView'));
const AdminNewUserGroupView = lazy(() => import('src/admin/views/user/AdminNewUserGroupView'));
const AdminNewUserView = lazy(() => import('src/admin/views/user/AdminNewUserView'));

const AdminNewInsuranceView = lazy(() => import('src/admin/views/insurance/AdminNewInsuranceView'));

const AdminNewBookkeepingListView = lazy(() => import('src/admin/views/bookkeeping/AdminNewBookkeepingListView'));
const AdminBookkeepingView = lazy(() => import('src/admin/views/bookkeeping/AdminBookkeepingView'));

const AdminInvestorTransactionListView = lazy(() => import('src/admin/views/transaction/AdminInvestorTransactionListView'));
const AdminInvestorBankView = lazy(() => import('src/admin/views/transaction/AdminInvestorBankView'));
const AdminAccountTranscationView = lazy(() => import('src/admin/views/transaction/AdminAccountTransactionView'));
const AdminTransactionView = lazy(() => import('src/admin/views/transaction/AdminTransactionView'));

const InvestorDashboardView = lazy(() => import('src/investor/views/reports/InvestorDashboardView'));
const InvestorLoginView = lazy(() => import('src/investor/views/auth/InvestorLoginView'));
const InvestorBuyerView = lazy(() => import('src/investor/views/buyer/InvestorBuyerView'));
const InvestorBuyerListView = lazy(() => import('src/investor/views/buyer/InvestorBuyerListView'));
const InvestorObligorListView = lazy(() => import('src/investor/views/buyer/InvestorObligorListView'));
const InvestorRequestListView = lazy(() => import('src/investor/views/request/InvestorRequestListView'));
const InvestorRequestView = lazy(() => import('src/investor/views/request/InvestorRequestView'));
const InvestorBankView = lazy(() => import('src/investor/views/bank/InvestorBankView'));
const InvestorRemittanceConnectView = lazy(() => import('src/investor/views/bank/InvestorRemittanceConnectView'));
const InvestorRemittanceTransactionsView = lazy(() => import('src/investor/views/bank/InvestorRemittanceTransactionsView'));
const InvestorCollectionConnectView = lazy(() => import('src/investor/views/bank/InvestorCollectionConnectView'));
const InvestorCollectionTransactionsView = lazy(() => import('src/investor/views/bank/InvestorCollectionTransactionsView'));
const InvestorNewFinancialsView = lazy(() => import('src/investor/views/financials/InvestorNewFinancialsView'));
const InvestorFinancialsView = lazy(() => import("src/investor/views/financials/InvestorUpdateFinancialsView"));
const InvestorSettingsView = lazy(() => import('src/investor/views/settings/SettingsView'));
const InvestorTransactionView = lazy(() => import('src/investor/views/bank/InvestorTransactionView'));

const SpvDashboardView = lazy(() => import('src/spv/views/reports/SpvDashboardView'));
const SpvLoginView = lazy(() => import('src/spv/views/auth/SpvLoginView'));
const SpvBuyerView = lazy(() => import('src/spv/views/buyer/SpvBuyerView'));
const SpvBuyerListView = lazy(() => import('src/spv/views/buyer/SpvBuyerListView'));
const SpvObligorListView = lazy(() => import('src/spv/views/buyer/SpvObligorListView'));
const SpvRequestListView = lazy(() => import('src/spv/views/request/SpvRequestListView'));

const SpvNewBookkeepingListView = lazy(() => import('src/spv/views/bookkeeping/SpvNewBookkeepingListView'));
const SpvBookkeepingView = lazy(() => import('src/spv/views/bookkeeping/SpvBookkeepingView'));

const SpvRequestView = lazy(() => import('src/spv/views/request/SpvRequestView'));
const SpvBankView = lazy(() => import('src/spv/views/bank/SpvBankView'));
const SpvRemittanceConnectView = lazy(() => import('src/spv/views/bank/SpvRemittanceConnectView'));
const SpvRemittanceTransactionsView = lazy(() => import('src/spv/views/bank/SpvRemittanceTransactionsView'));
const SpvCollectionConnectView = lazy(() => import('src/spv/views/bank/SpvCollectionConnectView'));
const SpvCollectionTransactionsView = lazy(() => import('src/spv/views/bank/SpvCollectionTransactionsView'));
const SpvSettingsView = lazy(() => import('src/spv/views/settings/SettingsView'));

const BrokerDashboardView = lazy(() => import('src/broker/views/reports/BrokerDashboardView'));
const BrokerLoginView = lazy(() => import('src/broker/views/auth/BrokerLoginView'));
const BrokerBuyerView = lazy(() => import('src/broker/views/buyer/BrokerBuyerView'));
const BrokerBuyerListView = lazy(() => import('src/broker/views/buyer/BrokerBuyerListView'));
const BrokerObligorListView = lazy(() => import('src/broker/views/buyer/BrokerObligorListView'));
const BrokerRequestListView = lazy(() => import('src/broker/views/request/BrokerRequestListView'));
const BrokerSettingsView = lazy(() => import('src/broker/views/settings/SettingsView'));

const BrokerSupplierListView = lazy(() => import('src/broker/views/supplier/BrokerSupplierListView'));
const BrokerSupplierView = lazy(() => import('src/broker/views/supplier/BrokerSupplierView'));
const BrokerNewSupplierView = lazy(() => import('src/broker/views/supplier/BrokerNewSupplierView'));
const BrokerSupplierGroupListView = lazy(() => import('src/broker/views/supplier/BrokerSupplierGroupListView'));
const BrokerNewSupplierDirectorView = lazy(() => import('src/broker/views/director/BrokerNewSupplierDirectorView'));
const BrokerNewSupplierUboView = lazy(() => import('src/broker/views/ubo/BrokerNewSupplierUboView'));

const BrokerGroupListView = lazy(() => import('src/broker/views/user/BrokerGroupListView'));
const BrokerGroupView = lazy(() => import('src/broker/views/user/BrokerGroupView'));
const BrokerNewUserGroupView = lazy(() => import('src/broker/views/user/BrokerNewUserGroupView'));
const BrokerNewUserView = lazy(() => import('src/broker/views/user/BrokerNewUserView'));

const BrokerSupplierBuyerListView = lazy(() => import('src/broker/views/buyer/BrokerSupplierBuyerListView'));
const BrokerNewBuyerView = lazy(() => import('src/broker/views/buyer/BrokerNewBuyerView'));

const BrokerNewFinancialsView = lazy(() => import('src/broker/views/financials/BrokerNewFinancialsView'));

  const routes = (isAuthenticated, isAdmin, isInvestor, isSpv, isBroker) =>
  [{
    path: 'app',
    element: !isAuthenticated? <MainLayout /> : <DashboardLayout />,
    children: [
      { path: '', element: !isAuthenticated ? <LoginView /> : <SupplierView /> },
      { path: 'account', element: !isAuthenticated ? <LoginView /> : <SupplierView /> },
      { path: 'newsupplierdirector/:id', element: !isAuthenticated ? <LoginView /> : <NewSupplierDirectorView /> },
      { path: 'newsupplierubo/:id', element: !isAuthenticated ? <LoginView /> : <NewSupplierUboView /> },
      { path: 'updatedirector/:id', element: !isAuthenticated ? <LoginView /> : <UpdateDirectorView /> },
      { path: 'updateubo/:id', element: !isAuthenticated ? <LoginView /> : <UpdateUboView /> },
      { path: 'requests', element: !isAuthenticated ? <LoginView /> : <RequestListView />  },
      { path: 'newrequest/:id', element: !isAuthenticated ? <LoginView /> : <NewRequestView />  },
      { path: 'requestoptions/:id', element: !isAuthenticated ? <LoginView /> : <RequestOptionView />  },
      { path: 'newmultirequest/:id/:buyId/:supId', element: !isAuthenticated ? <LoginView /> : <NewMultiRequestView />  },
      { path: 'dashboard', element: !isAuthenticated ? <LoginView /> : <DashboardView /> },
      { path: 'buyers', element: !isAuthenticated ? <LoginView /> : <BuyerListView /> },
      { path: 'settings', element: !isAuthenticated ? <LoginView /> : <SettingsView /> },
      { path: 'newaccount', element: !isAuthenticated ? <LoginView /> : <NewSupplierView /> },
      { path: 'newbuyer', element: !isAuthenticated ? <LoginView /> : <NewBuyerView /> },
      { path: 'suppliers', element: !isAuthenticated ? <LoginView /> : <SupplierSuccessView /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  },
  {
    path: '/',
    element: !isAuthenticated ? <MainLayout /> : <DashboardLayout />,
    children: [
      { path: 'login', element: !isAuthenticated ? <LoginView /> : <SupplierView /> },
      { path: 'register', element: !isAuthenticated ? <RegisterView /> : <SupplierView /> },
      { path: '404', element: <NotFoundView /> },
      { path: '/', element: !isAuthenticated ? <LoginView /> : <SupplierView />},
      { path: '*', element: <Navigate to="/404" /> }
    ]
  },
  {
    path: 'admin',
    element: !isAdmin ? <MainLayout /> : <AdminLayout />,
    children: [
      { path: 'login', element: !isAdmin ? <AdminLoginView /> : <AdminSupplierListView /> },
      { path: 'admin/404', element: <NotFoundView /> },
      { path: '/admin/', element: !isAdmin  ? <AdminLoginView /> : <AdminSupplierListView />},
      { path: 'dashboard', element:  !isAdmin ? <AdminLoginView /> : <AdminDashboardView /> },

      { path: 'suppliers', element: !isAdmin ? <AdminLoginView /> : <AdminSupplierListView />  },
      { path: 'supplier/:id', element: !isAdmin ? <AdminLoginView /> : <AdminSupplierView />  },
      { path: 'newsupplier/:ID/:ident/:sub', element: !isAdmin ? <AdminLoginView /> : <AdminNewSupplierView /> },
      { path: 'suppliergroups', element: !isAdmin ? <AdminLoginView /> : <AdminSupplierGroupListView /> },

      { path: 'adminnewsupplierdirector/:id', element: !isAdmin ? <AdminLoginView /> : <AdminNewSupplierDirectorView />},
      { path: 'adminnewsupplierubo/:id', element: !isAdmin ? <AdminLoginView /> : <AdminNewSupplierUboView />},
      { path: 'adminnewinvestordirector/:id', element: !isAdmin ? <AdminLoginView /> : <AdminNewInvestorDirectorView />},
      { path: 'adminnewinvestorubo/:id', element: !isAdmin ? <AdminLoginView /> : <AdminNewInvestorUboView />},
      { path: 'adminnewbuyerubo/:id', element: !isAdmin ? <AdminLoginView />: <AdminNewBuyerUboView />},
      { path: 'adminnewbuyerdirector/:id', element: !isAdmin ? <AdminLoginView /> : <AdminNewBuyerDirectorView />},
      { path: 'adminnewspvubo/:id', element: !isAdmin ? <AdminLoginView />: <AdminNewSpvUboView />},
      { path: 'adminnewspvdirector/:id', element: !isAdmin ? <AdminLoginView /> : <AdminNewSpvDirectorView />},
      { path: 'adminnewbrokerubo/:id', element: !isAdmin ? <AdminLoginView />: <AdminNewBrokerUboView />},
      { path: 'adminnewbrokerdirector/:id', element: !isAdmin ? <AdminLoginView /> : <AdminNewBrokerDirectorView />},

      { path: 'director/:id', element: !isAdmin  ? <AdminLoginView /> : <AdminUpdateDirectorView />},
      { path: 'ubo/:id', element: !isAdmin  ? <AdminLoginView /> :<AdminUpdateUboView />  },

      { path: 'buyers', element: !isAdmin  ? <AdminLoginView /> : <AdminBuyerListView />  },
      { path: 'buyer/:id', element: !isAdmin  ? <AdminLoginView /> : <AdminBuyerView />},
      { path: 'newbuyer/:id/:user/:ident', element: !isAdmin ? <AdminLoginView /> : <AdminNewBuyerView />  },
      { path: 'newsupplierbuyer', element: !isAdmin ? <AdminLoginView /> : <AdminNewSupplierBuyerView />  },

      { path: 'adminnewsupplierdocument/:id', element: !isAdmin  ? <AdminLoginView /> : <AdminNewSupplierDocumentView />},
      { path: 'adminnewdocument/:id', element: !isAdmin  ? <AdminLoginView /> : <AdminNewDocumentView />},
      { path: 'document/:id', element: !isAdmin  ? <AdminLoginView /> : <AdminDocumentView />},

      { path: 'esign/:userid/:buyerid/:supplierid', element: !isAdmin  ? <AdminLoginView /> : <AdminSignatureView />},

      { path: 'adminnewfinancials/:id/:buyId/:ident', element: !isAdmin  ? <AdminLoginView /> : <AdminNewFinancialsView />},
      { path: 'financials/:id', element: !isAdmin  ? <AdminLoginView /> : <AdminFinancialsView />},

      { path: 'requests', element: !isAdmin ? <AdminLoginView /> : <AdminRequestListView  />},
      { path: 'request/:id', element: !isAdmin ? <AdminLoginView /> : <AdminRequestView  />},
      { path: 'newrequestsupplierlist', element: !isAdmin ? <AdminLoginView /> : <AdminSupplierTransactionListView  />},
      { path: 'newrequestlist/:supId', element: !isAdmin ? <AdminLoginView /> : <AdminBuyerTransactionListView  />},
      { path: 'newrequestoptions/:id/:buyId/:supId', element: !isAdmin ? <AdminLoginView /> : <AdminRequestOptionView  />},
      { path: 'newrequest/:id/:buyId/:supId', element: !isAdmin ? <LoginView /> : <AdminNewRequestView />  },
      { path: 'newmultirequest/:id/:buyId/:supId', element: !isAdmin ? <LoginView /> : <AdminNewMultiRequestView />  },

      { path: 'investors', element: !isAdmin ? <AdminLoginView /> : <AdminInvestorListView />  },
      { path: 'investor/:id', element: !isAdmin ? <AdminLoginView /> : <AdminInvestorView />  },
      { path: 'investorgroups', element: !isAdmin ? <AdminLoginView /> : <AdminInvestorGroupListView /> },
      { path: 'newinvestor/:groupid/:ident/:id', element: !isAdmin ? <AdminLoginView /> : <AdminNewInvestorView /> },

      { path: 'spvs', element: !isAdmin ? <AdminLoginView /> : <AdminSpvListView />  },
      { path: 'spv/:id', element: !isAdmin ? <AdminLoginView /> : <AdminSpvView />  },
      { path: 'spvgroups', element: !isAdmin ? <AdminLoginView /> : <AdminSpvGroupListView /> },
      { path: 'newspv/:groupid/:ident/:id', element: !isAdmin ? <AdminLoginView /> : <AdminNewSpvView /> },

      { path: 'brokers', element: !isAdmin ? <AdminLoginView /> : <AdminBrokerListView />  },
      { path: 'broker/:id', element: !isAdmin ? <AdminLoginView /> : <AdminBrokerView />  },
      { path: 'brokergroups', element: !isAdmin ? <AdminLoginView /> : <AdminBrokerGroupListView /> },
      { path: 'newbroker/:groupid/:ident/:id', element: !isAdmin ? <AdminLoginView /> : <AdminNewBrokerView /> },

      { path: 'groups', element: !isAdmin ? <AdminLoginView /> : <AdminGroupListView />  },
      { path: 'user/:id', element: !isAdmin ? <AdminLoginView /> : <AdminGroupView />  },
      { path: 'newuser', element: !isAdmin ? <AdminLoginView /> : <AdminNewUserGroupView />  },
      { path: 'newuser/:id', element: !isAdmin ? <AdminLoginView /> : <AdminNewUserView />  },
      { path: '*', element: <Navigate to="admin/404" /> }, 

      { path: 'newinsurance', element: !isAdmin ? <AdminLoginView /> : <AdminNewInsuranceView />  },

      { path: 'bookkeeping', element: !isAdmin ? <AdminLoginView /> : <AdminNewBookkeepingListView />  },
      { path: 'bookkeeping/:id', element: !isAdmin ? <AdminLoginView /> : <AdminBookkeepingView />  },

      { path: 'transactions', element: !isAdmin ? <AdminLoginView /> : <AdminInvestorTransactionListView />  },
      { path: 'transaction/:id', element: !isAdmin ? <AdminLoginView /> : <AdminTransactionView />  },
      { path: 'accounts/:id', element: !isAdmin ? <AdminLoginView /> : <AdminInvestorBankView />  },
      { path: 'account/:id', element: !isAdmin ? <AdminLoginView /> : <AdminAccountTranscationView />  },
    ]
  },
  {
    path: 'investor',
    element: !isInvestor ? <MainLayout /> : <InvestorLayout />,
    children: [
      { path: 'login', element: !isInvestor ? <InvestorLoginView /> : <InvestorDashboardView  /> },
      { path: 'register', element: !isInvestor ? <RegisterView /> : <InvestorDashboardView /> },
      { path: 'investor/404', element: <NotFoundView /> },
      { path: '/investor/', element: !isInvestor ? <InvestorLoginView />  : <InvestorDashboardView />},
      { path: 'dashboard', element: !isInvestor ? <InvestorLoginView />  : <InvestorDashboardView /> },
      { path: 'buyer/:id', element: !isInvestor ? <InvestorLoginView /> : <InvestorBuyerView />},
      { path: 'limits', element: !isInvestor ? <InvestorLoginView />  : <InvestorBuyerListView/> },
      { path: 'obligors', element: !isInvestor ? <InvestorLoginView />  : <InvestorObligorListView/> },
      { path: 'requests', element: !isInvestor ? <InvestorLoginView />  : <InvestorRequestListView  /> },
      { path: 'request/:id', element: !isInvestor ? <InvestorLoginView /> : <InvestorRequestView />},
      { path: 'bank', element: !isInvestor ? <InvestorLoginView /> : <InvestorBankView />},
      { path: 'bank/remittance', element: !isInvestor ? <InvestorLoginView /> : <InvestorRemittanceConnectView />},
      { path: 'bank/remittance/:id', element: !isInvestor ? <InvestorLoginView /> : <InvestorRemittanceTransactionsView />},
      { path: 'bank/collection', element: !isInvestor ? <InvestorLoginView /> : <InvestorCollectionConnectView />},
      { path: 'bank/collection/:id', element: !isInvestor ? <InvestorLoginView /> : <InvestorCollectionTransactionsView />},
      { path: 'transaction/:id', element: !isInvestor ? <InvestorLoginView /> : <InvestorTransactionView />},
      { path: 'investornewfinancials/:id/:buyId/:ident', element: !isInvestor  ? <InvestorLoginView /> : <InvestorNewFinancialsView />},
      { path: 'financials/:id', element: !isInvestor  ? <InvestorLoginView /> : <InvestorFinancialsView />},
      { path: 'settings', element: !isInvestor ? <InvestorLoginView /> : <InvestorSettingsView /> },
      { path: '*', element: <Navigate to="investor/404" /> }
    ]
  },
  {
    path: 'spv',
    element: !isSpv ? <MainLayout /> : <SpvLayout />,
    children: [
      { path: 'login', element: !isSpv ? <SpvLoginView /> : <SpvDashboardView  /> },
      { path: 'register', element: !isSpv ? <RegisterView /> : <SpvDashboardView /> },
      { path: 'spv/404', element: <NotFoundView /> },
      { path: '/spv/', element: !isSpv ? <SpvLoginView />  : <SpvDashboardView />},
      { path: 'dashboard', element: !isSpv ? <SpvLoginView />  : <SpvDashboardView /> },
      { path: 'buyer/:id', element: !isSpv ? <SpvLoginView /> : <SpvBuyerView />},
      { path: 'limits', element: !isSpv ? <SpvLoginView />  : <SpvBuyerListView/> },
      { path: 'obligors', element: !isSpv ? <SpvLoginView />  : <SpvObligorListView/> },
      { path: 'requests', element: !isSpv ? <SpvLoginView />  : <SpvRequestListView  /> },
      { path: 'request/:id', element: !isSpv ? <SpvLoginView /> : <SpvRequestView />},

      { path: 'bookkeeping', element: !isSpv ? <SpvLoginView /> : <SpvNewBookkeepingListView />  },
      { path: 'bookkeeping/:id', element: !isSpv ? <SpvLoginView /> : <SpvBookkeepingView />  },

      { path: 'bank', element: !isSpv ? <SpvLoginView /> : <SpvBankView />},
      { path: 'bank/remittance', element: !isSpv ? <SpvLoginView /> : <SpvRemittanceConnectView />},
      { path: 'bank/remittance/:id', element: !isSpv ? <SpvLoginView /> : <SpvRemittanceTransactionsView />},
      { path: 'bank/collection', element: !isSpv ? <SpvLoginView /> : <SpvCollectionConnectView />},
      { path: 'bank/collection/:id', element: !isSpv ? <SpvLoginView /> : <SpvCollectionTransactionsView />},
      { path: 'settings', element: !isSpv ? <SpvLoginView /> : <SpvSettingsView /> },
      { path: '*', element: <Navigate to="spv/404" /> }
    ]
  },
  {
    path: 'broker',
    element: !isBroker ? <MainLayout /> : <BrokerLayout />,
    children: [
      { path: 'login', element: !isBroker ? <BrokerLoginView /> : <BrokerDashboardView  /> },
      { path: 'register', element: !isBroker ? <RegisterView /> : <BrokerDashboardView /> },
      { path: 'broker/404', element: <NotFoundView /> },
      { path: '/broker/', element: !isBroker ? <BrokerLoginView />  : <BrokerDashboardView />},
      { path: 'dashboard', element: !isBroker ? <BrokerLoginView />  : <BrokerDashboardView /> },
      
      { path: 'suppliers', element: !isBroker ? <BrokerLoginView /> : <BrokerSupplierListView />  },
      { path: 'supplier/:id', element: !isBroker ? <BrokerLoginView /> : <BrokerSupplierView />  },
      { path: 'newsupplier/:ID/:ident/:sub', element: !isBroker ? <BrokerLoginView /> : <BrokerNewSupplierView /> },
      { path: 'suppliergroups', element: !isBroker ? <BrokerLoginView /> : <BrokerSupplierGroupListView /> },
      { path: 'brokernewsupplierdirector/:id', element: !isBroker ? <BrokerLoginView /> : <BrokerNewSupplierDirectorView />},
      { path: 'brokernewsupplierubo/:id', element: !isBroker ? <BrokerLoginView /> : <BrokerNewSupplierUboView />},

      { path: 'newsupplierbuyer', element: !isBroker ? <BrokerLoginView /> : <BrokerSupplierBuyerListView/>  },
      { path: 'newbuyer/:id/:user/:ident', element: !isBroker ? <BrokerLoginView /> : <BrokerNewBuyerView />  },
      { path: 'brokernewfinancials/:id/:buyId/:ident', element: !isBroker  ? <BrokerLoginView /> : <BrokerNewFinancialsView />},
      { path: 'brokernewbuyerubo/:id', element: !isBroker ? <BrokerLoginView />: <AdminNewBuyerUboView />},
      { path: 'brokernewbuyerdirector/:id', element: !isBroker ? <BrokerLoginView /> : <AdminNewBuyerDirectorView />},
      { path: 'brokernewdocument/:id', element: !isBroker  ? <BrokerLoginView /> : <AdminNewDocumentView />},

      { path: 'groups', element: !isBroker ? <BrokerLoginView /> : <BrokerGroupListView />  },
      { path: 'user/:id', element: !isBroker ? <BrokerLoginView /> : <BrokerGroupView />  },
      { path: 'newuser', element: !isBroker ? <BrokerLoginView /> : <BrokerNewUserGroupView />  },
      { path: 'newuser/:id', element: !isBroker ? <BrokerLoginView /> : <BrokerNewUserView />  },

      { path: 'buyer/:id', element: !isBroker ? <BrokerLoginView /> : <BrokerBuyerView />},
      { path: 'limits', element: !isBroker ? <BrokerLoginView />  : <BrokerBuyerListView/> },
      { path: 'obligors', element: !isBroker ? <BrokerLoginView />  : <BrokerObligorListView/> },
      { path: 'requests', element: !isBroker ? <BrokerLoginView />  : <BrokerRequestListView  /> },
      { path: 'settings', element: !isBroker ? <BrokerLoginView /> : <BrokerSettingsView /> },
      { path: '*', element: <Navigate to="broker/404" /> }
    ]
  },
]

export default routes;
