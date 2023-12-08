import { Button, Checkbox, Form, Input, Modal, Spin } from 'antd';
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link, useNavigate, useLocation, Navigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { useEffect, useRef, useState, useContext } from 'react';
import axios from 'axios';
import host from '../../axios/host';

const onFinish = (values) => {
  console.log('Success:', values);
};
const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

const defaultTheme = createTheme();
const Login = () => {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';
  const [admin, setAdmin] = useState({ username: '', password: '' });

  const [isLoading, setIsLoading] = useState(false);

  const successModal = (msg) => {
    Modal.success({
      content: msg
    });
  };

  const errorModal = (msg) => {
    Modal.error({
      title: msg
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (admin.username !== '' && admin.password !== '') {
        setIsLoading(true);
        const res = await axios.post(`${host.local}/ttn2/v1/admin/login`, admin);
        setIsLoading(false);

        const accessToken = res?.data?.token;
        const isLoggedIn = true;
        setAuth({ isLoggedIn, accessToken });
        navigate(from, { replace: true });
      }
    } catch (error) {
      console.log(error)
      setIsLoading(false);
      let errorMsg = '';
      if (!error?.response) {
        errorMsg = 'No Server Response';
      } else if (error.response?.status === 422) {
        // console.log(error.response.data.description);
        errorMsg = 'username hoặc password không đúng';
      } else if (error.response?.status === 404) {
        errorMsg = 'Không tìm thấy tài khoản';
      }
      errorModal(errorMsg);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Form
            name="basic"
            labelCol={{
              span: 8
            }}
            wrapperCol={{
              span: 16
            }}
            style={{
              maxWidth: 900,
              marginTop: 20
            }}
            initialValues={{
              remember: true
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Username"
              name="username"
              rules={[
                {
                  required: true,
                  message: 'Please input your username!'
                }
              ]}
            >
              <Input
                onChange={(e) => {
                  setAdmin({ ...admin, username: e.target.value });
                }}
              />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Please input your password!'
                }
              ]}
            >
              <Input.Password onChange={(e) => setAdmin({ ...admin, password: e.target.value })} />
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16
              }}
            >
              <Button type="primary" htmlType="submit" onClick={handleSubmit}>
                Sign in
              </Button>
            </Form.Item>
          </Form>
        </Box>
      </Container>
      <Modal
        style={{ textAlign: 'center' }}
        title="Đang đăng nhập, vui lòng đợi trong giây lát"
        open={isLoading}
        footer={null}
        closable={false}
        keyboard={false}
      >
        <Spin size="large" />
      </Modal>
    </ThemeProvider>
  );
};
export default Login;
