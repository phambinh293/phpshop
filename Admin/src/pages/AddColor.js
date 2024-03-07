import React, { useEffect } from 'react';
import { Checkbox } from 'antd';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { CreateColor, GetAColor, UpdateColor, resetState } from '../features/color/colorSlice';
import { useLocation, useNavigate } from 'react-router-dom';

const Colorschema = yup.object({
    colorName: yup.string().required('Color Name is Required'),
    status: yup.boolean()
});

const AddColor = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const getColorId = location.pathname.split("/")[3];
    const getColorState = useSelector(state => state?.color?.Acolor)
    useEffect(()=>{
        if(getColorId !== undefined){
          dispatch(GetAColor(getColorId))
        }else{
          dispatch(resetState())
        }
      },[getColorId])
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            colorName: getColorState?.colorName || "",
            status: getColorState?.status || false,
        },
        validationSchema: Colorschema,
        onSubmit: values => {
            if(getColorId !== undefined){
                const data = { id:getColorId, colorData: {...values, id: getColorId}}
                dispatch(UpdateColor(data))
                dispatch(resetState())
            }else{
                dispatch(CreateColor(values));
                formik.resetForm();
                setTimeout(() => {
                    dispatch(resetState())
                }, 300)
            }
        },
    });

    return (
        <div>
            <h3 className='mb-4'>{getColorId!==undefined?"Edit":"Add"} Color</h3>
            <div>
                <form onSubmit={formik.handleSubmit}>
                    <div className='mb-3'>
                        <input
                            type="text"
                            name="colorName"
                            class="form-control"
                            placeholder="ColorName"
                            value={formik.values.colorName}
                            onChange={formik.handleChange('colorName')}
                            onBlur={formik.handleBlur('colorName')}
                        />
                        <div className='error'>
                            {
                                formik.touched.colorName && formik.errors.colorName
                            }
                        </div>
                    </div>
                    <Checkbox 
                        checked={formik.values.status}
                        onChange={formik.handleChange('status')}
                    >
                        Status
                    </Checkbox><br />
                    <br />
                    <button className='btn btn-success' type='submit'>{getColorId!==undefined?"Edit":"Add"} Color</button>
                </form>
            </div>
        </div>
    );
};

export default AddColor;