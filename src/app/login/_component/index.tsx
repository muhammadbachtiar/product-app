'use client';

import { useState } from 'react';
import { Button, Form, Input } from 'antd';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/configs/firebase';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';


export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onFinish = async (values: { email: string; password: string }) => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, values.email, values.password);
        router.push('/products');
      toast.success('Login successful!');
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <Form
          name="login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          layout="vertical"
        >
          <Form.Item
            name="email"
            rules={[{ required: true, message: 'Please input your Email!' }, { type: 'email', message: 'Invalid email format!' }]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="Email"
              className="rounded-md"
              size="large"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your Password!' }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Password"
              className="rounded-md"
              size="large"
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              className="w-full bg-blue-500 hover:bg-blue-600"
              size="large"
            >
              Log in
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}