// assets
import FastfoodIcon from '@mui/icons-material/Fastfood';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
// icons
const icons = {
  FastfoodIcon,
  ShoppingCartOutlinedIcon
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
    },
    {
      id: 'muahanghoa',
      title: 'Mua hàng hóa cho học viên',
      type: 'item',
      url: '/muahanghoa',
      icon: icons.ShoppingCartOutlinedIcon,
      breadcrumbs: false
    }
  ]
};

export default BanGiao;
