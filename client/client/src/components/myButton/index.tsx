import React, { ReactNode } from 'react'
import { Button, Form } from 'antd'

type Props = {
    children: React.ReactNode;
    htmlType?: 'button' | 'submit' | 'reset' | undefined 
    onClick?: ()=>void
    type?: "link" | "text" | "default" | "primary" | "dashed" | undefined
    danger?: boolean
    loading?: boolean 
    shape?: "default" | "circle" | "round" | undefined
    icon?: React.ReactNode
    ghost?: boolean
    className?: string

}
const MyButton: React.FC<Props> = ({className, ghost, icon, children, htmlType, type, danger, loading, shape, onClick}) => {
  return (
    <Form.Item>
        <Button
        
        
        htmlType={htmlType} 
        type={type}
        danger={danger} 
        loading={loading} 
        shape={shape} 
        onClick={onClick}
        icon={icon}
        ghost={ghost}
        className={className}
        >
            {children}
        </Button>
    </Form.Item>
  )
}

export default MyButton