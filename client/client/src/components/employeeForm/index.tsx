import { Employee } from "@prisma/client";
import { Form, Card, Space } from "antd";
import  MyButton  from "../myButton";
import  MyInput  from "../myInput";
import { ErrorMessage } from "../error-message";

type Props<T> = {
  onFinish: (values: T) => void;
  btnText: string;
  title: string;
  error?: string;
  employee?: T;
};

export const EmployeeForm = ({
  onFinish,
  title,
  employee,
  btnText,
  error,
}: Props<Employee>) => {
  return (
    <Card title={title} style={{ width: "30rem" }}>
      <Form name="add-employee" onFinish={onFinish} initialValues={employee}>
        <MyInput type="text" name="firstName" placeholder="Имя" />
        <MyInput name="lastName" placeholder="Фамилия" />
        <MyInput type="number" name="age" placeholder="Возраст" />
        <MyInput name="address" placeholder="Адрес" />
        <Space direction="vertical" size="large">
          <ErrorMessage message={ error } />
          <MyButton htmlType="submit">{btnText}</MyButton>
        </Space>
      </Form>
    </Card>
  );
};