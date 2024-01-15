import React from "react"
import ReactDOM from "react-dom/client"
import { Provider } from "react-redux"
import { store } from "./app/store"
import "./index.css"
import { Button } from "@mui/material"
import Menu from "./components/Menu/Menu"
import { Paths } from "./paths"
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import Login from "./pages/login"
import Register from "./pages/register"
import { ConfigProvider, theme } from "antd"
import Employees from "./pages/employees"
import Auth from "./features/auth/auth"
import {AddEmployee} from "./pages/addEmployee"
import Status from "./pages/status"
import Employee from "./pages/employee"
import {EditEmployee} from "./pages/editEmployee"

const router = createBrowserRouter([
  {
    path: Paths.home,
    element: <Employees/>
  },
  {
    path: `${Paths.employee}/:id`,
    element: <Employee/>
  },
  {
    path: `${Paths.employeeEdit}/:id`,
    element: <EditEmployee/>
  },
  {
    path: Paths.login,
    element: <Login/>
  },
  {
    path: Paths.register,
    element: <Register/>
  },
  {
    path: Paths.employeeAdd,
    element: <AddEmployee/>
  },
  
  {
    path: `${Paths.status}/:status`,
    element: <Status/>
  },
])

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ConfigProvider theme={{
        algorithm: theme.darkAlgorithm
      }}>
        <Auth children={
          <RouterProvider router={router} 
        />}/>
          
        
      </ConfigProvider>
    </Provider>
  </React.StrictMode>,
)
