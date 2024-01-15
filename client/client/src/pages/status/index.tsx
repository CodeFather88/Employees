import { Button, Result, Row } from 'antd'
import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { Paths } from '../../paths'

const Statuses: Record<string, string>={
    created: 'Создан',
    updated:'обновлен',
    deleted:'удален'
}

const Status = () => {
    const {status}=useParams()
  return (
    <Row align='middle' justify='center'>
        <Result
            status={status? 'success':404}
            title={status? Statuses[status]:'не найдено'}
            extra=
            {
                <Button key='dashboard'>
                    <Link to={Paths.home}>
                        На главную
                    </Link>
                </Button>
            }
        />
    </Row>
  )
}

export default Status