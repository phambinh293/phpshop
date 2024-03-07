import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CreateInvoice } from '../features/invoice/invoiceSlice'
import { useFormik } from 'formik';
import * as yup from 'yup';
import { GetCart } from '../features/cart/cartSlice';

const invoiceSchema = yup.object({
    shippingInfo: yup.string().required('Address is Required'),
});

const ThanhToanThanhCong = () => {
    const dispatch = useDispatch()
    const userState = useSelector(state => state?.auth?.user?.userDto)
    const cartState = useSelector(state => state?.cart?.carts)
    const couponState = useSelector(state => state?.coupon?.ACoupon)
    const [sum, setSum] = useState();
    const [tongTien, setTongTien] = useState();

    const formik = useFormik({
        initialValues: {
            userId: userState?.id || "",
            shippingInfo: userState?.address || "",
            issueDate: new Date().toISOString().substr(0, 10),
            totalPrice: sum || 0,
            totalPriceAfterDiscount: tongTien || 0,
            couponId: null,
            paid: true,
            orderStatus: "Hóa Đơn Mới",
            invoiceDetails: []
        },
        validationSchema: invoiceSchema,
        onSubmit: values => {
            if(values.invoiceDetails.length >0){
                console.log(values);
                dispatch(CreateInvoice(values))
            }else{
                console.log("Chuwa dc");
            }
        },
    });
    useEffect(() => {
        dispatch(GetCart(userState?.id))
    }, [])
    useEffect(() => {
        let dem = 0
        let dem2 = 0
        for (let i = 0; i < cartState.length; i++) {
            dem += cartState[i]?.quantity * cartState[i]?.product?.price;
            dem2 += cartState[i]?.quantity
        }
        setSum(dem)
        setTongTien(dem)
        formik.setFieldValue("totalPrice", dem);
        formik.setFieldValue("totalPriceAfterDiscount", dem);
    }, [cartState])

    useEffect(() => {
        if (cartState) {
            const updatedInvoiceDetails = cartState.map(item => {
                return {
                    productId: item?.productId,
                    quantity: item?.quantity,
                    totalPrice: item?.quantity * item?.product?.price,
                };
            });
            formik.setFieldValue("invoiceDetails", updatedInvoiceDetails);
        }
    }, [cartState])

    useEffect(()=>{
        if (cartState) {
            setTimeout(()=>{
                formik.submitForm();
            }, 300)
        }
    },[])

  return (
    <h1 className='text-success'>Thanh Toán Thành Công</h1>
  )
}

export default ThanhToanThanhCong