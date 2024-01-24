import { Formik, Field, Form, ErrorMessage } from 'formik';
import { useRouter } from 'next/router';
import * as Yup from 'yup';


const LoginContainer = () => {

    const router = useRouter()

  const initialValues = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string()
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters')
      .matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])/, 'Password must contain at least one number and one special character'),
  });

  const handleSubmit = async (values: any) => {
    try {
      const response = await fetch('https://mock-api.arikmpt.com/api/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error('Failed to login');
      }

      const data = await response.json();
      console.log('Login success:', data);
      window.sessionStorage.setItem("token", data.data.token);

      router.push('/home')

    } catch (error: any) {
        alert('Login is not succesfull, please check your email and password')
      console.error('Login error:', error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen" style={{ background: 'gray' }}>
        <div className='mb-4'>
        <h1 className='text-3xl font-bold mb-4 text-center'>Please Login to Weather App</h1> </div>
      <div className="bg-white p-8 rounded-lg shadow-md">
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
          <Form>
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
              <button type="submit" className="bg-gray-900 text-white px-4 py-2 rounded hover:bg-gray-500 w-80">Login Here</button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default LoginContainer;
