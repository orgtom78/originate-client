import React from 'react';
import { Navigate } from 'react-router-dom';
import DashboardLayout from 'src/layouts/DashboardLayout';
import MainLayout from 'src/layouts/MainLayout';
import AccountView from 'src/views/account/AccountView';
import TransactionListView from 'src/views/transaction/TransactionListView';
import NewTransactionView from 'src/views/transaction/NewTransactionView';
import DashboardView from 'src/views/reports/DashboardView';
import LoginView from 'src/views/auth/LoginView';
import NotFoundView from 'src/views/errors/NotFoundView';
import BuyerListView from 'src/views/buyer/BuyerListView';
import RegisterView from 'src/views/auth/RegisterView';
import SettingsView from 'src/views/settings/SettingsView';
import NewAccountView from 'src/views/account/NewAccountView';
import NewBuyerView from 'src/views/buyer/NewBuyerView';

  const routes = (isAuthenticated) =>
  [{
    path: 'app',
    element: !isAuthenticated ? <MainLayout /> : <DashboardLayout />,
    children: [
      { path: '', element: !isAuthenticated ? <LoginView /> : <AccountView /> },
      { path: 'account', element: !isAuthenticated ? <LoginView /> : <AccountView /> },
      { path: 'transactions', element: !isAuthenticated ? <LoginView /> : <TransactionListView /> },
      { path: 'newtransaction', element: !isAuthenticated ? <LoginView /> : <NewTransactionView /> },
      { path: 'dashboard', element: !isAuthenticated ? <LoginView /> : <DashboardView /> },
      { path: 'buyers', element: !isAuthenticated ? <LoginView /> : <BuyerListView /> },
      { path: 'settings', element: !isAuthenticated ? <LoginView /> : <SettingsView /> },
      { path: 'newaccount', element: !isAuthenticated ? <LoginView /> : <NewAccountView /> },
      { path: 'newbuyer', element: !isAuthenticated ? <LoginView /> : <NewBuyerView /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  },
  {
    path: '/',
    element: !isAuthenticated ? <MainLayout /> : <DashboardLayout />,
    children: [
      { path: 'login', element: !isAuthenticated ? <LoginView /> : <AccountView /> },
      { path: 'register', element: !isAuthenticated ? <RegisterView /> : <AccountView /> },
      { path: '404', element: <NotFoundView /> },
      { path: '/', element: !isAuthenticated ? <LoginView /> : <AccountView />},
      { path: '*', element: <Navigate to="/404" /> }
    ]
  }
]

export default routes;
