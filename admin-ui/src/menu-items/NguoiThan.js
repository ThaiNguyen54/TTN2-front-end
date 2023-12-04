// assets
import SupervisorAccountOutlinedIcon from '@mui/icons-material/SupervisorAccountOutlined';
// icons
const icons = {
  SupervisorAccountOutlinedIcon
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
      icon: icons.SupervisorAccountOutlinedIcon,
      breadcrumbs: false
    }
  ]
};

export default NguoiThan;
