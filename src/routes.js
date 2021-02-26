import React from 'react';
import { Navigate } from 'react-router-dom';
import DashboardLayout from 'src/layouts/DashboardLayout';
import MainLayout from 'src/layouts/MainLayout';
import InvestorLayout from 'src/layouts/InvestorLayout';
import SupplierView from 'src/supplier/views/account/SupplierView';
import TransactionListView from 'src/supplier/views/transaction/TransactionListView';
import NewTransactionView from 'src/supplier/views/transaction/NewTransactionView';
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

import AdminDashboardView from 'src/admin/views/reports/AdminDashboardView';
import AdminLayout from 'src/layouts/AdminLayout';
import AdminInvestorListView from 'src/admin/views/investor/AdminInvestorListView';
import AdminNewInvestorView from 'src/admin/views/investor/AdminNewInvestorView';
import AdminSupplierListView from 'src/admin/views/supplier/AdminSupplierListView';
import AdminNewSupplierView from 'src/admin/views/supplier/AdminNewSupplierView';
import AdminSupplierGroupListView from 'src/admin/views/supplier/AdminSupplierGroupListView';
import AdminBuyerListView from 'src/admin/views/buyer/AdminBuyerListView';
import AdminUpdateDirectorView from 'src/admin/views/director/AdminUpdateDirectorView';
import AdminNewSupplierDirectorView from 'src/admin/views/director/AdminNewSupplierDirectorView';
import AdminNewSupplierUboView from 'src/admin/views/ubo/AdminNewSupplierUboView';
import AdminNewBuyerUboView from 'src/admin/views/ubo/AdminNewBuyerUboView';
import AdminNewBuyerDirectorView from 'src/admin/views/director/AdminNewBuyerDirectorView';
import AdminNewBuyerView from 'src/admin/views/buyer/AdminNewBuyerView';
import AdminBuyerView from 'src/admin/views/buyer/AdminBuyerView';
import AdminTransactionListView from 'src/admin/views/transaction/AdminTransactionListView';
import AdminNewTransactionView from 'src/admin/views/transaction/AdminNewTransactionView';
import AdminNewFinancialsView from 'src/admin/views/financials/AdminNewFinancialsView';
import AdminNewDocumentView from 'src/admin/views/document/AdminNewDocumentView';
import AdminBuyerTransactionListView from 'src/admin/views/buyer/AdminBuyerTransactionListView';
import AdminUserGroupListView from 'src/admin/views/user/AdminUserGroupListView';
import AdminNewUserView from 'src/admin/views/user/AdminNewUserView';
import AdminNewUserGroupView from 'src/admin/views/user/AdminNewUserGroupView';

import InvestorDashboardView from 'src/investor/views/reports/InvestorDashboardView';
import InvestorLoginView from 'src/investor/views/auth/InvestorLoginView';
import InvestorBuyerView from 'src/investor/views/buyer/InvestorBuyerView';
import InvestorBuyerListView from 'src/investor/views/buyer/InvestorBuyerListView';
import InvestorObligorListView from 'src/investor/views/buyer/InvestorObligorListView';
import InvestorTransactionListView from 'src/investor/views/transaction/InvestorTransactionListView';
import InvestorTransactionView from 'src/investor/views/transaction/InvestorTransactionView';
import InvestorSettingsView from 'src/investor/views/settings/SettingsView';

  const routes = (isAuthenticated, isAdmin, isInvestor) =>
  [{
    path: 'app',
    element: !isAuthenticated ? <MainLayout /> : <DashboardLayout />,
    children: [
      { path: '', element: !isAuthenticated ? <LoginView /> : <SupplierView /> },
      { path: 'account', element: !isAuthenticated ? <LoginView /> : <SupplierView /> },
      { path: 'newsupplierdirector/:id', element: !isAuthenticated ? <LoginView /> : <NewSupplierDirectorView /> },
      { path: 'newsupplierubo/:id', element: !isAuthenticated ? <LoginView /> : <NewSupplierUboView /> },
      { path: 'updatedirector/:id', element: !isAuthenticated ? <LoginView /> : <UpdateDirectorView /> },
      { path: 'updateubo/:id', element: !isAuthenticated ? <LoginView /> : <UpdateUboView /> },
      { path: 'transactions', element: !isAuthenticated ? <LoginView /> : <TransactionListView />  },
      { path: 'newtransaction/:id', element: !isAuthenticated ? <LoginView /> : <NewTransactionView />  },
      { path: 'dashboard', element: !isAuthenticated ? <LoginView /> : <DashboardView /> },
      { path: 'buyers', element: !isAuthenticated ? <LoginView /> : <BuyerListView /> },
      { path: 'settings', element: !isAuthenticated ? <LoginView /> : <SettingsView /> },
      { path: 'newaccount', element: !isAuthenticated ? <LoginView /> : <NewSupplierView /> },
      { path: 'newbuyer', element: !isAuthenticated ? <LoginView /> : <NewBuyerView /> },
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
      { path: '/', element: !isAdmin  ? <AdminLoginView /> : <AdminSupplierListView />},
      { path: 'dashboard', element:  !isAdmin ? <AdminLoginView /> : <AdminDashboardView /> },
      { path: 'newsupplier/:id/:ident/:sub', element: !isAdmin ? <AdminLoginView /> : <AdminNewSupplierView /> },
      { path: 'suppliergroups', element: !isAdmin ? <AdminLoginView /> : <AdminSupplierGroupListView /> },
      { path: 'adminnewsupplierdirector/:id', element: !isAdmin ? <AdminLoginView /> : <AdminNewSupplierDirectorView />},
      { path: 'adminnewsupplierubo/:id', element: !isAdmin ? <AdminLoginView /> : <AdminNewSupplierUboView />},
      { path: 'updatedirector/:id', element: !isAdmin  ? <AdminLoginView /> : <AdminUpdateDirectorView />},
      { path: 'updateubo/:id', element: !isAdmin  ? <AdminLoginView /> :<UpdateUboView />  },
      { path: 'suppliers', element: !isAdmin ? <AdminLoginView /> : <AdminSupplierListView />  },
      { path: 'buyers', element: !isAdmin  ? <AdminLoginView /> : <AdminBuyerListView />  },
      { path: 'buyer/:id/:buyId/:ident', element: !isAdmin  ? <AdminLoginView /> : <AdminBuyerView />},
      { path: 'newbuyer', element: !isAdmin ? <AdminLoginView /> : <AdminNewBuyerView />  },
      { path: 'adminnewbuyerubo/:id/:buyId/:ident', element: !isAdmin ? <AdminLoginView />: <AdminNewBuyerUboView />},
      { path: 'adminnewbuyerdirector/:id/:buyId/:ident', element: !isAdmin ? <AdminLoginView /> : <AdminNewBuyerDirectorView />},
      { path: 'adminnewfinancials/:id/:buyId/:ident', element: !isAdmin  ? <AdminLoginView /> : <AdminNewFinancialsView />},
      { path: 'adminnewdocument/:id/:buyId/:ident', element: !isAdmin  ? <AdminLoginView /> : <AdminNewDocumentView />},
      { path: 'transactions', element: !isAdmin ? <AdminLoginView /> : <AdminTransactionListView  />},
      { path: 'newtransactionlist', element: !isAdmin ? <AdminLoginView /> : <AdminBuyerTransactionListView  />},
      { path: 'newtransaction/:id/:buyId/:supId', element: !isAdmin ? <LoginView /> : <AdminNewTransactionView />  },
      { path: 'investors', element: !isAdmin ? <AdminLoginView /> : <AdminInvestorListView />  },
      { path: 'newinvestor', element: !isAdmin ? <AdminLoginView /> : <AdminNewInvestorView /> },
      { path: 'users', element: !isAdmin ? <AdminLoginView /> : <AdminUserGroupListView />  },
      { path: 'user/:sub/:groupId', element: !isAdmin ? <AdminLoginView /> : <AdminNewUserView />  },
      { path: 'newuser', element: !isAdmin ? <AdminLoginView /> : <AdminNewUserGroupView />  },
      { path: '*', element: <Navigate to="admin/404" /> }
    ]
  },
  {
    path: 'investor',
    element: !isAuthenticated && !isInvestor ? <MainLayout /> : <InvestorLayout />,
    children: [
      { path: 'login', element:!isAuthenticated && !isInvestor ? <InvestorLoginView /> : <InvestorDashboardView  /> },
      { path: 'register', element: !isInvestor ? <RegisterView /> : <InvestorDashboardView /> },
      { path: 'investor/404', element: <NotFoundView /> },
      { path: '/', element: !isAuthenticated && !isInvestor ? <InvestorLoginView />  : <InvestorDashboardView />},
      { path: 'dashboard', element: !isAuthenticated && !isInvestor ? <InvestorLoginView />  : <InvestorDashboardView /> },
      { path: 'buyer/:id/:buyId/:ident', element: !isAuthenticated && !isInvestor ? <InvestorLoginView /> : <InvestorBuyerView />},
      { path: 'requests', element: !isAuthenticated && !isInvestor ? <InvestorLoginView />  : <InvestorBuyerListView/> },
      { path: 'obligors', element: !isAuthenticated && !isInvestor ? <InvestorLoginView />  : <InvestorObligorListView/> },
      { path: 'transactions', element: !isAuthenticated && !isInvestor ? <InvestorLoginView />  : <InvestorTransactionListView  /> },
      { path: 'transaction/:id/:reqId', element: !isAuthenticated && !isInvestor ? <InvestorLoginView /> : <InvestorTransactionView />},
      { path: 'settings', element: !isAuthenticated ? <InvestorLoginView /> : <InvestorSettingsView /> },
      { path: '*', element: <Navigate to="investor/404" /> }
    ]
  },
]

export default routes;
