import React, { useEffect } from 'react';
import { Checkbox, Table } from 'antd';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { GetAInvoice } from '../features/invoice/invoiceSlice';

const columns2 = [
    {
        title: '#',
        dataIndex: 'id',
        sorter: (a, b) => a.id - b.id,
    },
    {
        title: 'ProductId',
        dataIndex: 'productId',
        sorter: (a, b) => a.productId - b.productId,
    },
    {
        title: 'Tên',
        dataIndex: 'name',
        sorter: (a, b) => a.name.length - b.name.length,
    },
    {
        title: 'Giá',
        dataIndex: 'price',
        sorter: (a, b) => a.price.length - b.price.length,
    },
    {
        title: 'Số lượng',
        dataIndex: 'quantity',
        sorter: (a, b) => a.quantity.length - b.quantity.length,
    },
    {
        title: 'Total Price',
        dataIndex: 'totalPrice',
    },
    {
        title: 'Bộ nhớ',
        dataIndex: 'capacity',
    },
    {
        title: 'Màu',
        dataIndex: 'colorName',
    },
    
];

const InvoiceDetails = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const getInvoiceId = location.pathname.split("/")[3];
    const invoiceState = useSelector(state => state?.invoice?.AInvoice)

    useEffect(() => {
        dispatch(GetAInvoice(getInvoiceId))
    }, [])

    const data1 = [];
    for (let i = 0; i < invoiceState?.invoiceDetails?.length; i++) {
        data1.push({
            id: invoiceState?.invoiceDetails[i]?.id,
            productId: invoiceState?.invoiceDetails[i]?.productId,
            name: invoiceState?.invoiceDetails[i]?.product?.phone?.name,
            price: invoiceState?.invoiceDetails[i]?.product?.price,
            quantity: invoiceState?.invoiceDetails[i]?.quantity,
            totalPrice: invoiceState?.invoiceDetails[i]?.totalPrice,
            capacity: invoiceState?.invoiceDetails[i]?.product?.capacity?.totalCapacity,
            colorName: invoiceState?.invoiceDetails[i]?.product?.color?.colorName,
        });
    }

    return (
        <>
            <div className='container'>
                <div className='row'>
                    <div className='col-6'>
                        <div className='bg-transparent shadow   mb-5 rounded' style={{ padding: '3rem ' }}>
                            <table className="table table-bordered product-info" >
                                <h4>Invoice Info</h4>
                                <tr >
                                    <td>ID:</td>
                                    <td>{invoiceState?.id}</td>
                                </tr>
                                <tr >
                                    <td>Tên Khách:</td>
                                    <td>{invoiceState?.user?.name}</td>
                                </tr>
                                <tr >
                                    <td>SĐT</td>
                                    <td>{invoiceState?.user?.phoneNumber}</td>
                                </tr>

                                <tr >
                                    <td>Địa chỉ giao:</td>
                                    <td>{invoiceState?.shippingInfo}</td>
                                </tr>
                                <tr >
                                    <td>Ngày Đặt:</td>
                                    <td>{invoiceState?.issueDate}</td>
                                </tr>
                                <tr >
                                    <td>Trạng Thái:</td>
                                    <td>{invoiceState?.orderStatus}</td>
                                </tr>
                            </table>
                        </div>
                    </div>
                    <div className='col-6'>
                        <div className='bg-transparent shadow   mb-5 rounded' style={{ padding: '3rem ' }}>
                            <table className="table table-bordered product-info" >
                                <h4>Invoice Info</h4>
                                <tr >
                                    <td>Total Price</td>
                                    <td>{invoiceState?.totalPrice}</td>
                                </tr>
                                <tr >
                                    <td>Total Price After Discount:</td>
                                    <td>{invoiceState?.totalPriceAfterDiscount}</td>
                                </tr>
                                <tr >
                                    <td>coupon</td>
                                    <td>{invoiceState?.coupon?.title}</td>
                                </tr>
                                <tr >
                                    <td>Discount Percent</td>
                                    <td>{invoiceState?.coupon?.discountPercent}</td>
                                </tr>
                                <tr >
                                    <td>Discount Money</td>
                                    <td>{invoiceState?.coupon?.discountMoney}</td>
                                </tr>
                                <tr >
                                    <td>Code</td>
                                    <td>{invoiceState?.coupon?.code}</td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <Table columns={columns2} dataSource={data1} />
            </div>
        </>
    )
}

export default InvoiceDetails