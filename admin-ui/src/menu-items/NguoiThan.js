// assets
import { HomeOutlined } from '@ant-design/icons';

// icons
const icons = {
  HomeOutlined
};

// ==============================|| Khu Sinh Hoat ||============================== //

const NguoiThan = {
  id: 'nguoithan',
  title: 'Người thân học viên',
  type: 'group',
  children: [
    {
      id: 'nguoithan',
      title: 'Người thân học viên',
      type: 'item',
      url: '/nguoithan',
      icon: icons.HomeOutlined,
      breadcrumbs: false
    }
  ]
};

export default NguoiThan;
