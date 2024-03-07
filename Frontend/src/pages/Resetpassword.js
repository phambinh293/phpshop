import React, { useEffect } from 'react'
import CustomInput from '../Components/CustomInput';
import { Container, Row } from 'react-bootstrap'
import { Helmet } from 'react-helmet';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { ResetPassword } from '../features/users/userSlice';

const resetSchema = yup.object({
  email: yup.string().email().required('Email is Required'),
  newPassword: yup.string().required("Password is Required")
  .min(6, 'Password must be at least 6 characters')
  .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character')
  .matches(/[0-9]/, 'Password must contain at least one digit'),
  confirmPassword: yup.string()
  .oneOf([yup.ref('newPassword'), null], 'New Password must be matched with Confirm Password!')
  .required('Confirm Password is Required')
});


const Resetpassword = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const getToken = location.pathname.split("/")[2];

  const formik = useFormik({
    initialValues: {
      token: getToken || "",
      email: '',
      newPassword: '',
      confirmPassword: '',
    },
    validationSchema: resetSchema,
    onSubmit: values => {
      dispatch(ResetPassword(values));
      setTimeout(() => {
        navigate('/login')
      }, 300)
    },
  });
  useEffect(() => {
    formik.setFieldValue("token", getToken)
  }, [getToken])
  return (
    <Container className="w-75">
      <Helmet>
        <title>Reset password | PHBshop</title>
      </Helmet>
      <Row className='justify-content-center align-items-center'>
        <form onSubmit={formik.handleSubmit} className='w-50'>
          <div>
            <h3 className='text-center'>Reset Password</h3>
          </div>
          <div>
            <p className='text-center'>Please Enter your new password</p>
          </div>
          <div className="form-outline mb-4">
            <label className="form-label">Email</label>
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
          </div>
          <div className="form-outline mb-4">
            <label className="form-label">New Password</label>
            <input
              type="text"
              className="form-control"
              name="newPassword"
              placeholder='NewPassword'
              value={formik.values.newPassword}
              onChange={formik.handleChange('newPassword')}
              onBlur={formik.handleBlur('newPassword')}
            />
            <div className='error'>
              {
                formik.touched.newPassword && formik.errors.newPassword
              }
            </div>
          </div>
          <div className="form-outline mb-4">
            <label className="form-label">Confirm Password</label>
            <input
              type="text"
              className="form-control"
              name="confirmPassword"
              placeholder='ConfirmPassword'
              value={formik.values.confirmPassword}
              onChange={formik.handleChange('confirmPassword')}
              onBlur={formik.handleBlur('confirmPassword')}
            />
            <div className='error'>
              {
                formik.touched.confirmPassword && formik.errors.confirmPassword
              }
            </div>
          </div>
          <button type='submit' className='border-0 px-3 py-2 text-white fw-bold w-100' style={{ background: "#ffd333" }}>Reset Password</button>
        </form>
      </Row>
    </Container>
  )
}

export default Resetpassword;
