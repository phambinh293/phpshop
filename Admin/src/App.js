import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Resetpassword from './pages/Resetpassword';
import Forgotpassword from './pages/Forgotpassword';
import MainLayout from './components/MainLayout';
import Changepassword from './pages/Changepassword';
import Comment from './pages/Comment';
import RepComment from './pages/RepComment';
import Invoice from './pages/Invoice';
import CouponList from './pages/CouponList';
import CustomerList from './pages/CustomerList';
import ProductList from './pages/ProductList';
import ProductTypeList from './pages/ProductTypeList';
import ColorList from './pages/ColorList';
import BrandList from './pages/BrandList';
import AddProductType from './pages/AddProductType';
import AddCoupon from './pages/AddCoupon';
import AddColor from './pages/AddColor';
import AddBrand from './pages/AddBrand';
import ProductDetail from './pages/ProductDetail';
import AddPhone from './pages/AddPhone';
import PhoneList from './pages/PhoneList';
import AddProduct from './pages/AddProduct';
import SlideShows from './pages/SlideShows';
import AddSlideShow from './pages/AddSlideShow';
import InvoiceDetails from './pages/InvoiceDetails';
import Rating from './pages/Rating';
import { OpenRoutes } from './routing/OpenRoutes';
import { PrivateRoutes } from './routing/PrivateRoutes';
import AddAdmin from './pages/AddAdmin';
import CapacityList from './pages/CapacityList';
import AddCapacity from './pages/AddCapacity';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<OpenRoutes><Login /></OpenRoutes>} />
        <Route path='/resetpassword' element={<Resetpassword />} />
        <Route path='/changepassword' element={<Changepassword />} />
        <Route path='/forgotpassword' element={<Forgotpassword />} />
        <Route path='/admin' element={<PrivateRoutes><MainLayout /></PrivateRoutes>}>
          <Route index element={<PrivateRoutes><Dashboard /></PrivateRoutes>} />
          <Route path='comment' element={<PrivateRoutes><Comment /></PrivateRoutes>} />
          <Route path='rep-comment/:id' element={<RepComment />} />
          <Route path='invoice' element={<Invoice />} />
          <Route path='invoiceDetails/:id' element={<InvoiceDetails />} />
          <Route path='coupon-list' element={<CouponList />} />
          <Route path='customer-list' element={<CustomerList />} />
          <Route path='add-product' element={<AddProduct />} />
          <Route path='add-product/:id' element={<AddProduct />} />
          <Route path='product-list' element={<ProductList />} />
          <Route path='add-phone' element={<AddPhone />} />
          <Route path='add-phone/:id' element={<AddPhone />} />
          <Route path='phone-list' element={<PhoneList />} />
          <Route path='product-type-list' element={<ProductTypeList />} />
          <Route path='add-product-type' element={<AddProductType />} />
          <Route path='add-product-type/:id' element={<AddProductType />} />
          <Route path='color-list' element={<ColorList />} />
          <Route path='brand-list' element={<BrandList />} />
          <Route path='capacity-list' element={<CapacityList />} />
          <Route path='add-admin' element={<AddAdmin />} />
          <Route path='add-coupon' element={<AddCoupon />} />
          <Route path='add-coupon/:id' element={<AddCoupon />} />
          <Route path='add-color' element={<AddColor />} />
          <Route path='add-color/:id' element={<AddColor />} />
          <Route path='add-brand' element={<AddBrand />} />
          <Route path='add-brand/:id' element={<AddBrand />} />
          <Route path='add-capacity' element={<AddCapacity />} />
          <Route path='add-capacity/:id' element={<AddCapacity />} />
          <Route path='product-detail/:id' element={<ProductDetail />} />
          <Route path='slideshows' element={<SlideShows />} />
          <Route path='add-slideshow' element={<AddSlideShow />} />
          <Route path='add-slideshow/:id' element={<AddSlideShow />} />
          <Route path='rating' element={<Rating />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
