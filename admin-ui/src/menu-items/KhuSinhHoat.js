// assets
import { HomeOutlined } from '@ant-design/icons';

// icons
const icons = {
  HomeOutlined
};

// ==============================|| Khu Sinh Hoat ||============================== //

const KhuSinhHoat = {
  id: 'khusinhhoat',
  title: 'Quản lí khu sinh hoạt',
  type: 'group',
  children: [
    {
      id: 'khusinhhoat',
      title: 'khu sinh hoạt',
      type: 'item',
      url: '/khusinhhoat',
      icon: icons.HomeOutlined,
      breadcrumbs: false
    }
  ]
};

export default KhuSinhHoat;
