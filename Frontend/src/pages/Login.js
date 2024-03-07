import React, { useEffect } from 'react'
import { Container, Row } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../features/users/userSlice';
import { Helmet } from 'react-helmet';

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
    if (authState.user !== null && authState.isError === false) {
      navigate('/')
    }
  }, [authState])
  return (
    <Container>
      <Helmet>
        <title>Đăng nhập | PHBshop</title>
      </Helmet>
      <Row className='justify-content-center align-items-center'>
        <form onSubmit={formik.handleSubmit} className='w-50'>
          <div>
            <h3 className='text-center'>Đăng nhập tài khoản</h3>
          </div>
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
          <div className="row mb-4">

            <div className="col">
              <Link to="/forgot-password" className='ml-1'>Quên mật khẩu?</Link>
            </div>
          </div>
          <button type="submit" className="btn btn-primary btn-block mb-4 background-primary text-dark">Đăng nhập</button>
          <div className="col d-flex justify-content-center">
            Bạn chưa có tài khoản? <Link to="/register" className='ml-1'>Đăng ký ngay</Link>
          </div>
        </form>
      </Row>
    </Container>
  )
}

export default Login
