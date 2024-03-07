import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import CustomModal from '../components/CustomModal';
import { AiFillDelete } from 'react-icons/ai';
import { BiEdit } from 'react-icons/bi';
import { DeletePhone, GetPhones, resetState } from '../features/phone/phoneSlice';

const columns = [
    {
        title: 'Id',
        dataIndex: 'id',
        sorter: (a, b) => a.id - b.id,
    },
    {
        title: 'Name',
        dataIndex: 'name',
        sorter: (a, b) => a.name.length - b.name.length,
    },
    {
        title: 'SoLuong',
        dataIndex: 'soLuong',
        sorter: (a, b) => a.soLuong - b.soLuong,
    },
    {
        title: 'Brand',
        dataIndex: 'brand',
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

const PhoneList = () => {
    const [open, setOpen] = useState(false);
    const [phoneId, setPhoneId] = useState("");
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(resetState())
        dispatch(GetPhones())
      },[]);
      const hideModal = () => {
        setOpen(false);
      };
    const phoneState = useSelector(state => state?.phone?.phones)
    const data1 = [];
    for (let i = 0; i < phoneState?.length; i++) {
        data1.push({
            id: phoneState[i]?.id,
            name: phoneState[i]?.name,
            soLuong: phoneState[i]?.soLuong,
            brand: phoneState[i]?.brand?.title,
            status: phoneState[i]?.status? "Hoạt động" : "Không hoạt động",
            action: (<>
                <Link className='fs-3 text-danger' to={`/admin/add-phone/${phoneState[i]?.id}`}><BiEdit /></Link>
                <button className='fs-3 text-danger ms-3 text-danger bg-transparent border-0'
                    onClick={() => showModal(phoneState[i]?.id)}><AiFillDelete /></button>
            </>)
        });
    }
    const showModal = (e) => {
        setOpen(true);
        setPhoneId(e)
      };
    const deletePhone = (e) =>{
        dispatch(DeletePhone(e))
        setOpen(false);
        setTimeout(()=>{
          dispatch(GetPhones())
        },300)
      }
    return (
        <div>
            <h3>Phone List</h3>
            <div>
                <div><Table columns={columns} dataSource={data1} scroll={{ y: 500 }} /></div>
            </div>
            <CustomModal
                title="Are you sure you want to delete this brand?"
                hideModal={hideModal}
                open={open}
                performAction={() => { deletePhone(phoneId) }}
            />
        </div>
    )
}

export default PhoneList