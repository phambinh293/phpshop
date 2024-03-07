import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { DeleteColor, GetColors, resetState } from '../features/color/colorSlice';
import CustomModal from '../components/CustomModal';
import {AiFillDelete} from 'react-icons/ai'
import {BiEdit} from 'react-icons/bi'
import { Link } from 'react-router-dom';

const columns = [
    {
        title: 'Id',
        dataIndex: 'id',
    },
    {
        title: 'ColorName',
        dataIndex: 'colorName',
        sorter: (a, b) => a.colorName.length - b.colorName.length,
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

const ColorList = () => {
    const [open, setOpen] = useState(false);
    const [colorId, setColorId] = useState("");
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(resetState())
        dispatch(GetColors())
      },[]);
    const hideModal = () => {
        setOpen(false);
      };
    const colorState = useSelector(state => state?.color?.colors)
    const data1 = [];
    for (let i = 0; i < colorState?.length; i++) {
        data1.push({
        id: colorState[i].id,
        colorName: colorState[i].colorName,
        status: colorState[i].status?"hoạt động":"không hoạt động",
        action: (<>
            <Link className='fs-3 text-danger' to={`/admin/add-color/${colorState[i].id}`}><BiEdit /></Link>
            <button className='fs-3 text-danger ms-3 text-danger bg-transparent border-0' 
            onClick={()=>showModal(colorState[i].id)}><AiFillDelete /></button>
          </>)
        });
    }
    const showModal = (e) => {
        setOpen(true);
        setColorId(e)
      };
    const deleteColor = (e) =>{
        dispatch(DeleteColor(e))
        setOpen(false);
        setTimeout(()=>{
          dispatch(GetColors())
        },300)
      }
    return (

        <div>
            <h3>Color List</h3>
            <div>
                <div><Table columns={columns} dataSource={data1} scroll={{ y: 500 }}/></div>
            </div>
            <CustomModal 
                title="Are you sure you want to delete this color?" 
                hideModal={hideModal}
                open={open}
                performAction={()=>{deleteColor(colorId)}}
            />
        </div>
    );
};

export default ColorList;