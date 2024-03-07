import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { DeleteProductType, GetProductTypes, resetState } from '../features/productType/productTypeSlice';
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

const ProductTypeList = () => {
    const [open, setOpen] = useState(false);
    const [productTypeId, setProductTypeId] = useState("");
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(resetState())
        dispatch(GetProductTypes())
      },[]);
      const hideModal = () => {
        setOpen(false);
      };
    const productTypeState = useSelector(state => state?.productType?.productTypes)
    const data1 = [];
    for (let i = 0; i < productTypeState?.length; i++) {
        data1.push({
        id: productTypeState[i].id,
        title: productTypeState[i].title,
        status: productTypeState[i].status?"Hoạt động":"Không hoạt động",
        action: (<>
            <Link className='fs-3 text-danger' to={`/admin/add-product-type/${productTypeState[i].id}`}><BiEdit /></Link>
            <button className='fs-3 text-danger ms-3 text-danger bg-transparent border-0' 
            onClick={()=>showModal(productTypeState[i].id)}><AiFillDelete /></button>
          </>)
        });
    }
    const showModal = (e) => {
        setOpen(true);
        setProductTypeId(e)
      };
    const deleteProductType = (e) =>{
        dispatch(DeleteProductType(e))
        setOpen(false);
        setTimeout(()=>{
          dispatch(GetProductTypes())
        },300)
      }
    return (

        <div>
            <h3>Product Type List</h3>
            <div>
                <div><Table columns={columns} dataSource={data1} scroll={{y: 500}} /></div>
            </div>
            <CustomModal 
                title="Are you sure you want to delete this color?" 
                hideModal={hideModal}
                open={open}
                performAction={()=>{deleteProductType(productTypeId)}}
            />
        </div>
    );
};

export default ProductTypeList;