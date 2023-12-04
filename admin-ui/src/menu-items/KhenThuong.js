// assets
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
// icons
const icons = {
  EmojiEventsOutlinedIcon
};

// ==============================|| Khen Thuong ||============================== //

const KhenThuong = {
  id: 'khenthuong',
  title: 'Khen thưởng học viên',
  type: 'group',
  children: [
    {
      id: 'khenthuong',
      title: 'Khen thưởng học viên',
      type: 'item',
      url: '/khenthuong',
      icon: icons.EmojiEventsOutlinedIcon,
      breadcrumbs: false
    }
  ]
};

export default KhenThuong;
