import React from 'react'
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { UpdateAUser } from '../features/users/userSlice';
import { Helmet } from 'react-helmet';

const userSchema = yup.object({
  name: yup.string().required('Username is Required'),
  age: yup.number()
    .moreThan(0, 'Giá trị phải lớn hơn 0')
    .required("Password is Required"),
  address: yup.string().required('Username is Required'),
  phoneNumber: yup.string()
    .matches(/^(0\d{9})$/, 'Số điện thoại không hợp lệ')
    .required('Vui lòng nhập số điện thoại'),
  email: yup.string().email("Email Should be valid").required('Email is Required'),
  userName: yup.string().required('Username is Required')
  .min(6, 'Username must be at least 6 characters'),
});

const Thongtindiachi = () => {
  const authState = useSelector(state => state?.auth?.user?.userDto);
  const dispatch = useDispatch()
  const formik = useFormik({
    initialValues: {
      id: authState?.id,
      name: authState?.name,
      age: authState?.age,
      address: authState?.address,
      phoneNumber: authState?.phoneNumber,
      email: authState?.email,
      userName: authState?.userName,
      token: authState?.token,
      expiration: authState?.expiration,
    },
    validationSchema: userSchema,
    onSubmit: values => {
      const data = { id: authState.id, data: values }
      dispatch(UpdateAUser(data))
    },
  });
  return (
    <>
       <Helmet>
                <title>Thông tin tải khoản | PHBshop</title>
            </Helmet>
    <div>
      <form onSubmit={formik.handleSubmit} className='w-75 m-auto'>
        <div>
          <h3 className='text-center'>Thông Tin Tài Khoản</h3>
        </div>
        <div className="form-outline mb-4">
          <label className="form-label">Họ Tên</label>
          <input
            type="text"
            className="form-control"
            name="name"
            placeholder='Name'
            value={formik.values.name}
            onChange={formik.handleChange('name')}
            onBlur={formik.handleBlur('name')}
          />
          <div className='error'>
            {
              formik.touched.name && formik.errors.name
            }
          </div>
        </div>
        <div className="form-outline mb-4">
          <label className="form-label">Tuổi</label>
          <input
            type="number"
            className="form-control"
            name="age"
            placeholder='Age'
            value={formik.values.age}
            onChange={formik.handleChange('age')}
              onBlur={formik.handleBlur('age')}
              min={0}
              max={100}
          />
          <div className='error'>
            {
              formik.touched.age && formik.errors.age
            }
          </div>
        </div>
        <div className="form-outline mb-4">
          <label className="form-label">Số Điện Thoại</label>
          <input
            type="text"
            className="form-control"
            name="phoneNumber"
            placeholder='Phone Number'
            value={formik.values.phoneNumber}
            onChange={formik.handleChange('phoneNumber')}
            onBlur={formik.handleBlur('phoneNumber')}
          />
          <div className='error'>
            {
              formik.touched.phoneNumber && formik.errors.phoneNumber
            }
          </div>
        </div>
        <div className="form-outline mb-4">
          <label className="form-label">Địa Chỉ</label>
          <input
            type="text"
            className="form-control"
            name="address"
            placeholder='Address'
            value={formik.values.address}
            onChange={formik.handleChange('address')}
            onBlur={formik.handleBlur('address')}
          />
          <div className='error'>
            {
              formik.touched.address && formik.errors.address
            }
          </div>
        </div>
        <div className="form-outline mb-4">
          <label className="form-label">Email</label>
          <input
            type="email"
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
          <label className="form-label">Username</label>
          <input
            type="text"
            className="form-control"
            name="userName"
            placeholder='UserName'
            value={formik.values.userName}
            onChange={formik.handleChange('userName')}
            onBlur={formik.handleBlur('userName')}
          />
          <div className='error'>
            {
              formik.touched.userName && formik.errors.userName
            }
          </div>
        </div>
        <button type="submit" className="btn btn-primary btn-block mb-4 background-primary text-dark">Lưu Thông Tin</button>
      </form>
    </div>
    </>
  )
}

export default Thongtindiachi
