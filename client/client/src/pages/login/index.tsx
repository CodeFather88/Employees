import React, { useEffect, useState } from 'react'
import Layout from '../../components/layout'
import { Row, Card, Form, Input, Space, message, Typography } from 'antd'
import styles from './index.module.scss'
import MyButton from '../../components/myButton'
import MyInput from '../../components/myInput'
import PasswordInput from '../../components/passwordInput'
import { Link, useNavigate } from 'react-router-dom'
import { Paths } from '../../paths'
import { useLoginMutation, UserData } from '../../app/services/auth'
import {isErrorWithMessage} from '../../utils/is-error-with-message'
import { ErrorMessage } from '../../components/error-message'
import { useSelector } from 'react-redux'
import { selectUser } from '../../features/auth/authSlice'



const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const user = useSelector(selectUser);
  const [loginUser, loginUserResult] = useLoginMutation();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const login = async (data: UserData) => {
    try {
      await loginUser(data).unwrap();

      navigate("/");
    } catch (err) {
      const maybeError = isErrorWithMessage(err);

      if (maybeError) {
        setError(err.data.message);
      } else {
        setError("Неизвестная ошибка");
      }
    }
  };

  return (
    <Layout>
      <Row align="middle" justify="center">
        <Card title="Войдите" style={{ width: "30rem" }}>
          <Form onFinish={login}>
            <MyInput type="email" name="email" placeholder="Email" />
            <PasswordInput name="password" placeholder="Пароль" />
            <MyButton
              type="primary"
              htmlType="submit"
              loading={loginUserResult.isLoading}
            >
              Войти
            </MyButton>
          </Form>
          <Space direction="vertical" size="large">
            <Typography.Text>
              Нет аккаунта? <Link to={Paths.register}>Зарегистрируйтесь</Link>
            </Typography.Text>
            <ErrorMessage message={error} />
          </Space>
        </Card>
      </Row>
    </Layout>
  );
};


export default Login;