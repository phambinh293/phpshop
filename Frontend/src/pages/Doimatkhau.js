import React from 'react'
import { Helmet } from 'react-helmet'
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { ChangePassword } from '../features/users/userSlice';

const changePasswordSchema = yup.object({
    currentPassword: yup.string().required("CurrentPassword is Required")
        .min(6, 'Password must be at least 6 characters')
        .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character')
        .matches(/[0-9]/, 'Password must contain at least one digit'),
    newPassword: yup.string().required("NewPassword is Required")
        .min(6, 'Password must be at least 6 characters')
        .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character')
        .matches(/[0-9]/, 'Password must contain at least one digit')
});

const Doimatkhau = () => {
    const authState = useSelector(state => state?.auth?.user?.userDto)
    const dispatch = useDispatch()
    const formik = useFormik({
        initialValues: {
            currentPassword: '',
            newPassword: '',
        },
        validationSchema: changePasswordSchema,
        onSubmit: values => {
            const userData = { id: authState?.id, changePasswordModel: values }
            dispatch(ChangePassword(userData));
        },
    });
    return (
        <>
            <Helmet>
                <title>Đổi mật khẩu | PHBshop</title>
            </Helmet>
            <div className='bg-light shadow mb-3 bg-white rounded w-100 d-flex justify-content-center p-4'>
                <form onSubmit={formik.handleSubmit} className='w-75'>
                    <div className="form-group">
                        <label>Current Password</label>
                        <input
                            type="password"
                            name="currentPassword"
                            className="form-control"
                            placeholder="Current Password"
                            value={formik.values.currentPassword}
                            onChange={formik.handleChange('currentPassword')}
                            onBlur={formik.handleBlur('currentPassword')}
                        />
                        <div className='error'>
                            {
                                formik.touched.currentPassword && formik.errors.currentPassword
                            }
                        </div>
                    </div>
                    <div className="form-group">
                        <label>New Password</label>
                        <input
                            type="password"
                            name="newPassword"
                            className="form-control"
                            placeholder="New Password"
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
                    <div>
                        <button type="submit" className="btn btn-primary">Luu</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Doimatkhau
