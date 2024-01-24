import { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/router';

const RegisterContainer = () => {
  const router = useRouter();

  const initialValues = {
    name: '',
    email: '',
    password: '',
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string()
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters')
      .matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])/, 'Password must contain at least one number and one special character'),
  });

  const [error, setError] = useState<string | null>(null);

  const handleRegister = async (values: any) => {
    try {
      const response = await fetch('https://mock-api.arikmpt.com/api/user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

    if (response.ok) {
        router.push('/login');
      } else {
        const data = await response.json();
        setError(data.errors || 'Registration failed');

      }
    } catch (error) {
      console.error('Registration error:', error);
      setError('An error occurred during registration.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen" style={{ background: 'gray' }}>
      <div className='mb-4'>
        <h1 className='text-3xl font-bold mb-4 text-center'>Register Your Account Here</h1> </div>
      <div className="bg-white p-8 rounded-lg shadow-md"> 
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleRegister}>
          <Form className="border border-black border-2 rounded-md p-6">
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-800">Name</label>
              <Field type="text" id="name" name="name" className="w-full border-2 border-black rounded p-2 shadow-md" />
              <ErrorMessage name="name" component="div" className="text-purple-700 font-semibold mt-1" />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-800">Email</label>
              <Field type="email" id="email" name="email" className="w-full border-2 border-black rounded p-2 shadow-md" />
              <ErrorMessage name="email" component="div" className="text-purple-700 font-semibold mt-1" />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-800">Password</label>
              <Field type="password" id="password" name="password" className="w-full border-2 border-black rounded p-2 shadow-md" />
              <ErrorMessage name="password" component="div" className="text-purple-700 font-semibold mt-1" />
            </div>
            <div className="mt-6">
              <button type="submit" className="bg-gray-900 text-white px-4 py-2 rounded hover:bg-gray-500 w-80">Register Now</button>
            </div>
          </Form>
        </Formik>
        {error && <div className="text-purple-700 font-semibold mt-1">{error}</div>}
      </div>
    </div>
  );
};

export default RegisterContainer;
