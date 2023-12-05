// assets
import { BankOutlined } from '@ant-design/icons';

// icons
const icons = {
  BankOutlined
};

// ==============================|| Ban Giao ||============================== //

const BanGiao = {
  id: 'bangiao',
  title: 'Bàn giao học viên',
  type: 'group',
  children: [
    {
      id: 'bangiao',
      title: 'Bàn giao học viên',
      type: 'item',
      url: '/bangiao',
      icon: icons.BankOutlined,
      breadcrumbs: false
    }
  ]
};

export default BanGiao;
