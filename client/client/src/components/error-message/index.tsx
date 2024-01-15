import { Alert } from 'antd'
import React from 'react'

type Props = {
    message?: string
    type?: string
}

export const ErrorMessage = ({message, type}: Props) => {
    if(!message){
        return null
    } 

  return (
    <Alert message={message} type='error'/>
  )
}
