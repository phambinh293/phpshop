import React, { useEffect } from 'react';
import { Checkbox } from 'antd';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { CreateCapacity, GetCapacity, UpdateCapacity, resetState } from '../features/capacity/capacitySlice';

const capacitySchema = yup.object({
    totalCapacity: yup.number("Total Capacity must be number!!!").required('Total Capacity is Required!!!'),
    status: yup.boolean()
});

const AddCapacity = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const getCapacityId = location.pathname.split("/")[3];
    const capacityState = useSelector(state => state?.capacity?.ACapacity)
    useEffect(()=>{
        if(getCapacityId !== undefined){
          dispatch(GetCapacity(getCapacityId))
        }else{
          dispatch(resetState())
        }
      },[getCapacityId])
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            totalCapacity: capacityState?.totalCapacity || "",
            status: capacityState?.status || false,
        },
        validationSchema: capacitySchema,
        onSubmit: values => {
            if(getCapacityId !== undefined){
                const data = { id:getCapacityId, capacityData: {...values, id:getCapacityId }}
                dispatch(UpdateCapacity(data))
                dispatch(resetState())
            }else{
                dispatch(CreateCapacity(values));
                formik.resetForm();
                setTimeout(() => {
                    dispatch(resetState())
                }, 300)
            }
            
        },
    });
    return (
        <div>
            <h3 className='mb-4'>{getCapacityId!==undefined?"Edit":"Add"} Capacity</h3>
            <div>
                <form onSubmit={formik.handleSubmit}>
                    <div className='mb-3'>
                        <input
                            type="number"
                            name="totalCapacity"
                            className="form-control"
                            placeholder="Total Capacity"
                            value={formik.values.totalCapacity}
                            onChange={formik.handleChange('totalCapacity')}
                            onBlur={formik.handleBlur('totalCapacity')}
                        />
                        <div className='error'>
                            {
                                formik.touched.totalCapacity && formik.errors.totalCapacity
                            }
                        </div>
                    </div>
                    <Checkbox 
                        name="status"
                        checked={formik.values.status}
                        onChange={formik.handleChange('status')}
                    >
                        Status
                    </Checkbox><br />
                    <br />
                    <button className='btn btn-success' type='submit'>{getCapacityId!==undefined?"Edit":"Add"} Capacity</button>
                </form>
            </div>
        </div>
    );
};

export default AddCapacity;