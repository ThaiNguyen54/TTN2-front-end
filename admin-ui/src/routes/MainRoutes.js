import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';

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

// render - add khu sinh hoat page
const ViewAllKhuSinhHoat = Loadable(lazy(() => import('pages/khu-sinh-hoat/ViewAllKhuSinhHoat')));
const AddKhuSinhHoat = Loadable(lazy(() => import('pages/khu-sinh-hoat/AddKhuSinhHoat')));

// render - nguoi than
const ViewAllNguoiThan = Loadable(lazy(() => import('pages/nguoi-than/ViewAllNguoiThan')));

// render - ban giao
const ViewAllBanGiao = Loadable(lazy(() => import('pages/ban-giao/ViewAllBanGiao')));

// render - khen thuong
const ViewAllKhenThuong = Loadable(lazy(() => import('pages/khen-thuong/ViewAllKhenThuong')));

// render - ky luat
const ViewAllKyLuat = Loadable(lazy(() => import('pages/ky-luat/ViewAllKyLuat')))

// render - tron vien phep
const ViewAllTronVienPhep = Loadable(lazy(() => import('pages/tron-vien-phep/ViewAllTronVienPhep')))

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
      path: 'color',
      element: <Color />
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'default',
          element: <DashboardDefault />
        }
      ]
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
      path: 'hocvien-cnbb',
      element: <Student_CNBB />
    },
    {
      path: 'hocvien-cntn',
      element: <Student_CNTN />
    },
    {
      path: 'nguoithan',
      element: <ViewAllNguoiThan />
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
      path: 'sample-page',
      element: <SamplePage />
    },
    {
      path: 'shadow',
      element: <Shadow />
    },
    {
      path: 'typography',
      element: <Typography />
    },
    {
      path: 'icons/ant',
      element: <AntIcons />
    }
  ]
};

export default MainRoutes;
