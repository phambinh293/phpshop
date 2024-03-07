import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import CustomModal from '../components/CustomModal';
import { AiFillDelete } from 'react-icons/ai';
import { BiEdit } from 'react-icons/bi';
import { DeleteCapacity, GetCapacities, resetState } from '../features/capacity/capacitySlice';

const columns = [
    {
        title: 'Id',
        dataIndex: 'id',
    },
    {
        title: 'TotalCapacity',
        dataIndex: 'totalCapacity',
        sorter: (a, b) => a.totalCapacity - b.totalCapacity,
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

const CapacityList = () => {
    const [open, setOpen] = useState(false);
    const [capacityId, setCapacityId] = useState("");
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(resetState())
        dispatch(GetCapacities())
      },[]);
      const hideModal = () => {
        setOpen(false);
      };
    const capacityState = useSelector(state => state?.capacity?.capacities)
    const data1 = [];
    for (let i = 0; i < capacityState?.length; i++) {
        data1.push({
        id: capacityState[i].id,
        totalCapacity: capacityState[i].totalCapacity,
        status: capacityState[i].status?"Hoạt động":"Không hoạt động",
        action: (<>
            <Link className='fs-3 text-danger' to={`/admin/add-capacity/${capacityState[i].id}`}><BiEdit /></Link>
            <button className='fs-3 text-danger ms-3 text-danger bg-transparent border-0' 
            onClick={()=>showModal(capacityState[i].id)}><AiFillDelete /></button>
          </>)
        });
    }
    const showModal = (e) => {
        setOpen(true);
        setCapacityId(e)
      };
    const deleteCapacity = (e) =>{
        dispatch(DeleteCapacity(e))
        setOpen(false);
        setTimeout(()=>{
          dispatch(GetCapacities())
        },300)
      }
    return (

        <div>
            <h3>Capacity List</h3>
            <div>
                <div><Table columns={columns} dataSource={data1} scroll={{ y: 500 }}/></div>
            </div>
            <CustomModal 
                title="Are you sure you want to delete this capacity?" 
                hideModal={hideModal}
                open={open}
                performAction={()=>{deleteCapacity(capacityId)}}
            />
        </div>
    );
};

export default CapacityList