import React, { useEffect } from 'react'
import CustomInput from '../components/CustomInput';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../features/auth/authSlice';
import { ToastContainer, toast } from 'react-toastify';

const loginSchema = yup.object({
    username: yup.string().required('Username is Required'),
    password: yup.string().required("Password is Required")
});


const Login = () => {
    const authState = useSelector(state => state.auth);
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        validationSchema: loginSchema,
        onSubmit: values => {
            dispatch(login(values));
        },
    });
    useEffect(() => {
        if(authState.isError){
          toast.error("Login fail!!!");
        }
        if (authState.user !== null && authState.isError === false) {
            navigate('/admin')
        }
    }, [authState])
    return <div className='py-5 bg-yl min-h'>
        <br />
        <br />
        <br />
        <div className='my-5 w-25 bg-white rounded-3 mx-auto p-3 mt-3'>
            <h3 className='text-center'>Login</h3>
            <br />
            <div className='justify-content-center align-items-center'>
            <form onSubmit={formik.handleSubmit}>
          <div className="form-outline mb-4">
            <label className="form-label">Username</label>
            <input
              type="text"
              className="form-control"
              name="username"
              placeholder='Username'
              value={formik.values.username}
              onChange={formik.handleChange('username')}
              onBlur={formik.handleBlur('username')}
            />
            <div className='error'>
              {
                formik.touched.username && formik.errors.username
              }
            </div>
          </div>
          <div className="form-outline mb-4">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              placeholder='Password'
              value={formik.values.password}
              onChange={formik.handleChange('password')}
              onBlur={formik.handleBlur('password')}
            />
            <div className='error'>
              {
                formik.touched.password && formik.errors.password
              }
            </div>
          </div>          
          <button type="submit" className="btn btn-primary btn-block mb-4 background-primary text-dark">Đăng nhập</button>
            </form>
            </div>
        </div>
        <ToastContainer
            position="top-right"
            autoClose={250}
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            theme="light"
          />
    </div>;
};

export default Login;