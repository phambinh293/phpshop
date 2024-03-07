import React from 'react'
import CustomInput from '../Components/CustomInput'
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ForgetPassword } from '../features/users/userSlice';
import { Container, Row } from 'react-bootstrap'
import { Helmet } from 'react-helmet';


const emailSchema = yup.object({
  email: yup.string().email().required('Email is Required'),
});

const Forgotpassword = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: emailSchema,
    onSubmit: values => {
      dispatch(ForgetPassword(values));
      setTimeout(() => {
        navigate('/login')
      }, 300)
    },
  });
  return (
    <Container>
      <Helmet>
        <title>Quên mật khẩu | PHBshop</title>
      </Helmet>
      <Row className='justify-content-center align-items-center'>
        <form onSubmit={formik.handleSubmit}>
          <div className='mb-3'>
            <h3 className='text-center'>Forgot Password</h3>
          </div>
          <div className='mb-3'>
            <p className='text-center'>Please Enter your resgister email to get reset password email</p>
          </div>
          <input
            type="text"
            className="form-control"
            name="email"
            placeholder='Email'
            value={formik.values.email}
            onChange={formik.handleChange('email')}
            onBlur={formik.handleBlur('email')}
          />
          <div className='error'>
            {
              formik.touched.email && formik.errors.email
            }
          </div>
          <button type='submit' className='border-0 px-3 py-2 text-white fw-bold w-100 mt-3' style={{ background: "#ffd333" }}>Send Link</button>
        </form>
      </Row>
    </Container>
  )
}

export default Forgotpassword
