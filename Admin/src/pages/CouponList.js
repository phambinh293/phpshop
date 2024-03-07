import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { DeleteCoupon, GetCoupons, resetState } from '../features/coupon/couponSlice';
import CustomModal from '../components/CustomModal';
import { AiFillDelete } from 'react-icons/ai';
import { BiEdit } from 'react-icons/bi';
import { Link } from 'react-router-dom';

const columns = [
    {
        title: 'Id',
        dataIndex: 'id',
    },
    {
        title: 'Title',
        dataIndex: 'title',
    },
    {
        title: 'Code',
        dataIndex: 'code',
    },
    {
        title: 'DiscountPercent',
        dataIndex: 'discountPercent',
    },
    {
        title: 'DiscountMoney',
        dataIndex: 'discountMoney',
    },
    {
        title: 'RequiredTotal',
        dataIndex: 'requiredTotal',
    },
    {
        title: 'StartDate',
        dataIndex: 'startDate',
    },
    {
        title: 'EndDate',
        dataIndex: 'endDate',
    },
    {
        title: 'Quantity',
        dataIndex: 'quantity',
    },
    {
        title: 'Status',
        dataIndex: 'status',
    },
    {
        title: 'Action',
        dataIndex: 'action',
    },
];

const CouponList = () => {
    const [open, setOpen] = useState(false);
    const [couponId, setcouponId] = useState("");
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(resetState())
        dispatch(GetCoupons())
      },[]);
    const hideModal = () => {
        setOpen(false);
      };
    const couponState = useSelector(state => state?.coupon?.coupons)
    const data1 = [];
    for (let i = 0; i < couponState?.length; i++) {
        data1.push({
        id: couponState[i].id,
        title: couponState[i].title,
        code: couponState[i].code,
        discountPercent: couponState[i].discountPercent,
        discountMoney: couponState[i].discountMoney,
        requiredTotal: couponState[i].requiredTotal,
        startDate: couponState[i].startDate,
        endDate: couponState[i].endDate,
        quantity: couponState[i].quantity,
        status: couponState[i].status?"Hoạt động":"Không hoạt động",
        action: (<>
            <Link className='fs-3 text-danger' to={`/admin/add-coupon/${couponState[i].id}`}><BiEdit /></Link>
            <button className='fs-3 text-danger ms-3 text-danger bg-transparent border-0' 
            onClick={()=>showModal(couponState[i].id)}><AiFillDelete /></button>
          </>)
        });
    }
    const showModal = (e) => {
        setOpen(true);
        setcouponId(e)
      };
    const deleteCoupon = (e) =>{
        dispatch(DeleteCoupon(e))
        setOpen(false);
        setTimeout(()=>{
          dispatch(GetCoupons())
        },300)
      }
    return (

        <div>
            <h3>Coupon List</h3>
            <div>
                <div><Table columns={columns} dataSource={data1} scroll={{ x: 1500, y: 500 }}/></div>
            </div>
            <CustomModal 
                title="Are you sure you want to delete this coupon?" 
                hideModal={hideModal}
                open={open}
                performAction={()=>{deleteCoupon(couponId)}}
            />
        </div>
    );
};

export default CouponList;