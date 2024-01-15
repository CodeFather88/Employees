import React, { useState } from 'react'
import Layout from '../../components/layout'
import { Link, Navigate, useNavigate, useNavigation, useParams } from 'react-router-dom'
import { useGetEmployeeQuery, useRemoveEmployeeMutation } from '../../app/services/employees'
import { selectUser } from '../../features/auth/authSlice'
import { Descriptions, Divider, Space } from 'antd'
import { useSelector } from 'react-redux'
import MyButton from '../../components/myButton'
import { Paths } from '../../paths'
import { isErrorWithMessage } from '../../utils/is-error-with-message'

const Employee = () => {
  const navigate = useNavigate()
  const [error, setError] = useState('')
  const params = useParams<{id: string}>()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const {data, isLoading}= useGetEmployeeQuery(params.id||"")
  const [removeEmployee]=useRemoveEmployeeMutation()
  const user=useSelector(selectUser)

  if(isLoading){
    return <span>Загрузка</span>
  }
  if (!data) {
    return <Navigate to="/" />;
  }

  const showModal = () => {
    setIsModalOpen(true);
  };

  const hideModal = () => {
    setIsModalOpen(false);
  };

  const handleDeleteEmployee = async () => {
    hideModal();

    try {
      await removeEmployee(data.id).unwrap();

      navigate(`${Paths.status}/deleted`);
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
      <Descriptions bordered title="Информация о сотруднике">
         <Descriptions.Item label="Имя" span={3}>
            {`${data?.firstName} ${data?.lastName}`}
         </Descriptions.Item>
         <Descriptions.Item label="Возраст" span={3}>
            {`${data?.age}`}
         </Descriptions.Item>
         <Descriptions.Item label="Адрес" span={3}>
            {`${data?.address}`}
         </Descriptions.Item>
      </Descriptions>
      {
        user?.id===data.userId && (
          <>
            <Divider orientation='left'>
              Действия
            </Divider>
            <Space>
              <Link to={`/employee/edit/${data?.id}`}>
                <MyButton
                    shape="round"
                    children={'Редактировать'}
                  />
              </Link>
              
              <MyButton
                  danger
                  shape="round"
                  children={'Удалить'}
                  onClick={handleDeleteEmployee}
                />
            
            </Space>
          </>
        )
      }
    </Layout>
  )
}

export default Employee