import React from 'react'
import styles from './index.module.scss'
import { Layout as AntLayout } from 'antd'
import Header from '../header'

type Props = {
    children: React.ReactNode
}

const Layout: React.FC<Props> = ({children}) => {
  return (
    <div className={styles.main}>
        <Header/>
        <AntLayout.Content style={{height: '100%'}}>
            {children}
        </AntLayout.Content>
        
    </div>
  )
}

export default Layout 