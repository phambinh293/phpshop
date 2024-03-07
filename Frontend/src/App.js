import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainLayout from "./Components/Mainlayout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Resetpassword from "./pages/Resetpassword";
import Forgotpassword from "./pages/Forgotpassword";
import Detail from "./pages/PhoneDetail";
import Cart from "./pages/Cart";
import DienThoai from "./pages/DienThoai";
import DonHang from "./pages/DonHang";
import Thongtindiachi from "./pages/Thongtindiachi";
import AccountLayout from "./Components/AccountLayout";
import DanhSachYeuThich from "./pages/DanhSachYeuThich";
import Thanhtoan from "./pages/Thanhtoan";
import Sosanh from "./pages/Sosanh";
import Doimatkhau from "./pages/Doimatkhau";
import ChiTietDonHang from "./pages/ChiTietDonHang";
import NotFound from "./pages/NotFound";
import Register from "./pages/Register";
import ThanhToanThanhCong from "./pages/ThanhToanThanhCong";
import { PrivateRoutes } from "./routing/PrivateRoutes";
import { OpenRoutes } from "./routing/OpenRoutes";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="/reset-password/:token" element={<Resetpassword />} />
          <Route path="/forgot-password" element={<Forgotpassword />} />
          <Route path="/login" element={<OpenRoutes><Login /></OpenRoutes>} />
          <Route path="register" element={<Register />} />
          <Route index element={<Home />} />
          <Route path="/dtdd/:phoneId" element={<Detail />} />
          <Route path="cart" element={<PrivateRoutes><Cart /></PrivateRoutes>} />
          <Route path="cart/thanh-toan" element={<PrivateRoutes><Thanhtoan /></PrivateRoutes>} />
          <Route path="dienthoai/:productTypeId" element={<DienThoai />} />
          <Route path="so-sanh" element={<Sosanh />} />
          <Route path="thanhcong" element={<PrivateRoutes><ThanhToanThanhCong /></PrivateRoutes>} />
          <Route path="user/" element={<PrivateRoutes><AccountLayout /></PrivateRoutes>}>
            <Route index element={<DonHang />} />
            <Route path="thong-tin-tai-khoan" element={<Thongtindiachi />} />
            <Route path="san-pham-yeu-thich" element={<DanhSachYeuThich />} />
            <Route path="doi-mat-khau" element={<Doimatkhau />} />
            <Route path="chi-tiet-don-hang/:invoiceId" element={<ChiTietDonHang />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;