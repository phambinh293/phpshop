import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { DeleteSlideShow, GetSlideShows, UpdateSlideShow, resetState } from '../features/slideshow/slideshowSlice';
import CustomModal from '../components/CustomModal';
import { AiFillDelete } from 'react-icons/ai';
import { BiEdit } from 'react-icons/bi';
import { act } from 'react-dom/test-utils';

const columns = [
    {
        title: 'Id',
        dataIndex: 'id',
    },
    {
        title: 'Hinh',
        dataIndex: 'hinh',
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

const SlideShows = () => {
    const [open, setOpen] = useState(false);
    const [slideshowId, setslideshowId] = useState("");
    const [open2, setOpen2] = useState(false);
    const [slideshowId2, setslideshowId2] = useState("");
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(resetState())
        dispatch(GetSlideShows())
      },[]);
      const hideModal = () => {
        setOpen(false);
      };
      const hideModal2 = () => {
        setOpen2(false);
      };
    const slideShowState = useSelector(state => state?.slideshow?.slideshows)
    const data1 = [];
    for (let i = 0; i < slideShowState?.length; i++) {
        data1.push({
        id: slideShowState[i].id,
        hinh: (<img className='img-fluid w-25' src={slideShowState[i].url} />),
        status: slideShowState[i].status?"Hoạt động":"Không hoạt động",
        action: (<>
            <button className='fs-3 text-info ms-3 text-danger bg-transparent border-0' 
            onClick={()=>showModal2(slideShowState[i].id)}><BiEdit /></button>
            <button className='fs-3 text-danger ms-3 text-danger bg-transparent border-0' 
            onClick={()=>showModal(slideShowState[i].id)}><AiFillDelete /></button>
          </>)
        });
    }
    const showModal2 = (e) => {
      setOpen2(true);
      setslideshowId2(e)
    };
  const activeSlideShow = (e) =>{
      dispatch(UpdateSlideShow(e))
      setOpen2(false);
      setTimeout(()=>{
        dispatch(GetSlideShows())
      },300)
    }
    const showModal = (e) => {
        setOpen(true);
        setslideshowId(e)
      };
    const deleteSlideShow = (e) =>{
        dispatch(DeleteSlideShow(e))
        setOpen(false);
        setTimeout(()=>{
          dispatch(GetSlideShows())
        },300)
      }
    return (

        <div>
            <h3>SlideShows</h3>
            <div>
                <div><Table columns={columns} dataSource={data1} scroll={{ y: 500 }}/></div>
            </div>
            <CustomModal 
                title="Are you sure you want to delete this slideshow?" 
                hideModal={hideModal}
                open={open}
                performAction={()=>{deleteSlideShow(slideshowId)}}
            />
            <CustomModal 
                title="Are you sure you want to active this slideshow?" 
                hideModal={hideModal2}
                open={open2}
                performAction={()=>{activeSlideShow(slideshowId2)}}
            />
        </div>
    );
};

export default SlideShows;