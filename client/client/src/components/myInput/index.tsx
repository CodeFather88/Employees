import { Form, Input } from 'antd'
import React from 'react'

type Props={
    placeholder?: string
    type?: string
    name?: string
}

const MyInput = ({
    placeholder, type, name
}: Props) => {
  return (
    <Form.Item
        name={name}
        rules={[{required: true, message: "Обязательное поле"}]}
        shouldUpdate={true}
    >   
        <Input
            placeholder={placeholder}
            type={type}
            size='large'
        />
    </Form.Item>
  )
}

export default MyInput