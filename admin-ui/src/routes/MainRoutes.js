import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';
import { Route, Routes, Navigate } from 'react-router-dom';
import RequireAuth from '../components/RequireAuth';
import Login from '../pages/Login/Login';

// render - dashboard
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard')));

// render - sample page
const SamplePage = Loadable(lazy(() => import('pages/extra-pages/SamplePage')));

// render - utilities
const Typography = Loadable(lazy(() => import('pages/components-overview/Typography')));
const Color = Loadable(lazy(() => import('pages/components-overview/Color')));
const Shadow = Loadable(lazy(() => import('pages/components-overview/Shadow')));
const AntIcons = Loadable(lazy(() => import('pages/components-overview/AntIcons')));

// render - view all student page
const ViewAllStudent = Loadable(lazy(() => import('pages/student/ViewAllStudent')));
const AddStudent = Loadable(lazy(() => import('pages/student/AddStudent')));
const Student_CNBB = Loadable(lazy(() => import('pages/student-cainghienbatbuoc/ViewAllCNBB')));
const Student_CNTN = Loadable(lazy(() => import('pages/student-cainghientunguyen/ViewAllCNTN')));
const ViewAllLichSuCongTien = Loadable(lazy(() => import('pages/congtien/ViewAllLichSuCongTien')));
const AddCongTienHocVien = Loadable(lazy(() => import('pages/congtien/AddCongTien')));

// render - add khu sinh hoat page
const ViewAllKhuSinhHoat = Loadable(lazy(() => import('pages/khu-sinh-hoat/ViewAllKhuSinhHoat')));
const AddKhuSinhHoat = Loadable(lazy(() => import('pages/khu-sinh-hoat/AddKhuSinhHoat')));
const DangKyKhuSinhHoat = Loadable(lazy(() => import('pages/khu-sinh-hoat/DangKyKhuSinhHoat')));
const ViewAllHocVienKhuSinhHoat = Loadable(lazy(() => import('pages/khu-sinh-hoat/ViewHocVien-KhuSinhHoat')));

// render - nguoi than
const ViewAllNguoiThan = Loadable(lazy(() => import('pages/nguoi-than/ViewAllNguoiThan')));
const ViewAllLichSuThamGap = Loadable(lazy(() => import('pages/nguoi-than/ViewAllLichSuThamGap')));
const AddThamGap = Loadable(lazy(() => import('pages/nguoi-than/AddThamGap')));

// render - ban giao
const ViewAllBanGiao = Loadable(lazy(() => import('pages/ban-giao/ViewAllBanGiao')));

// render - khen thuong
const ViewAllKhenThuong = Loadable(lazy(() => import('pages/khen-thuong/ViewAllKhenThuong')));

// render - ky luat
const ViewAllKyLuat = Loadable(lazy(() => import('pages/ky-luat/ViewAllKyLuat')));

// render - tron vien phep
const ViewAllTronVienPhep = Loadable(lazy(() => import('pages/tron-vien-phep/ViewAllTronVienPhep')));

// render - hang hoa
const ViewAllHangHoa = Loadable(lazy(() => import('pages/hang-hoa/ViewAllHangHoa')));
const AddHangHoa = Loadable(lazy(() => import('pages/hang-hoa/AddHangHoa')));

// render - chi tiet mua
const ViewPurchasingHistroy = Loadable(lazy(() => import('pages/ ChiTietMua/ViewPurchasingHistory')));
const Purchasing = Loadable(lazy(() => import('pages/hang-hoa/MuaHangHoa')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: <ViewAllStudent />
    },
    {
      path: '/addStudent',
      element: <AddStudent />
    },

    {
      path: 'hocvien',
      element: <ViewAllStudent />
    },
    {
      path: 'khusinhhoat',
      element: <ViewAllKhuSinhHoat />
    },
    {
      path: 'addkhusinhhoat',
      element: <AddKhuSinhHoat />
    },
    {
      path: '/dkkhusinhhoat',
      element: <DangKyKhuSinhHoat />
    },
    {
      path: '/hocvien-khusinhhoat',
      element: <ViewAllHocVienKhuSinhHoat />
    },
    {
      path: 'hocvien-cnbb',
      element: <Student_CNBB />
    },
    {
      path: 'hocvien-cntn',
      element: <Student_CNTN />
    },
    {
      path: 'congtien',
      element: <ViewAllLichSuCongTien />
    },
    {
      path: 'congtienhocvien',
      element: <AddCongTienHocVien />
    },
    {
      path: 'nguoithan',
      element: <ViewAllNguoiThan />
    },
    {
      path: 'thamgap',
      element: <ViewAllLichSuThamGap />
    },
    {
      path: 'addthamgap',
      element: <AddThamGap />
    },
    {
      path: 'bangiao',
      element: <ViewAllBanGiao />
    },
    {
      path: 'khenthuong',
      element: <ViewAllKhenThuong />
    },
    {
      path: 'kyluat',
      element: <ViewAllKyLuat />
    },
    {
      path: 'tronvienphep',
      element: <ViewAllTronVienPhep />
    },
    {
      path: 'hanghoa',
      element: <ViewAllHangHoa />
    },
    {
      path: 'addhanghoa',
      element: <AddHangHoa />
    },
    {
      path: 'muahanghoa',
      element: <Purchasing />
    },
    {
      path: 'chitietmua',
      element: <ViewPurchasingHistroy />
    }
    // {
    //   path: 'color',
    //   element: <Color />
    // },
    // {
    //   path: 'dashboard',
    //   children: [
    //     {
    //       path: 'default',
    //       element: <DashboardDefault />
    //     }
    //   ]
    // }
    // {
    //   path: 'sample-page',
    //   element: <SamplePage />
    // },
    // {
    //   path: 'shadow',
    //   element: <Shadow />
    // },
    // {
    //   path: 'typography',
    //   element: <Typography />
    // },
    // {
    //   path: 'icons/ant',
    //   element: <AntIcons />
    // }
  ]
};

// const MainRoutes = (isLoggedIn) => [
//   {
//     path: '/',
//     element: isLoggedIn ? <MainLayout /> : <Navigate to="/login" />,
//     children: [
//       {
//         path: '/login',
//         element: <Login />
//       },
//       {
//         path: '/',
//         element: <ViewAllStudent />
//       },
//       {
//         path: '/addStudent',
//         element: <AddStudent />
//       },
//
//       {
//         path: 'hocvien',
//         element: <ViewAllStudent />
//       },
//       {
//         path: 'khusinhhoat',
//         element: <ViewAllKhuSinhHoat />
//       },
//       {
//         path: 'addkhusinhhoat',
//         element: <AddKhuSinhHoat />
//       },
//       {
//         path: '/dkkhusinhhoat',
//         element: <DangKyKhuSinhHoat />
//       },
//       {
//         path: '/hocvien-khusinhhoat',
//         element: <ViewAllHocVienKhuSinhHoat />
//       },
//       {
//         path: 'hocvien-cnbb',
//         element: <Student_CNBB />
//       },
//       {
//         path: 'hocvien-cntn',
//         element: <Student_CNTN />
//       },
//       {
//         path: 'congtien',
//         element: <ViewAllLichSuCongTien />
//       },
//       {
//         path: 'congtienhocvien',
//         element: <AddCongTienHocVien />
//       },
//       {
//         path: 'nguoithan',
//         element: <ViewAllNguoiThan />
//       },
//       {
//         path: 'thamgap',
//         element: <ViewAllLichSuThamGap />
//       },
//       {
//         path: 'addthamgap',
//         element: <AddThamGap />
//       },
//       {
//         path: 'bangiao',
//         element: <ViewAllBanGiao />
//       },
//       {
//         path: 'khenthuong',
//         element: <ViewAllKhenThuong />
//       },
//       {
//         path: 'kyluat',
//         element: <ViewAllKyLuat />
//       },
//       {
//         path: 'tronvienphep',
//         element: <ViewAllTronVienPhep />
//       },
//       {
//         path: 'hanghoa',
//         element: <ViewAllHangHoa />
//       },
//       {
//         path: 'addhanghoa',
//         element: <AddHangHoa />
//       },
//       {
//         path: 'muahanghoa',
//         element: <Purchasing />
//       },
//       {
//         path: 'chitietmua',
//         element: <ViewPurchasingHistroy />
//       }
//     ]
//   }
// ];

export default MainRoutes;
