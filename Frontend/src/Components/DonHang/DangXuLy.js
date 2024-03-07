import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import formatNumber from '../../utils/formatNumber';
import formatDate from '../../utils/formatDate';
import {  GetInvoicesByStatus } from '../../features/invoice/invoiceSlice';

const DangXyLy = () => {
  const authState = useSelector(state => state?.auth?.user?.userDto);
  const invoiceState = useSelector(state => state?.invoice?.invoiceByStatus);
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(GetInvoicesByStatus({
      id: authState?.id,
      status: 'Đang Xử Lý'
    })
    )
  }, [dispatch, authState?.id])
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
                  </div>
                  <div className='ml-auto'>
                    <p className='text-danger amount'>Tổng tiền: <span className='h5'>{formatNumber(item?.totalPrice)}</span></p>
                  </div>
                </div>
              </div>
            </div>
          )
        })
      }


    </div>
  )
}

export default DangXyLy
