import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import formatNumber from '../../utils/formatNumber';
import formatDate from '../../utils/formatDate';
import { GetInvoicesByStatus, UpdateStatusInvoice } from '../../features/invoice/invoiceSlice';
import { Modal } from 'antd';

const HoaDonMoi = () => {
  const authState = useSelector(state => state?.auth?.user?.userDto);
  const invoiceState = useSelector(state => state?.invoice?.invoiceByStatus);
  const [open, setOpen] = useState(false);
  const [invoiceId, setInvoiceId] = useState();
  const hideModal = () => {
    setOpen(false);
  };
  const showModal = (e) => {
    setOpen(true);
    setInvoiceId(e)
  };
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(GetInvoicesByStatus({
      id: authState?.id,
      status: 'Hóa Đơn Mới'
    }))
  }, [dispatch, authState?.id])
  const UpdateStatus = (a)=>
    {
      dispatch(UpdateStatusInvoice({id:a, status:"Hủy Đơn"}))
      setOpen(false);
      setTimeout(()=>{
        dispatch(GetInvoicesByStatus({
          id: authState?.id,
          status: 'Hóa Đơn Mới'
        }))
      },300)
    }
  return (
    <div>
      {
        invoiceState && invoiceState?.map((item, index) => {
          return (
            <div key={index} className='bg-light shadow pt-4 pb-4 mb-3 bg-white rounded'>
              <div className='border p-3 w-100'>
                <div className='d-flex'>
                  <div className='d-inline-block'>
                    <span className='font-weight-bold'>Đơn hàng: {item?.id}</span>
                    <span className='ml-3'>Ngày đặt {formatDate(item?.issueDate)}</span>
                  </div>
                  <div className='ml-auto'>
                    <p className='text-danger'>{item?.orderStatus}</p>
                  </div>
                </div>
                <hr />
                <div className='d-flex'>
                  {
                    item && item?.invoiceDetails?.map((i, index) => {
                      return (
                        <div className='d-flex w-50' key={index}>
                          <img width='60px' height='60px' src={i?.product?.phone?.fileHinh} alt={i?.product?.phone?.name} />
                          <p className='w-75 ml-2'>
                            {i?.product?.phone?.name}
                            <br></br>
                            Màu {i?.product?.color?.colorName}
                            <span className='ml-2 text-danger amount'>Giá: {formatNumber(i?.product?.price)}</span>
                            <br></br>
                            Rom {i?.product?.capacity?.totalCapacity} GB
                          </p>
                        </div>
                      )
                    })
                  }
                </div>
                <div className='d-flex justify-content-between'>
                  <div className='mt-2'>
                    <Link to={`chi-tiet-don-hang/${item?.id}`} className='btn btn-light border border-warning text-warning btn-hover '>Xem chi tiết</Link>
                    <button onClick={(e)=>{showModal(item?.id)}} className='btn btn-danger mx-3'>Hủy Đơn</button>
                  </div>
                  <div className='ml-auto'>
                    <p className='text-danger amount'>Tổng tiền: <span className='h5'>{formatNumber(item?.totalPrice)}</span></p>
                  </div>
                </div>
              </div>
              <Modal
                title="Confirmation"
                open={open}
                onOk={()=>{UpdateStatus(invoiceId)}}
                onCancel={hideModal}
                okText="Ok"
                cancelText="Cancel"
              >
                <p>Bạn Muốn Hủy Đơn Hàng Này ???</p>
              </Modal>
            </div>
            
          )
        })
      }


    </div>
  )
}

export default HoaDonMoi