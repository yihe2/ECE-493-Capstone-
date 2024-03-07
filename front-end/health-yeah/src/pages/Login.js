import React, { useState } from 'react';
// import 'antd/dist/antd.css'; // Import Ant Design styles
// import "antd/dist/reset.css"

const LoginPage = () => {
  const [loading, setLoading] = useState(false);

  const onFinish = (values) => {
    // Placeholder for login logic
    setLoading(true);
    // Simulate API call (replace this with your actual login logic)
    setTimeout(() => {
      console.log('Received values:', values);
      setLoading(false);
    }, 1000);
  };

  return (
    <div></div>
    // <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
    //   <Form
    //     name="login-form"
    //     labelCol={{ span: 8 }}
    //     wrapperCol={{ span: 16 }}
    //     onFinish={onFinish}
    //     initialValues={{ remember: true }}
    //   >
    //     <Form.Item
    //       label="Username"
    //       name="username"
    //       rules={[{ required: true, message: 'Please input your username!' }]}
    //     >
    //       <Input />
    //     </Form.Item>

    //     <Form.Item
    //       label="Password"
    //       name="password"
    //       rules={[{ required: true, message: 'Please input your password!' }]}
    //     >
    //       <Input.Password />
    //     </Form.Item>

    //     <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
    //       <Checkbox>Remember me</Checkbox>
    //     </Form.Item>

    //     <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
    //       <Button type="primary" htmlType="submit" loading={loading}>
    //         Log in
    //       </Button>
    //     </Form.Item>
    //   </Form>
    // </div>
  );
};

export default LoginPage;