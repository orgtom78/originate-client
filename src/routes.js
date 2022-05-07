import React from 'react';
import { Navigate } from 'react-router-dom';
import DashboardLayout from 'src/layouts/DashboardLayout';
import MainLayout from 'src/layouts/MainLayout';
import InvestorLayout from 'src/layouts/InvestorLayout';
import SupplierView from 'src/supplier/views/account/SupplierView';
import RequestListView from 'src/supplier/views/request/RequestListView';
import RequestOptionView from 'src/supplier/views/request/RequestOptionView';
import NewRequestView from 'src/supplier/views/request/NewRequestView';
import NewEsignRequestView from 'src/supplier/views/request/NewEsignRequestView';
import DashboardView from 'src/supplier/views/reports/DashboardView';

import LoginView from 'src/supplier/views/auth/LoginView';
import AdminLoginView from 'src/admin/views/auth/AdminLoginView';
import NotFoundView from 'src/investor/views/errors/NotFoundView';
import BuyerListView from 'src/supplier/views/buyer/BuyerListView';
import RegisterView from 'src/supplier/views/auth/RegisterView';
import SettingsView from 'src/supplier/views/settings/SettingsView';
import NewSupplierView from 'src/supplier/views/account/NewSupplierView';
import NewBuyerView from 'src/supplier/views/buyer/NewBuyerView';
import NewSupplierDirectorView from 'src/supplier/views/director/NewSupplierDirectorView';
import NewSupplierUboView from 'src/supplier/views/ubo/NewSupplierUboView';
import UpdateDirectorView from 'src/supplier/views/director/UpdateDirectorView';
import UpdateUboView from 'src/supplier/views/ubo/UpdateUboView';
import SupplierSuccessView from 'src/supplier/views/account/SupplierSuccessView';

import AdminDashboardView from 'src/admin/views/reports/AdminDashboardView';
import AdminLayout from 'src/layouts/AdminLayout';

import AdminInvestorListView from 'src/admin/views/investor/AdminInvestorListView';
import AdminInvestorGroupListView from 'src/admin/views/investor/AdminInvestorGroupListView';
import AdminNewInvestorView from 'src/admin/views/investor/AdminNewInvestorView';
import AdminInvestorView from 'src/admin/views/investor/AdminInvestorView';
import AdminNewInvestorDirectorView from 'src/admin/views/director/AdminNewInvestorDirectorView';
import AdminNewInvestorUboView from 'src/admin/views/ubo/AdminNewInvestorUboView';

import AdminSupplierListView from 'src/admin/views/supplier/AdminSupplierListView';
import AdminSupplierView from 'src/admin/views/supplier/AdminSupplierView';
import AdminNewSupplierView from 'src/admin/views/supplier/AdminNewSupplierView';
import AdminSupplierGroupListView from 'src/admin/views/supplier/AdminSupplierGroupListView';
import AdminNewSupplierDirectorView from 'src/admin/views/director/AdminNewSupplierDirectorView';
import AdminNewSupplierUboView from 'src/admin/views/ubo/AdminNewSupplierUboView';

import AdminBuyerListView from 'src/admin/views/buyer/AdminBuyerListView';
import AdminNewBuyerUboView from 'src/admin/views/ubo/AdminNewBuyerUboView';
import AdminNewBuyerDirectorView from 'src/admin/views/director/AdminNewBuyerDirectorView';
import AdminNewBuyerView from 'src/admin/views/buyer/AdminNewBuyerView';
import AdminBuyerView from 'src/admin/views/buyer/AdminBuyerView';

import AdminUpdateDirectorView from 'src/admin/views/director/AdminUpdateDirectorView';
import AdminUpdateUboView from 'src/admin/views/ubo/AdminUpdateUboView';

import AdminNewSupplierBuyerView from 'src/admin/views/supplier/AdminSupplierBuyerListView';

import AdminRequestView from 'src/admin/views/request/AdminRequestView';
import AdminRequestListView from 'src/admin/views/request/AdminRequestListView';
import AdminNewRequestView from 'src/admin/views/request/AdminNewRequestView';
import AdminBuyerTransactionListView from 'src/admin/views/buyer/AdminBuyerTransactionListView';

import AdminNewFinancialsView from 'src/admin/views/financials/AdminNewFinancialsView';
import AdminFinancialsView from "src/admin/views/financials/AdminUpdateFinancialsView";

import AdminNewDocumentView from 'src/admin/views/document/AdminNewDocumentView';
import AdminDocumentView from 'src/admin/views/document/AdminUpdateDocumentView';

import AdminGroupListView from 'src/admin/views/user/AdminGroupListView';
import AdminGroupView from 'src/admin/views/user/AdminGroupView';
import AdminNewUserGroupView from 'src/admin/views/user/AdminNewUserGroupView';
import AdminNewUserView from 'src/admin/views/user/AdminNewUserView';

import AdminNewInsuranceView from 'src/admin/views/insurance/AdminNewInsuranceView';

import AdminNewBookkeepingListView from 'src/admin/views/bookkeeping/AdminNewBookkeepingListView';
import AdminBookkeepingView from 'src/admin/views/bookkeeping/AdminBookkeepingView';

import AdminInvestorTransactionListView from 'src/admin/views/transaction/AdminInvestorTransactionListView';
import AdminInvestorBankView from 'src/admin/views/transaction/AdminInvestorBankView';
import AdminAccountTranscationView from 'src/admin/views/transaction/AdminAccountTransactionView';

import InvestorDashboardView from 'src/investor/views/reports/InvestorDashboardView';
import InvestorLoginView from 'src/investor/views/auth/InvestorLoginView';
import InvestorBuyerView from 'src/investor/views/buyer/InvestorBuyerView';
import InvestorBuyerListView from 'src/investor/views/buyer/InvestorBuyerListView';
import InvestorObligorListView from 'src/investor/views/buyer/InvestorObligorListView';
import InvestorRequestListView from 'src/investor/views/request/InvestorRequestListView';
import InvestorRequestView from 'src/investor/views/request/InvestorRequestView';
import InvestorBankView from 'src/investor/views/bank/InvestorBankView';
import InvestorRemittanceConnectView from 'src/investor/views/bank/InvestorRemittanceConnectView';
import InvestorRemittanceTransactionsView from 'src/investor/views/bank/InvestorRemittanceTransactionsView';
import InvestorCollectionConnectView from 'src/investor/views/bank/InvestorCollectionConnectView';
import InvestorCollectionTransactionsView from 'src/investor/views/bank/InvestorCollectionTransactionsView';
import InvestorSettingsView from 'src/investor/views/settings/SettingsView';

  const routes = (isAuthenticated, isAdmin, isInvestor) =>
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
      { path: 'newesignrequest/:id', element: !isAuthenticated ? <LoginView /> : <NewEsignRequestView />  },
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

      { path: 'director/:id', element: !isAdmin  ? <AdminLoginView /> : <AdminUpdateDirectorView />},
      { path: 'ubo/:id', element: !isAdmin  ? <AdminLoginView /> :<AdminUpdateUboView />  },

      { path: 'buyers', element: !isAdmin  ? <AdminLoginView /> : <AdminBuyerListView />  },
      { path: 'buyer/:id', element: !isAdmin  ? <AdminLoginView /> : <AdminBuyerView />},
      { path: 'newbuyer/:id/:user/:ident', element: !isAdmin ? <AdminLoginView /> : <AdminNewBuyerView />  },
      { path: 'newsupplierbuyer', element: !isAdmin ? <AdminLoginView /> : <AdminNewSupplierBuyerView />  },
      { path: 'adminnewbuyerubo/:id', element: !isAdmin ? <AdminLoginView />: <AdminNewBuyerUboView />},
      { path: 'adminnewbuyerdirector/:id', element: !isAdmin ? <AdminLoginView /> : <AdminNewBuyerDirectorView />},

      { path: 'adminnewdocument/:id', element: !isAdmin  ? <AdminLoginView /> : <AdminNewDocumentView />},
      { path: 'document/:id', element: !isAdmin  ? <AdminLoginView /> : <AdminDocumentView />},

      { path: 'adminnewfinancials/:id/:buyId/:ident', element: !isAdmin  ? <AdminLoginView /> : <AdminNewFinancialsView />},
      { path: 'financials/:id', element: !isAdmin  ? <AdminLoginView /> : <AdminFinancialsView />},

      { path: 'requests', element: !isAdmin ? <AdminLoginView /> : <AdminRequestListView  />},
      { path: 'request/:id', element: !isAdmin ? <AdminLoginView /> : <AdminRequestView  />},
      { path: 'newrequestlist', element: !isAdmin ? <AdminLoginView /> : <AdminBuyerTransactionListView  />},
      { path: 'newrequest/:id/:buyId/:supId', element: !isAdmin ? <LoginView /> : <AdminNewRequestView />  },

      { path: 'investors', element: !isAdmin ? <AdminLoginView /> : <AdminInvestorListView />  },
      { path: 'investor/:id', element: !isAdmin ? <AdminLoginView /> : <AdminInvestorView />  },
      { path: 'investorgroups', element: !isAdmin ? <AdminLoginView /> : <AdminInvestorGroupListView /> },
      { path: 'newinvestor/:groupid/:ident/:id', element: !isAdmin ? <AdminLoginView /> : <AdminNewInvestorView /> },

      { path: 'groups', element: !isAdmin ? <AdminLoginView /> : <AdminGroupListView />  },
      { path: 'user/:id', element: !isAdmin ? <AdminLoginView /> : <AdminGroupView />  },
      { path: 'newuser', element: !isAdmin ? <AdminLoginView /> : <AdminNewUserGroupView />  },
      { path: 'newuser/:id', element: !isAdmin ? <AdminLoginView /> : <AdminNewUserView />  },
      { path: '*', element: <Navigate to="admin/404" /> }, 

      { path: 'newinsurance', element: !isAdmin ? <AdminLoginView /> : <AdminNewInsuranceView />  },

      { path: 'bookkeeping', element: !isAdmin ? <AdminLoginView /> : <AdminNewBookkeepingListView />  },
      { path: 'bookkeeping/:id', element: !isAdmin ? <AdminLoginView /> : <AdminBookkeepingView />  },

      { path: 'transactions', element: !isAdmin ? <AdminLoginView /> : <AdminInvestorTransactionListView />  },
      { path: 'transaction/:id', element: !isAdmin ? <AdminLoginView /> : <AdminInvestorBankView />  },
      { path: 'transaction/account/:id', element: !isAdmin ? <AdminLoginView /> : <AdminAccountTranscationView />  },
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
      { path: 'settings', element: !isInvestor ? <InvestorLoginView /> : <InvestorSettingsView /> },
      { path: '*', element: <Navigate to="investor/404" /> }
    ]
  },
]

export default routes;
