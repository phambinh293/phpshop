import React, { useEffect, useState } from 'react';
import { Checkbox } from 'antd';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { DeleteImg, UploadImg, resetUploadState } from '../features/uploadImage/uploadSlice';
import Dropzone from 'react-dropzone';
import { CreateSlideShow, resetState } from '../features/slideshow/slideshowSlice';

const slideShowSchema = yup.object({
    publicId: yup.string(),
    url: yup.string(),
    status: yup.bool()
});


const AddSlideShow = () => {
    const dispatch = useDispatch();
    const uploadState = useSelector(state => state?.upload?.images)

    useEffect(() => {
        if (uploadState && uploadState.publicId) {
            formik.setFieldValue('publicId', uploadState?.publicId);
            formik.setFieldValue('url', uploadState?.url);
        }
    }, [uploadState])

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            publicId: "",
            url: "",
            status: false
        },
        validationSchema: slideShowSchema,
        onSubmit: values => {
            console.log(values);
            dispatch(CreateSlideShow(values));
            formik.resetForm();
            setTimeout(() => {
                dispatch(resetState())
                dispatch(resetUploadState())
            }, 300)
        },
    });
    return (
        <div>
            <h3 className='mb-4'> SlideShow</h3>
            <div>
                <form onSubmit={formik.handleSubmit}>
                    <Checkbox
                        name="status"
                        checked={formik.values.status}
                        onChange={formik.handleChange('status')}
                        defaultChecked={formik.values.status}
                    >
                        Status
                    </Checkbox><br />
                    <br />
                    <div className='bg-white border-1 p-5 text-center'>
                        <Dropzone onDrop={acceptedFiles => dispatch(UploadImg(acceptedFiles))}>
                            {({ getRootProps, getInputProps }) => (
                                <section>
                                    <div {...getRootProps()}>
                                        <input {...getInputProps()} />
                                        <p>Drag 'n' drop some files here, or click to select files</p>
                                    </div>
                                </section>
                            )}
                        </Dropzone>
                        <div className='showImages d-flex flex-wrap gap-3'>
                            {(uploadState && uploadState.publicId) && (
                                <div className='position-relative'>
                                    <button type="button" onClick={() => dispatch(DeleteImg(uploadState.publicId))} className='btn-close position-absolute' style={{ top: "10px", right: "10px" }}></button>
                                    <img src={uploadState.url} alt="" width={200} height={200} />
                                </div>
                            )}
                            {/* {(getPhoneId !== undefined && showImage === true) && (
                                <div className='position-relative'>
                                    <button type="button" onClick={() => {
                                        dispatch(DeleteImg(formik.values.hinhPublicId));
                                        setShowImage(false);
                                    }} className='btn-close position-absolute' style={{ top: "10px", right: "10px" }}></button>
                                    <img src={formik.values.fileHinh} alt="" width={200} height={200} />
                                </div>
                            )} */}
                        </div>
                    </div>
                    <button className='btn btn-success mt-3' type='submit'>Add SlideShow</button>
                </form>
            </div>
        </div>
    )
}

export default AddSlideShow