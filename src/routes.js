import React from 'react';
import { Navigate } from 'react-router-dom';
import DashboardLayout from 'src/layouts/DashboardLayout';
import MainLayout from 'src/layouts/MainLayout';
import AdminLayout from 'src/layouts/AdminLayout';
import InvestorLayout from 'src/layouts/InvestorLayout';
import SupplierView from 'src/views/supplier/SupplierView';
import TransactionListView from 'src/views/transaction/TransactionListView';
import NewTransactionView from 'src/views/transaction/NewTransactionView';
import DashboardView from 'src/views/reports/DashboardView';
import AdminDashboardView from 'src/views/reports/AdminDashboardView';
import LoginView from 'src/views/auth/LoginView';
import AdminLoginView from 'src/views/auth/AdminLoginView';
import NotFoundView from 'src/views/errors/NotFoundView';
import BuyerListView from 'src/views/buyer/BuyerListView';
import RegisterView from 'src/views/auth/RegisterView';
import SettingsView from 'src/views/settings/SettingsView';
import NewSupplierView from 'src/views/supplier/NewSupplierView';
import NewBuyerView from 'src/views/buyer/NewBuyerView';
import NewSupplierDirectorView from 'src/views/director/NewSupplierDirectorView';
import NewSupplierUboView from 'src/views/ubo/NewSupplierUboView';
import UpdateDirectorView from 'src/views/director/UpdateDirectorView';
import UpdateUboView from 'src/views/ubo/UpdateUboView';
import AdminInvestorListView from 'src/views/investor/AdminInvestorListView';
import AdminNewInvestorView from 'src/views/investor/AdminNewInvestorView';
import AdminSupplierListView from 'src/views/supplier/AdminSupplierListView';
import AdminNewSupplierView from 'src/views/supplier/AdminNewSupplierView';
import AdminSupplierGroupListView from 'src/views/supplier/AdminSupplierGroupListView';
import AdminBuyerListView from 'src/views/buyer/AdminBuyerListView';
import AdminUpdateDirectorView from 'src/views/director/AdminUpdateDirectorView';
import AdminNewSupplierDirectorView from 'src/views/director/AdminNewSupplierDirectorView';
import AdminNewSupplierUboView from 'src/views/ubo/AdminNewSupplierUboView';
import AdminNewBuyerUboView from 'src/views/ubo/AdminNewBuyerUboView';
import AdminNewBuyerDirectorView from 'src/views/director/AdminNewBuyerDirectorView';
import AdminNewBuyerView from 'src/views/buyer/AdminNewBuyerView';
import AdminBuyerView from 'src/views/buyer/AdminBuyerView';
import AdminTransactionListView from 'src/views/transaction/AdminTransactionListView';
import AdminNewTransactionView from 'src/views/transaction/AdminNewTransactionView';
import AdminNewFinancialsView from 'src/views/financials/AdminNewFinancialsView';
import AdminBuyerTransactionListView from 'src/views/buyer/AdminBuyerTransactionListView';
import AdminUserGroupListView from 'src/views/user/AdminUserGroupListView';
import AdminNewUserView from 'src/views/user/AdminNewUserView';
import AdminNewUserGroupView from 'src/views/user/AdminNewUserGroupView';
import InvestorDashboardView from 'src/views/reports/InvestorDashboardView';
import InvestorLoginView from 'src/views/auth/InvestorLoginView';
import InvestorBuyerView from 'src/views/buyer/InvestorBuyerView';
import InvestorBuyerListView from 'src/views/buyer/InvestorBuyerListView';
import InvestorObligorListView from 'src/views/buyer/InvestorObligorListView';
import InvestorTransactionListView from 'src/views/transaction/InvestorTransactionListView';
import InvestorTransactionView from 'src/views/transaction/InvestorTransactionView';


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
      { path: 'adminnewbuyerubo/:id', element: !isAdmin ? <AdminLoginView />: <AdminNewBuyerUboView />},
      { path: 'adminnewbuyerdirector/:id', element: !isAdmin ? <AdminLoginView /> : <AdminNewBuyerDirectorView />},
      { path: 'adminnewfinancials/:id/:buyId/:ident', element: !isAdmin  ? <AdminLoginView /> : <AdminNewFinancialsView />},
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
      { path: '*', element: <Navigate to="investor/404" /> }
    ]
  },
]

export default routes;
