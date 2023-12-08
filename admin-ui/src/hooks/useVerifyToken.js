import useAuth from './useAuth';
import { jwtDecode } from 'jwt-decode';
import Global from "../constant/Global";
import {Navigate, useNavigate} from "react-router-dom";
import React from 'react';
import { Button, notification, Space } from 'antd';


const useVerifyToken = () => {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const verify = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        if (decodedToken.exp * 1000 <= Date.now()) {
          localStorage.removeItem(Global.key.token);
          localStorage.removeItem(Global.key.isLoggedIn);
          const isLoggedIn = false;
          setAuth({ isLoggedIn });
          return (
              <Navigate to='/login'/>
          )

        } else {
          const isLoggedIn = true;
          setAuth((prev) => {
            return { ...prev, isLoggedIn, token };
          });
          // console.log('not expired');
        }
      } catch (error) {
        console.log('error while decoding token: ', error);
        const isLoggedIn = false;
        setAuth({ isLoggedIn });
      }
    }
    return token;
  };
  return verify;
};

export default useVerifyToken;
