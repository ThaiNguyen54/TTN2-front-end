// assets
import FastfoodIcon from '@mui/icons-material/Fastfood';
// icons
const icons = {
  FastfoodIcon
};

// ==============================|| Hang Hoa ||============================== //

const BanGiao = {
  id: 'hanghoa',
  title: 'Hàng Hóa',
  type: 'group',
  children: [
    {
      id: 'hanghoa',
      title: 'Xem hàng hóa',
      type: 'item',
      url: '/hanghoa',
      icon: icons.FastfoodIcon,
      breadcrumbs: false
    }
  ]
};

export default BanGiao;
