import React, { useState } from 'react'
import AllOrders from '../Components/DonHang/AllOrders';
import { Helmet } from 'react-helmet';
import DangXyLy from '../Components/DonHang/DangXuLy';
import DangGiao from '../Components/DonHang/DangGiao';
import HoanThanh from '../Components/DonHang/HoanThanh';
import HoaDonMoi from '../Components/DonHang/HoaDonMoi';
import HuyDon from '../Components/DonHang/HuyDon';



const DonHang = () => {
  const [selectedTab, setSelectedTab] = useState('Tất cả');

  const handleTabClick = (tabName) => {
    setSelectedTab(tabName);
  };

  const renderForm = () => {
    switch (selectedTab) {
      case 'Tất cả':
        return <AllOrders />;
      case 'Hóa Đơn Mới':
        return <HoaDonMoi />;
      case 'Đang Xử Lý':
        return <DangXyLy />;
      case 'Đang giao':
        return <DangGiao />;
      case 'Hoàn Thành':
        return <HoanThanh />;
      case 'Đã hủy':
        return <HuyDon />;
      default:
        return null;
    }
  };

  return (
    <>
      <Helmet>
        <title>Lịch sử mua hang | PHBshop</title>
      </Helmet>
      <div>
        <div className="bg-light shadow mb-3 bg-white rounded d-flex">
          <div className={`pt-3 pb-3 w-25 ${selectedTab === 'Tất cả' ? 'border-bottom border-danger' : 'border-bottom'}`} style={{ cursor: 'pointer' }}>
            <p className={`m-auto text-center ${selectedTab === 'Tất cả' ? 'text-danger' : ''}`} onClick={() => handleTabClick('Tất cả')}>Tất cả</p>
          </div>
          <div className={`pt-3 pb-3 w-25 ml-2 ${selectedTab === 'Hóa Đơn Mới' ? 'border-bottom border-danger' : 'border-bottom'}`} style={{ cursor: 'pointer' }}>
            <p className={`m-auto text-center ${selectedTab === 'Hóa Đơn Mới' ? 'text-danger' : ''}`} onClick={() => handleTabClick('Hóa Đơn Mới')}>Hóa đơn mới</p>
          </div>
          <div className={`pt-3 pb-3 w-25 ml-2 ${selectedTab === 'Đang Xử Lý' ? 'border-bottom border-danger' : 'border-bottom'}`} style={{ cursor: 'pointer' }}>
            <p className={`m-auto text-center ${selectedTab === 'Đang Xử Lý' ? 'text-danger' : ''}`} onClick={() => handleTabClick('Đang Xử Lý')}>Đang xử lý</p>
          </div>
          <div className={`pt-3 pb-3 w-25 ml-2 ${selectedTab === 'Đang giao' ? 'border-bottom border-danger' : 'border-bottom'}`} style={{ cursor: 'pointer' }}>
            <p className={`m-auto text-center ${selectedTab === 'Đang giao' ? 'text-danger' : ''}`} onClick={() => handleTabClick('Đang giao')}>Đang giao</p>
          </div>
          <div className={`pt-3 pb-3 w-25 ml-2 ${selectedTab === 'Hoàn Thành' ? 'border-bottom border-danger' : 'border-bottom'}`} style={{ cursor: 'pointer' }}>
            <p className={`m-auto text-center ${selectedTab === 'Hoàn Thành' ? 'text-danger' : ''}`} onClick={() => handleTabClick('Hoàn Thành')}>Hoàn thành</p>
          </div>
          <div className={`pt-3 pb-3 w-25 ml-2 ${selectedTab === 'Đã hủy' ? 'border-bottom border-danger' : 'border-bottom'}`} style={{ cursor: 'pointer' }}>
            <p className={`m-auto text-center ${selectedTab === 'Đã hủy' ? 'text-danger' : ''}`} onClick={() => handleTabClick('Đã hủy')}>Đã hủy</p>
          </div>
        </div>
        <div>
          {renderForm()}
        </div>
      </div>
    </>
  );
};


export default DonHang
