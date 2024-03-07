import React, { useEffect, useState } from 'react';
import { Checkbox } from 'antd';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { CreatePhone, resetState, GetAPhone, UpdatePhone } from '../features/phone/phoneSlice';
import { GetProductTypes } from '../features/productType/productTypeSlice';
import { GetBrandsShow } from '../features/brand/brandSlice';
import { GetProductTypeByPhoneId } from '../features/productTypeDetail/productTypeDetailSlice';
import { DeleteImg, UploadImg, resetUploadState } from '../features/uploadImage/uploadSlice';
import Dropzone from 'react-dropzone';

const phoneSchema = yup.object({
    name: yup.string().required('Name is Required'),
    desc: yup.string(),
    loaiMan: yup.string(),
    kichThuoc: yup.string(),
    doPhanGiai: yup.string(),
    cpu: yup.string(),
    ram: yup.string(),
    rom: yup.string(),
    cameraTruoc: yup.string(),
    cameraSau: yup.string(),
    pin: yup.string(),
    status: yup.bool(),
    brandId: yup.number().required('Brand is Required'),
    productTypeIds: yup.array().min(1, 'Please select at least one product type detail'),
});

const AddPhone = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const getPhoneId = location.pathname.split("/")[3];
    const phoneState = useSelector(state => state?.phone?.APhone)
    const productTypeDetailState = useSelector(state => state?.productTypeDetail?.productTypesDetails)
    const uploadState = useSelector(state => state?.upload?.images)
    const [showImage, setShowImage] = useState(true);

    useEffect(() => {
        dispatch(GetProductTypes())
        dispatch(GetBrandsShow())
    }, [])
    
    useEffect(() => {
        if (getPhoneId !== undefined) {
            dispatch(GetProductTypeByPhoneId(getPhoneId))
            dispatch(GetAPhone(getPhoneId))
        } else {
            dispatch(resetState())
        }
    }, [getPhoneId])

    useEffect(() => {
        if (uploadState && uploadState.publicId) {
            formik.setFieldValue('hinhPublicId', uploadState?.publicId);
            formik.setFieldValue('fileHinh', uploadState?.url);
        }
    }, [uploadState])

    const handleChange = (event) => {
        const { value } = event.target;

        if (!isNaN(value)) {
            formik.setFieldValue('brandId', Number(value));
        }
    };


    const productTypeIdsBanDau = []
    productTypeDetailState && productTypeDetailState.forEach(item => {
        productTypeIdsBanDau.push(item.productTypeId)
    })

    useEffect(() => {
        formik.values.productTypeIds = productTypeIdsBanDau;
    }, []);

    const productTypeState = useSelector(state => state?.productType?.productTypes)
    const brandState = useSelector(state => state?.brand?.brandShow)
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            name: phoneState?.name || "",
            desc: phoneState?.desc || "",
            loaiMan: phoneState?.loaiMan || "",
            kichThuoc: phoneState?.kichThuoc || "",
            doPhanGiai: phoneState?.doPhanGiai || "",
            cpu: phoneState?.cpu || "",
            ram: phoneState?.ram || "",
            rom: phoneState?.rom || "",
            cameraTruoc: phoneState?.cameraTruoc || "",
            cameraSau: phoneState?.cameraSau || "",
            pin: phoneState?.pin || "",
            soLuong: phoneState?.soLuong || 0,
            status: phoneState?.status || false,
            brandId: phoneState?.brandId || "",
            hinhPublicId: phoneState?.hinhPublicId || "",
            fileHinh: phoneState?.fileHinh || "",
            productTypeIds: productTypeIdsBanDau,
        },
        validationSchema: phoneSchema,
        onSubmit: values => {
            if (getPhoneId !== undefined) {
                console.log(values);
                const data = { id: getPhoneId, phoneData: { ...values, id: getPhoneId } }
                dispatch(UpdatePhone(data))
                dispatch(resetState())
            } else {
                dispatch(CreatePhone(values));
                formik.resetForm();
                setTimeout(() => {
                    dispatch(resetState())
                    dispatch(resetUploadState())
                }, 300)
            }
        },
    });
    return (
        <div>
            <h3 className='mb-4'>{getPhoneId !== undefined ? "Edit" : "Add"} Phone</h3>
            <div>
                <form onSubmit={formik.handleSubmit}>
                    <div className='mb-3'>
                        <input
                            type="text"
                            name="name"
                            class="form-control"
                            placeholder="Name"
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
                    <div className='mb-3'>
                        <input
                            type="text"
                            name="desc"
                            class="form-control"
                            placeholder="Desc"
                            value={formik.values.desc}
                            onChange={formik.handleChange('desc')}
                            onBlur={formik.handleBlur('desc')}
                        />
                        <div className='error'>
                            {
                                formik.touched.desc && formik.errors.desc
                            }
                        </div>
                    </div>
                    <div className='mb-3'>
                        <input
                            type="text"
                            name="loaiMan"
                            class="form-control"
                            placeholder="Loại Màn Hình"
                            value={formik.values.loaiMan}
                            onChange={formik.handleChange('loaiMan')}
                            onBlur={formik.handleBlur('loaiMan')}
                        />
                        <div className='error'>
                            {
                                formik.touched.loaiMan && formik.errors.loaiMan
                            }
                        </div>
                    </div>
                    <div className='mb-3'>
                        <input
                            type="text"
                            name="kichThuoc"
                            class="form-control"
                            placeholder="Kích Thước"
                            value={formik.values.kichThuoc}
                            onChange={formik.handleChange('kichThuoc')}
                            onBlur={formik.handleBlur('kichThuoc')}
                        />
                        <div className='error'>
                            {
                                formik.touched.kichThuoc && formik.errors.kichThuoc
                            }
                        </div>
                    </div>
                    <div className='mb-3'>
                        <input
                            type="text"
                            name="doPhanGiai"
                            class="form-control"
                            placeholder="Độ Phân Giải"
                            value={formik.values.doPhanGiai}
                            onChange={formik.handleChange('doPhanGiai')}
                            onBlur={formik.handleBlur('doPhanGiai')}
                        />
                        <div className='error'>
                            {
                                formik.touched.doPhanGiai && formik.errors.doPhanGiai
                            }
                        </div>
                    </div>
                    <div className='mb-3'>
                        <input
                            type="text"
                            name="cpu"
                            class="form-control"
                            placeholder="CPU"
                            value={formik.values.cpu}
                            onChange={formik.handleChange('cpu')}
                            onBlur={formik.handleBlur('cpu')}
                        />
                        <div className='error'>
                            {
                                formik.touched.cpu && formik.errors.cpu
                            }
                        </div>
                    </div>
                    <div className='mb-3'>
                        <input
                            type="text"
                            name="ram"
                            class="form-control"
                            placeholder="RAM"
                            value={formik.values.ram}
                            onChange={formik.handleChange('ram')}
                            onBlur={formik.handleBlur('ram')}
                        />
                        <div className='error'>
                            {
                                formik.touched.ram && formik.errors.ram
                            }
                        </div>
                    </div>
                    <div className='mb-3'>
                        <input
                            type="text"
                            name="rom"
                            class="form-control"
                            placeholder="ROM"
                            value={formik.values.rom}
                            onChange={formik.handleChange('rom')}
                            onBlur={formik.handleBlur('rom')}
                        />
                        <div className='error'>
                            {
                                formik.touched.rom && formik.errors.rom
                            }
                        </div>
                    </div>
                    <div className='mb-3'>
                        <input
                            type="text"
                            name="cameraTruoc"
                            class="form-control"
                            placeholder="Camera Trước"
                            value={formik.values.cameraTruoc}
                            onChange={formik.handleChange('cameraTruoc')}
                            onBlur={formik.handleBlur('cameraTruoc')}
                        />
                        <div className='error'>
                            {
                                formik.touched.cameraTruoc && formik.errors.cameraTruoc
                            }
                        </div>
                    </div>
                    <div className='mb-3'>
                        <input
                            type="text"
                            name="cameraSau"
                            class="form-control"
                            placeholder="Camera Sau"
                            value={formik.values.cameraSau}
                            onChange={formik.handleChange('cameraSau')}
                            onBlur={formik.handleBlur('cameraSau')}
                        />
                        <div className='error'>
                            {
                                formik.touched.cameraSau && formik.errors.cameraSau
                            }
                        </div>
                    </div>
                    <div className='mb-3'>
                        <input
                            type="text"
                            name="pin"
                            class="form-control"
                            placeholder="Pin"
                            value={formik.values.pin}
                            onChange={formik.handleChange('pin')}
                            onBlur={formik.handleBlur('pin')}
                        />
                        <div className='error'>
                            {
                                formik.touched.pin && formik.errors.pin
                            }
                        </div>
                    </div>
                    <div className='mb-3'>
                        <select name="brandId"
                            type="number"
                            value={formik.values.brandId}
                            onChange={handleChange}
                            onBlur={formik.handleBlur('brandId')}
                            id='' className='form-control py-3 mb-3'>
                            <option value="">Select Brand</option>
                            {
                                brandState && brandState?.map((i, j) => {
                                    return <option key={j} value={i.id}>{i.title}</option>
                                })
                            }
                        </select>
                        <div className='error'>
                            {
                                formik.touched.brandId && formik.errors.brandId
                            }
                        </div>
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="productTypeIds">Product Type Details:</label>
                        <div role="group" aria-labelledby="checkbox-group">
                            {
                                productTypeState && productTypeState?.map((item, index) => {
                                    return (
                                        <Checkbox
                                            key={index}
                                            value={item.id}
                                            name="productTypeIds"
                                            checked={formik.values.productTypeIds.includes(item.id)}
                                            onChange={formik.handleChange('productTypeIds')}
                                            defaultChecked={formik.values.productTypeIds.includes(item.id)}
                                        >
                                            {item.title}
                                        </Checkbox>
                                    )
                                })
                            }
                        </div>
                        <div className='error'>
                            {
                                formik.touched.productTypeIds && formik.errors.productTypeIds
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
                            {(getPhoneId !== undefined && showImage === true) && (
                                <div className='position-relative'>
                                    <button type="button" onClick={() => {
                                        dispatch(DeleteImg(formik.values.hinhPublicId));
                                        setShowImage(false);
                                    }} className='btn-close position-absolute' style={{ top: "10px", right: "10px" }}></button>
                                    <img src={formik.values.fileHinh} alt="" width={200} height={200} />
                                </div>
                            )}
                        </div>
                    </div>
                    <button className='btn btn-success' type='submit'>{getPhoneId !== undefined ? "Edit" : "Add"} Phone</button>
                </form>
            </div>
        </div>
    );
};

export default AddPhone;