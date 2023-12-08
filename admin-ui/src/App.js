// Rect import
import Routing from 'routes';
import { useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { Routes, Route } from 'react-router-dom';

// project import
import ThemeCustomization from 'themes';
import ScrollTop from 'components/ScrollTop';
import RequireAuth from './components/RequireAuth';
import ViewAllStudent from './pages/student/ViewAllStudent';
import Login from './pages/Login/Login';
import AddStudent from './pages/student/AddStudent';
import ViewAllKhuSinhHoat from './pages/khu-sinh-hoat/ViewAllKhuSinhHoat';
import AddKhuSinhHoat from './pages/khu-sinh-hoat/AddKhuSinhHoat';
import DangKyKhuSinhHoat from './pages/khu-sinh-hoat/DangKyKhuSinhHoat';
import ViewAllHocVienKhuSinhHoat from 'pages/khu-sinh-hoat/ViewHocVien-KhuSinhHoat';
import ViewAllLichSuThamGap from './pages/nguoi-than/ViewAllLichSuThamGap';
import ViewAllNguoiThan from './pages/nguoi-than/ViewAllNguoiThan';
import ViewAllLichSuCongTien from './pages/congtien/ViewAllLichSuCongTien';
import AddHangHoa from './pages/hang-hoa/AddHangHoa';
import ViewAllHangHoa from './pages/hang-hoa/ViewAllHangHoa';
import Student_CNBB from './pages/student-cainghienbatbuoc/ViewAllCNBB';
import Student_CNTN from './pages/student-cainghientunguyen/ViewAllCNTN';
import AddCongTienHocVien from 'pages/congtien/AddCongTien';
import AddThamGap from 'pages/nguoi-than/AddThamGap';
import ViewAllBanGiao from 'pages/ban-giao/ViewAllBanGiao';
import ViewAllKhenThuong from 'pages/khen-thuong/ViewAllKhenThuong';
import ViewAllKyLuat from 'pages/ky-luat/ViewAllKyLuat';
import ViewAllTronVienPhep from 'pages/tron-vien-phep/ViewAllTronVienPhep';
import Purchasing from 'pages/hang-hoa/MuaHangHoa';
import ViewPurchasingHistory from 'pages/ ChiTietMua/ViewPurchasingHistory';
import MainLayout from './layout/MainLayout';
import PersistLogin from './persist-login/PersistLogin';
import Global from "./constant/Global";

// ==============================|| APP - THEME, ROUTER, LOCAL  ||============================== //

const App = () => {
  return (
    <ThemeCustomization>
      <ScrollTop>
        {/*<Routing />*/}

        <Routes>
          <Route path="login" element={<Login />} />

          <Route element={<PersistLogin />}>
            <Route element={<RequireAuth />}>
              <Route path="/" element={<MainLayout />}>
                <Route path="/" element={<ViewAllStudent />} />
                <Route path="/hocvien" element={<ViewAllStudent />} />
                <Route path="/addStudent" element={<AddStudent />} />
                <Route path="/khusinhhoat" element={<ViewAllKhuSinhHoat />} />
                <Route path="/addkhusinhhoat" element={<AddKhuSinhHoat />} />
                <Route path="/dkkhusinhhoat" element={<DangKyKhuSinhHoat />} />
                <Route path="/hocvien-khusinhhoat" element={<ViewAllHocVienKhuSinhHoat />} />
                <Route path="/hocvien-cnbb" element={<Student_CNBB />} />
                <Route path="/hocvien-cntn" element={<Student_CNTN />} />
                <Route path="/congtien" element={<ViewAllLichSuCongTien />} />
                <Route path="/congtienhocvien" element={<AddCongTienHocVien />} />
                <Route path="/nguoithan" element={<ViewAllNguoiThan />} />
                <Route path="/thamgap" element={<ViewAllLichSuThamGap />} />
                <Route path="/addthamgap" element={<AddThamGap />} />
                <Route path="/bangiao" element={<ViewAllBanGiao />} />
                <Route path="/khenthuong" element={<ViewAllKhenThuong />} />
                <Route path="/kyluat" element={<ViewAllKyLuat />} />
                <Route path="/tronvienphep" element={<ViewAllTronVienPhep />} />
                <Route path="/hanghoa" element={<ViewAllHangHoa />} />
                <Route path="/addhanghoa" element={<AddHangHoa />} />
                <Route path="/muahanghoa" element={<Purchasing />} />
                <Route path="/chitietmua" element={<ViewPurchasingHistory />} />
              </Route>
            </Route>
          </Route>
        </Routes>
      </ScrollTop>
    </ThemeCustomization>
  );
};

export default App;
