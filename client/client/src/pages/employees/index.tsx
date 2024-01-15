import React, { useEffect } from 'react'
import Layout from '../../components/layout'
import { Card, Row, Table } from 'antd'
import styles from './index.module.scss'
import Column from 'antd/es/table/Column'
import { PlusCircleOutlined } from '@ant-design/icons'
import MyButton from '../../components/myButton'
import { useGetAllEmployeesQuery } from '../../app/services/employees'
import { Paths } from '../../paths'
import { useNavigate } from 'react-router-dom'
import { selectUser } from '../../features/auth/authSlice'
import { useSelector } from 'react-redux'

const columns = [
  {
    title: 'Имя',
    dataIndex: 'firstName',
    key: 'firstName',
  },
  {
    title: 'Фамилия',
    dataIndex: 'lastName',
    key: 'lastName',
  },
  {
    title: 'Возраст',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Адрес',
    dataIndex: 'address',
    key: 'address',
  },
];



const Employees = () => {
  const navigate = useNavigate()
  const user = useSelector(selectUser)
  const {data, isLoading} = useGetAllEmployeesQuery()
  
  useEffect(()=>{
    if(!user){
      navigate('/login')
    }
  }, [navigate, user])

  const addEmployee = () => navigate(Paths.employeeAdd)


  

  return (
    <Layout>
        <MyButton children='Добавить' type='primary' onClick={()=>addEmployee() } icon={<PlusCircleOutlined/>}/>
        <Table 
          pagination={false} 
          loading={isLoading} 
          dataSource={data} 
          columns={columns} 
          rowKey={(employee)=>employee.id} 
          onRow={(employee)=>{
            return{
              onClick: () => 
              
              navigate(`${Paths.employee}/${employee.id}`)
              
            }
        }}/>
    </Layout>
  )
}

export default Employees