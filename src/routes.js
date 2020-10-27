import React from 'react';
import { Navigate } from 'react-router-dom';
import DashboardLayout from 'src/layouts/DashboardLayout';
import MainLayout from 'src/layouts/MainLayout';
import AccountView from 'src/views/account/AccountView';
import CustomerListView from 'src/views/customer/CustomerListView';
import DashboardView from 'src/views/reports/DashboardView';
import LoginView from 'src/views/auth/LoginView';
import NotFoundView from 'src/views/errors/NotFoundView';
import ProductListView from 'src/views/product/ProductListView';
import RegisterView from 'src/views/auth/RegisterView';
import SettingsView from 'src/views/settings/SettingsView';

  const routes = (isAuthenticated) =>
  [{
    path: 'app',
    element: !isAuthenticated ? <MainLayout /> : <DashboardLayout />,
    children: [
      { path: '', element: !isAuthenticated ? <LoginView /> : <AccountView /> },
      { path: 'account', element: !isAuthenticated ? <LoginView /> : <AccountView /> },
      { path: 'customers', element: !isAuthenticated ? <LoginView /> : <CustomerListView /> },
      { path: 'dashboard', element: !isAuthenticated ? <LoginView /> : <DashboardView /> },
      { path: 'products', element: !isAuthenticated ? <LoginView /> : <ProductListView /> },
      { path: 'settings', element: !isAuthenticated ? <LoginView /> : <SettingsView /> },
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
