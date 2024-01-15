import React from 'react'
import styles from './index.module.scss'
import { Layout, Space, Typography, Button } from 'antd'
import { LoginOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons'
import MyButton from '../myButton'
import { Link, useNavigate, useNavigation } from 'react-router-dom'
import { Paths } from '../../paths'
import { useDispatch, useSelector } from 'react-redux'
import { logout, selectUser } from '../../features/auth/authSlice'

const Header = () => {
    const user = useSelector(selectUser);
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const onLogoutClick = () => {
        dispatch(logout());
        localStorage.removeItem("token");
        navigate("/login");
      };
    return (
    <Layout.Header className={styles.header} >
        <Space>
            <TeamOutlined className={styles.teamIcon}/>
            <Link to={(Paths.home)}>
                <MyButton ghost>
                    <Typography.Title level={1}>
                        Сотрудники
                    </Typography.Title>
                </MyButton>
            </Link>
        </Space>
        {user? (
            <Space>
                <MyButton onClick={onLogoutClick} children={'Выйти'}/>
            </Space>
        ):
        (
            <Space>
                <Link to={Paths.register}>
                    <MyButton ghost icon={<UserOutlined/>}>Зарегистрироваться</MyButton>
                </Link>
                <Link to={Paths.login}>
                    <MyButton ghost icon={<LoginOutlined/>}>Войти</MyButton>
                </Link>
            </Space>
        )}
        
    </Layout.Header>
  )
}

export default Header