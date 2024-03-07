import React, { useState } from 'react';
import { HiArrowCircleLeft, HiArrowCircleRight } from "react-icons/hi";
import { RiCoupon2Line, RiCoupon3Line, RiDashboard2Line, RiMessage3Line, RiSlideshow4Line } from "react-icons/ri";
import { TbCategory, TbShoppingCart, TbShoppingCartCog, TbBrandBlogger } from "react-icons/tb";
import {AiOutlineLogout} from 'react-icons/ai'
import { MdOutlineColorLens } from "react-icons/md";
import { FaUser, FaUserCog, FaRegStar } from "react-icons/fa";
import { GrCapacity } from "react-icons/gr";
import { Layout, Menu, Button, theme } from 'antd';
import { useNavigate, Outlet } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { logoutUser } from '../features/auth/authSlice';
import { useDispatch } from 'react-redux';

const { Header, Sider, Content } = Layout;
const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const navigate = useNavigate();
  const dispatch = useDispatch()
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical"><h1 className='fs-5 text-center py-3 mb-0 t-lg'>PHB</h1></div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['']}
          onClick={({ key }) => {
            if (key === 'signout') {
              dispatch(logoutUser());
              navigate('/');
            }
            else {
              navigate(key);
            }
          }}
          items={[
            {
              key: '',
              icon: <RiDashboard2Line className='fs-5' />,
              label: 'Dashboard',
            },
            {
              key: 'phone',
              icon: <TbShoppingCart className='fs-5' />,
              label: 'Phone',
              children: [
                {
                  key: 'add-phone',
                  icon: <TbShoppingCartCog className='fs-5' />,
                  label: 'Add Phone',
                },
                {
                  key: 'phone-list',
                  icon: <TbCategory className='fs-5' />,
                  label: 'Phone list',
                },
                {
                  key: 'add-product',
                  icon: <TbShoppingCartCog className='fs-5' />,
                  label: 'Add Product',
                },
                {
                  key: 'product-list',
                  icon: <TbCategory className='fs-5' />,
                  label: 'Product List',
                },
                {
                  key: 'add-product-type',
                  icon: <TbShoppingCart className='fs-5' />,
                  label: 'Add Product Type',
                },
                {
                  key: 'product-type-list',
                  icon: <TbCategory className='fs-5' />,
                  label: 'Product Type List',
                },
              ],
            },
            {
              key: 'customer',
              icon: <FaUser className='fs-5' />,
              label: 'Customers',
              children: [
                {
                  key: 'add-admin',
                  icon: <FaUserCog className='fs-5' />,
                  label: 'Add Admin',
                },
                {
                  key: 'customer-list',
                  icon: <FaUserCog className='fs-5' />,
                  label: 'Customer List',
                },
              ]
            },
            {
              key: 'coupon',
              icon: <RiCoupon2Line className='fs-5' />,
              label: 'Coupon',
              children: [
                {
                  key: 'add-coupon',
                  icon: <RiCoupon3Line className='fs-5' />,
                  label: 'Add Coupon',
                },
                {
                  key: 'coupon-list',
                  icon: <RiCoupon3Line className='fs-5' />,
                  label: 'Coupon List',
                },
              ],
            },
            {
              key: 'comment',
              icon: <RiMessage3Line className='fs-5' />,
              label: 'Comment',
            },
            {
              key: 'rating',
              icon: <FaRegStar className='fs-5' />,
              label: 'Rating',
            },
            {
              key: 'invoice',
              icon: <RiMessage3Line className='fs-5' />,
              label: 'Invoice',
            },
            {
              key: 'slideshow',
              icon: <RiSlideshow4Line className='fs-5' />,
              label: 'SlideShow',
              children: [
                {
                  key: 'add-slideshow',
                  icon: <RiSlideshow4Line className='fs-5' />,
                  label: 'Add SlideShow',
                },
                {
                  key: 'slideshows',
                  icon: <RiSlideshow4Line className='fs-5' />,
                  label: 'SlideShows',
                },
              ]
            },
            {
              key: 'color',
              icon: <MdOutlineColorLens className='fs-5' />,
              label: 'Color',
              children: [
                {
                  key: 'add-color',
                  icon: <MdOutlineColorLens className='fs-5' />,
                  label: 'Add Color',
                },
                {
                  key: 'color-list',
                  icon: <MdOutlineColorLens className='fs-5' />,
                  label: 'Color List',
                },
              ]
            },
            {
              key: 'brand',
              icon: <TbBrandBlogger className='fs-5' />,
              label: 'Brand',
              children: [
                {
                  key: 'add-brand',
                  icon: <TbBrandBlogger className='fs-5' />,
                  label: 'Add Brand',
                },
                {
                  key: 'brand-list',
                  icon: <TbBrandBlogger className='fs-5' />,
                  label: 'Brand List',
                },
              ]
            },
            {
              key: 'capacity',
              icon: <GrCapacity  className='fs-5' />,
              label: 'Capacity',
              children: [
                {
                  key: 'add-capacity',
                  icon: <GrCapacity className='fs-5' />,
                  label: 'Add Capacity',
                },
                {
                  key: 'capacity-list',
                  icon: <GrCapacity className='fs-5' />,
                  label: 'Capacity List',
                },
              ]
            },
            {
              key: 'signout',
              icon: <AiOutlineLogout className='fs-5' />,
              label: 'Signout',
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          className='d-flex justify-content-between pe-5'
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <HiArrowCircleRight /> : <HiArrowCircleLeft />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '30px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <Outlet />
          <ToastContainer
            position="top-right"
            autoClose={250}
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            theme="light"
          />
        </Content>
      </Layout>
    </Layout>
  );
};
export default MainLayout;