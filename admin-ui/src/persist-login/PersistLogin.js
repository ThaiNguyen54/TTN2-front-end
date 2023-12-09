import { Navigate, Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';
import useAuth from '../hooks/useAuth';
import { jwtDecode } from 'jwt-decode';
import useVerifyToken from '../hooks/useVerifyToken';
import Global from '../constant/Global';

const PersistLogin = () => {
  const { auth } = useAuth();
  const verify = useVerifyToken();
  const isLoggedIn = localStorage.getItem(Global.key.isLoggedIn);

  useEffect(() => {
    const verifyToken = async () => {
      try {
        await verify();
      } catch (error) {
        console.log(error);
      }
    };
    verifyToken();
  }, []);

  if (isLoggedIn === null || isLoggedIn === false) {
    return (
      <>
        <Navigate to="/login" />
      </>
    );
  } else {
    return (
      <>
        <Outlet></Outlet>
      </>
    );
  }
};

export default PersistLogin;
