import React, { useEffect } from 'react';
import { Checkbox } from 'antd';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { CreateBrand, GetABrand, UpdateBrand, resetState } from '../features/brand/brandSlice';

const brandSchema = yup.object({
    title: yup.string().required('Title is Required'),
    status: yup.boolean()
});

const AddBrand = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const getBrandId = location.pathname.split("/")[3];
    const brandState = useSelector(state => state?.brand?.ABrand)
    useEffect(()=>{
        if(getBrandId !== undefined){
          dispatch(GetABrand(getBrandId))
        }else{
          dispatch(resetState())
        }
      },[getBrandId])
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            title: brandState?.title || "",
            status: brandState?.status || false,
            hinhPublicId: "",
            fileHinh: "",
        },
        validationSchema: brandSchema,
        onSubmit: values => {
            if(getBrandId !== undefined){
                const data = { id:getBrandId, brandData: {...values, id:getBrandId }}
                dispatch(UpdateBrand(data))
                dispatch(resetState())
            }else{
                dispatch(CreateBrand(values));
                formik.resetForm();
                setTimeout(() => {
                    dispatch(resetState())
                }, 300)
            }
        },
    });
    return (
        <div>
            <h3 className='mb-4'>{getBrandId!==undefined?"Edit":"Add"} Brand</h3>
            <div>
                <form onSubmit={formik.handleSubmit}>
                    <div className='mb-3'>
                        <input
                            type="text"
                            name="title"
                            className="form-control"
                            placeholder="Title"
                            value={formik.values.title}
                            onChange={formik.handleChange('title')}
                            onBlur={formik.handleBlur('title')}
                        />
                        <div className='error'>
                            {
                                formik.touched.title && formik.errors.title
                            }
                        </div>
                    </div>
                    <Checkbox 
                        name="status"
                        checked={formik.values.status}
                        onChange={formik.handleChange('status')}
                        defaultChecked={formik.values.status}
                    >
                        Status
                    </Checkbox><br />
                    <br />
                    <button className='btn btn-success' type='submit'>{getBrandId!==undefined?"Edit":"Add"} Brand</button>
                </form>
            </div>
        </div>
    );
};

export default AddBrand;