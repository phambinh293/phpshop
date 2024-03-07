import React, { useEffect } from 'react';
import { Checkbox } from 'antd';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { CreateProductType, GetAProductType, UpdateProductType, resetState } from '../features/productType/productTypeSlice';

const productTypeSchema = yup.object({
    title: yup.string().required('Title is Required'),
    status: yup.boolean()
});

const AddProductType = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const getProductTypeId = location.pathname.split("/")[3];
    const productTypeState = useSelector(state => state?.productType?.AProductType)
    useEffect(()=>{
        if(getProductTypeId !== undefined){
          dispatch(GetAProductType(getProductTypeId))
        }else{
          dispatch(resetState())
        }
      },[getProductTypeId])
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            title: productTypeState?.title || "",
            status: productTypeState?.status || false,
        },
        validationSchema: productTypeSchema,
        onSubmit: values => {
            if(getProductTypeId !== undefined){
                const data = { id:getProductTypeId, productTypeData: {...values, id:getProductTypeId }}
                dispatch(UpdateProductType(data))
                dispatch(resetState())
            }else{
                dispatch(CreateProductType(values));
                formik.resetForm();
                setTimeout(() => {
                    dispatch(resetState())
                }, 300)
            }
        },
    });
    return (
        <div>
            <h3 className='mb-4'>{getProductTypeId!==undefined?"Edit":"Add"} Product Type</h3>
            <div>
            <form onSubmit={formik.handleSubmit}>
                    <div className='mb-3'>
                        <input
                            type="text"
                            name="title"
                            class="form-control"
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
                    <button className='btn btn-success' type='submit'>{getProductTypeId!==undefined?"Edit":"Add"} Product Type</button>
                </form>
            </div>
        </div>
    );
};

export default AddProductType;