import React, { useEffect, useState } from 'react'
import Layout from '../../components/layout'
import styles from './index.module.scss'
import { Card, Form, Row, Space, Typography } from 'antd'
import MyInput from '../../components/myInput'
import PasswordInput from '../../components/passwordInput'
import { Link, useNavigate } from 'react-router-dom'
import { Paths } from '../../paths'
import { useSelector } from 'react-redux'
import { register, useLoginMutation, useRegisterMutation, UserData } from '../../app/services/auth'
import { selectUser } from '../../features/auth/authSlice'
import { isErrorWithMessage } from '../../utils/is-error-with-message'
import MyButton from '../../components/myButton'




const Register = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const user = useSelector(selectUser);
  const [registerUser, registerUserResult] = useRegisterMutation();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const register = async (data: UserData) => {
    try {
      await registerUser(data).unwrap();

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
        <Row className={styles.Row}>
          <Card title="Зарегистрируйтесь" className={styles.Card}>
            <Form onFinish={register} className={styles.Form}>
              <MyInput placeholder='Email' name='email'/>
              <MyInput placeholder='Address' name='address'/>
              <MyInput placeholder='Name' name='name'/>
              <PasswordInput placeholder='Password' name='password'/>
              <PasswordInput placeholder='Confirm password' name='confirmPassword'/>
              <MyButton
              type="primary"
              htmlType="submit"
              loading={registerUserResult.isLoading}
            >
              Зарегистрироваться
            </MyButton>
            </Form>
            <Space direction='vertical' size='large'>
              <Typography.Text>
                Есть аккаунт? <Link to={Paths.login}>Войдите</Link>
              </Typography.Text>
            </Space>
          </Card>
        </Row>  
      </Layout>
  )
}

export default Register