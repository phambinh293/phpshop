import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { DeleteRating, GetRatings, resetState } from '../features/rating/ratingSlice';
import CustomModal from '../components/CustomModal';
import { AiFillDelete } from 'react-icons/ai';

const columns = [
    {
        title: 'Id',
        dataIndex: 'id',
    },
    {
        title: 'UserId',
        dataIndex: 'userId',
    },
    {
        title: 'ProductId',
        dataIndex: 'productId',
    },
    {
        title: 'Comment',
        dataIndex: 'comment',
    },
    {
        title: 'Star',
        dataIndex: 'star',
    },
    {
        title: 'NgayDang',
        dataIndex: 'ngayDang',
    },
];

const Rating = () => {
    const [open, setOpen] = useState(false);
    const [ratingId, setRatingId] = useState("");
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(resetState())
        dispatch(GetRatings())
      },[]);
      const hideModal = () => {
        setOpen(false);
      };
    const ratingState = useSelector(state => state?.rating?.ratings)
    const data1 = [];
    for (let i = 0; i < ratingState?.length; i++) {
        data1.push({
        id: ratingState[i].id,
        userId: ratingState[i].userId,
        productId: ratingState[i].productId,
        comment: ratingState[i].comment,
        star: ratingState[i].star,
        ngayDang: ratingState[i].ngayDang,
        action: (<>
            <button className='fs-3 text-danger ms-3 text-danger bg-transparent border-0' 
            onClick={()=>showModal(ratingState[i].id)}><AiFillDelete /></button>
          </>)
        });
    }
    const showModal = (e) => {
        setOpen(true);
        setRatingId(e)
      };
    const deleteRating = (e) =>{
        dispatch(DeleteRating(e))
        setOpen(false);
        setTimeout(()=>{
          dispatch(GetRatings())
        },300)
      }
    return (

        <div>
            <h3>Rating</h3>
            <div>
                <div><Table columns={columns} dataSource={data1} scroll={{ y: 500 }}/></div>
            </div>
            <CustomModal 
                title="Are you sure you want to delete this rating?" 
                hideModal={hideModal}
                open={open}
                performAction={()=>{deleteRating(ratingId)}}
            />
        </div>
    );
};

export default Rating;