import { Redirect } from "react-router";
import  Home  from "../components/Home/Home";
import { Login } from "../components/Login";
import UserManagementPage  from "../components/Admin/UserManagement/UserManagementPage";
import AdminHomePage  from "../components/Admin/AdminHomePage/AdminHomePage";
import ViewUserPage from "../components/Admin/ViewUserPage/ViewUserPage"
import  BookSeatPage  from "../components/BookSeatPage/BookSeatPage";
import AddNewUser from "../components/Admin/AddNewUser/AddNewUser"
import Table from "../components/Table";
import AuthLayout from "../layouts/Auth";
import DashboardLayout from '../layouts/Dashboard';

import Admin_seatlayout from "../components/Seats/AdminLayout/Admin_seatlayout"
import Manager_seatlayout from "../components/Seats/ManagerLayout/Manager_seatlayout";
import Employee_seatlayout from "../components/Seats/EmployeeLayout/Employee_seatlayout";


import UserProfile from "../components/User/UserProfilePage/UserProfile";
import UserBookHistory from "../components/User/UserBookHistory/UserBookHistory";


export const routes = [
  {
    path: "/",
    exact: true,
    component: () =>  <Redirect to="/home" />,
  },
  {
    path: "/auth",
    component: AuthLayout,
    routes: [
      {
        path: "/auth/login",
        exact: true,
        component: Login,
      },
    ],
  },
  {
    route: '*',
    component: DashboardLayout,
    routes: [
      {
        path: "/home",
        exact: true,
        component: (props) => {return props.isAuthenticated ? <Home /> : <Redirect to="/auth/login" />}
          ,
      },
      {
        path: "/seatlayout",
        exact: true,
        component: (props) => {return !props.isAuthenticated ? <Redirect to="/auth/login" /> : localStorage.getItem('id')==7 ? <Admin_seatlayout/> :  localStorage.getItem('id')==1234 ? <Manager_seatlayout/> : <Employee_seatlayout/> }
        // component: (props) => {return props.isAuthenticated ? <Page /> : <Redirect to="/auth/login" />}
      },
      {
        path: "/admin/usermanagement",
        exact: true,
        component: (props) => {return props.isAuthenticated ? <UserManagementPage /> : <Redirect to="/auth/login" />}
      },
      {
        path: "/user/userprofile",
        exact: true,
        component: (props) => {return props.isAuthenticated ? <UserProfile /> : <Redirect to="/auth/login" />}
          ,
      },
      {
        path: "/user/userbookhistory",
        exact: true,
        component: (props) => {return props.isAuthenticated ?  <UserBookHistory /> : <Redirect to="/auth/login" />}
          ,
      },
      {
        path: "/admin/adminhome",
        exact: true,
        component: (props) => {return props.isAuthenticated ? <AdminHomePage /> : <Redirect to="/auth/login" />}
          ,
      },
      {
        path: "/admin/viewuser/:associate_id",
        exact: true,
        component: (props) => {return props.isAuthenticated ? <ViewUserPage /> : <Redirect to="/auth/login" />}
          ,
      },
      {
        path: "/bookyourseat",
        exact: true,
        component: (props) => {return props.isAuthenticated ? <BookSeatPage /> : <Redirect to="/auth/login" />}
          ,
      },
      {
        path: "/admin/addnewuser",
        exact: true,
        component: (props) => {return props.isAuthenticated ? <AddNewUser /> : <Redirect to="/auth/login" />}
          ,
      },
      {
        path:"/table",
        exact: true,
        component: (props) => {return props.isAuthenticated ? <Table /> : <Redirect to="/auth/login" />}
      }
    ]
  }
];
