import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { DeleteProduct, GetAllProducts, resetState } from '../features/product/productSlice';
import { Link } from 'react-router-dom';
import CustomModal from '../components/CustomModal';
import { AiFillDelete } from 'react-icons/ai';
import { BiEdit } from 'react-icons/bi';

const columns2 = [
    {
        title: '#',
        dataIndex: 'id',
        sorter: (a, b) => a.id - b.id,
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
        title: 'Bộ nhớ',
        dataIndex: 'rom',
    },
    {
        title: 'Màu',
        dataIndex: 'colorName',
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

const ProductList = () => {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [productId, setProductId] = useState("");
    useEffect(()=>{
        dispatch(resetState())
        dispatch(GetAllProducts())
      },[]);
      const hideModal = () => {
        setOpen(false);
      };
    const productState = useSelector((state) => state?.product?.products);

    const data1 = [];
    for (let i = 0; i < productState?.length; i++) {
        data1.push({
            id: productState[i]?.id,
            name: productState[i]?.phone?.name,
            price: productState[i]?.price,
            quantity: productState[i]?.quantity,
            rom: productState[i]?.phone?.rom,
            colorName: productState[i]?.color?.colorName,
            status: productState[i]?.status?"Hoạt động":"Không hoạt động",
            action: (<>
                <Link to={`/admin/add-product/${productState[i].id}`} className='btn btn-primary m-1'>
                <BiEdit />
                </Link>
                <button className='fs-3 text-danger ms-3 text-danger bg-transparent border-0'
                    onClick={() => showModal(productState[i]?.id)}><AiFillDelete /></button>
            </>)
        });
    }

    const showModal = (e) => {
        setOpen(true);
        setProductId(e)
      };
    const deleteProduct = (e) =>{
        dispatch(DeleteProduct(e))
        setOpen(false);
        setTimeout(()=>{
          dispatch(GetAllProducts())
        },300)
      }

    return (
        <div>
            <h3>Danh sách sản phẩm</h3>
            <div>
                <Table columns={columns2} dataSource={data1} />
            </div>
            <CustomModal
                title="Are you sure you want to delete this product?"
                hideModal={hideModal}
                open={open}
                performAction={() => { deleteProduct(productId) }}
            />
        </div>
        
    );
};

export default ProductList;