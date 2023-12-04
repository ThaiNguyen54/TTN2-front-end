// assets
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
// icons
const icons = {
  PermIdentityIcon
};

// ==============================|| Ban Giao ||============================== //

const KyLuat = {
  id: 'kyluat',
  title: 'Kỷ luật học viên',
  type: 'group',
  children: [
    {
      id: 'kyluat',
      title: 'Kỷ luật học viên',
      type: 'item',
      url: '/kyluat',
      icon: icons.PermIdentityIcon,
      breadcrumbs: false
    }
  ]
};

export default KyLuat;
