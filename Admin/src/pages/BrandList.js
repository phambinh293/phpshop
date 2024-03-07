import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { DeleteBrand, GetBrands, resetState } from '../features/brand/brandSlice';
import { Link } from "react-router-dom";
import CustomModal from '../components/CustomModal';
import { AiFillDelete } from 'react-icons/ai';
import { BiEdit } from 'react-icons/bi';

const columns = [
    {
        title: 'Id',
        dataIndex: 'id',
    },
    {
        title: 'Title',
        dataIndex: 'title',
        sorter: (a, b) => a.title.length - b.title.length,
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

const BrandList = () => {
    const [open, setOpen] = useState(false);
    const [brandId, setBrandId] = useState("");
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(resetState())
        dispatch(GetBrands())
      },[]);
      const hideModal = () => {
        setOpen(false);
      };
    const brandState = useSelector(state => state?.brand?.brands)
    const data1 = [];
    for (let i = 0; i < brandState?.length; i++) {
        data1.push({
        id: brandState[i].id,
        title: brandState[i].title,
        status: brandState[i].status?"Hoạt động":"Không hoạt động",
        action: (<>
            <Link className='fs-3 text-danger' to={`/admin/add-brand/${brandState[i].id}`}><BiEdit /></Link>
            <button className='fs-3 text-danger ms-3 text-danger bg-transparent border-0' 
            onClick={()=>showModal(brandState[i].id)}><AiFillDelete /></button>
          </>)
        });
    }
    const showModal = (e) => {
        setOpen(true);
        setBrandId(e)
      };
    const deleteBrand = (e) =>{
        dispatch(DeleteBrand(e))
        setOpen(false);
        setTimeout(()=>{
          dispatch(GetBrands())
        },300)
      }
    return (

        <div>
            <h3>Brand List</h3>
            <div>
                <div><Table columns={columns} dataSource={data1} scroll={{ y: 500 }}/></div>
            </div>
            <CustomModal 
                title="Are you sure you want to delete this brand?" 
                hideModal={hideModal}
                open={open}
                performAction={()=>{deleteBrand(brandId)}}
            />
        </div>
    );
};

export default BrandList;