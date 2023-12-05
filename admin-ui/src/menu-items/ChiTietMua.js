// assets
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
// icons
const icons = {
  ShoppingBagOutlinedIcon,
  ShoppingCartOutlinedIcon
};

// ==============================|| Ban Giao ||============================== //

const ChiTietMua = {
  id: 'chitietmua',
  title: 'Lịch sử mua',
  type: 'group',
  children: [
    {
      id: 'chitietmua',
      title: 'Lịch sử mua',
      type: 'item',
      url: '/chitietmua',
      icon: icons.ShoppingBagOutlinedIcon,
      breadcrumbs: false
    }
  ]
};

export default ChiTietMua;
