import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { DeleteComment, GetComments, resetState } from '../features/comment/commentSlice';
import CustomModal from '../components/CustomModal';
import { AiFillDelete } from 'react-icons/ai';
import { BiEdit } from 'react-icons/bi';
import { Link } from 'react-router-dom';

const columns = [
    {
        title: 'id',
        dataIndex: 'Id',
    },
    {
        title: 'Content',
        dataIndex: 'content',
    },
    {
        title: 'NgayDang',
        dataIndex: 'ngayDang',
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
        title: 'CommentId',
        dataIndex: 'commentId',
    },
    {
        title: 'ParentComment',
        dataIndex: 'parentComment',
    },
];

const Comment = () => {
    const [open, setOpen] = useState(false);
    const [commentId, setcommentId] = useState("");
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(resetState())
        dispatch(GetComments())
    }, []);
    const hideModal = () => {
        setOpen(false);
    };
    const commentState = useSelector(state => state?.comment?.comments)
    const data1 = [];
    for (let i = 0; i < commentState?.length; i++) {
        data1.push({
            id: commentState[i].id,
            content: commentState[i].content,
            ngayDang: commentState[i].ngayDang,
            userId: commentState[i].userId,
            productId: commentState[i].productId,
            commentId: commentState[i].commentId,
            parentComment: commentState[i].parentComment,
            action: (<>
                <Link className='fs-3 text-danger' to={`/admin/rep-comment/${commentState[i].id}`}><BiEdit /></Link>
                <button className='fs-3 text-danger ms-3 text-danger bg-transparent border-0'
                    onClick={() => showModal(commentState[i].id)}><AiFillDelete /></button>
            </>)
        });
    }
    const showModal = (e) => {
        setOpen(true);
        setcommentId(e)
    };
    const deleteComment = (e) => {
        dispatch(DeleteComment(e))
        setOpen(false);
        setTimeout(() => {
            dispatch(GetComments())
        }, 300)
    }
    return (

        <div>
            <h3>Comments</h3>
            <div>
                <div><Table columns={columns} dataSource={data1} scroll={{ x: 1500, y: 500 }} /></div>
            </div>
            <CustomModal
                title="Are you sure you want to delete this comment?"
                hideModal={hideModal}
                open={open}
                performAction={() => { deleteComment(commentId) }}
            />
        </div>
    );
};

export default Comment;