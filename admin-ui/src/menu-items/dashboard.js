// assets
import { DashboardOutlined, UserOutlined } from '@ant-design/icons';

// icons
const icons = {
  DashboardOutlined,
  UserOutlined
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const dashboard = {
  id: 'group-dashboard',
  title: 'Quản lí học viên',
  type: 'group',
  children: [
    // {
    //   id: 'dashboard',
    //   title: 'Dashboard',
    //   type: 'item',
    //   url: '/dashboard/default',
    //   icon: icons.DashboardOutlined,
    //   breadcrumbs: false
    // },
    {
      id: 'hocvien',
      title: 'Học Viên',
      type: 'item',
      url: '/hocvien',
      icon: icons.UserOutlined,
      breadcrumbs: false
    },
    {
      id: 'hocvien-cnbb',
      title: 'Học Viên - Cai nghiện bắt buộc',
      type: 'item',
      url: '/hocvien-cnbb',
      icon: icons.UserOutlined,
      breadcrumbs: false
    },
    {
      id: 'hocvien-cntn',
      title: 'Học Viên - Cai nghiện tự nguyện',
      type: 'item',
      url: '/hocvien-cntn',
      icon: icons.UserOutlined,
      breadcrumbs: false
    }
  ]
};

export default dashboard;
