import React from 'react';
import { Navigate } from 'react-router-dom';
import DashboardLayout from 'src/layouts/DashboardLayout';
import MainLayout from 'src/layouts/MainLayout';
import AdminLayout from 'src/layouts/AdminLayout';
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
import AdminSupplierListView from 'src/views/supplier/AdminSupplierListView';
import AdminNewSupplierView from 'src/views/supplier/AdminNewSupplierView';
import AdminBuyerListView from 'src/views/buyer/AdminBuyerListView';
import AdminUpdateDirectorView from 'src/views/director/AdminUpdateDirectorView';
import AdminNewSupplierDirectorView from 'src/views/director/AdminNewSupplierDirectorView';
import AdminNewSupplierUboView from 'src/views/ubo/AdminNewSupplierUboView';
import AdminNewBuyerUboView from 'src/views/ubo/AdminNewBuyerUboView';
import AdminNewBuyerDirectorView from 'src/views/director/AdminNewBuyerDirectorView';
import AdminNewBuyerView from 'src/views/buyer/AdminNewBuyerView';
import AdminTransactionListView from 'src/views/transaction/AdminTransactionListView';
import AdminNewFinancialsView from 'src/views/financials/AdminNewFinancialsView';


  const routes = (isAuthenticated, isAdmin) =>
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
    element: !isAdmin && !isAuthenticated ? <MainLayout /> : <AdminLayout />,
    children: [
      { path: 'login', element: !isAdmin && !isAuthenticated  ? <AdminLoginView /> : <AdminSupplierListView /> },
      { path: 'admin/404', element: <NotFoundView /> },
      { path: '/', element: !isAdmin && !isAuthenticated  ? <AdminLoginView /> : <AdminSupplierListView />},
      { path: 'dashboard', element: !isAuthenticated ? <AdminLoginView /> : <AdminDashboardView /> },
      { path: 'newsupplier', element: !isAdmin && !isAuthenticated ? <AdminLoginView /> : <AdminNewSupplierView /> },
      { path: 'adminnewsupplierdirector/:id', element: !isAdmin && !isAuthenticated ? <AdminLoginView /> : <AdminNewSupplierDirectorView />},
      { path: 'adminnewsupplierubo/:id', element: !isAdmin && !isAuthenticated ? <AdminLoginView /> : <AdminNewSupplierUboView />},
      { path: 'updatedirector/:id', element: !isAdmin && !isAuthenticated ? <AdminLoginView /> : <AdminUpdateDirectorView />},
      { path: 'updateubo/:id', element: !isAdmin && !isAuthenticated ? <AdminLoginView /> :<UpdateUboView />  },
      { path: 'suppliers', element: !isAdmin && !isAuthenticated ? <AdminLoginView /> : <AdminSupplierListView />  },
      { path: 'buyers', element: !isAdmin && !isAuthenticated ? <AdminLoginView /> : <AdminBuyerListView />  },
      { path: 'newbuyer', element: !isAdmin && !isAuthenticated ? <AdminLoginView /> : <AdminNewBuyerView />  },
      { path: 'adminnewbuyerubo/:id', element: !isAdmin && !isAuthenticated ? <AdminLoginView />: <AdminNewBuyerUboView />},
      { path: 'adminnewbuyerdirector/:id', element: !isAdmin && !isAuthenticated ? <AdminLoginView /> : <AdminNewBuyerDirectorView />},
      { path: 'adminnewfinancials/:id/:buyId/:ident', element: !isAdmin && !isAuthenticated ? <AdminLoginView /> : <AdminNewFinancialsView />},
      { path: 'transactions', element: !isAdmin && !isAuthenticated ? <AdminLoginView /> : <AdminTransactionListView  />},
      { path: '*', element: <Navigate to="admin/404" /> }
    ]
  }
]

export default routes;
